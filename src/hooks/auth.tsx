import React, { 
  createContext, 
  ReactNode, 
  useContext, 
  useEffect, 
  useState
} from 'react';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthProviderProps = {
  children: ReactNode
}

type UserProps = {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

type IAuthContextData = {
  user: UserProps;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthenticationResponse = {
  params: {
    access_token: string;
  },
  type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const userStorageKey = `@gofinances:user:${user.id}`;

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthenticationResponse;

      if(type === 'success'){
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();

        const userLogged = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }

    } catch (error) {
      throw new Error('Error to connect with your Google account!');
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ]
      });

      if(credential) {
        const storedName = await getStoredUserName();
        const name = storedName ? storedName : credential.fullName?.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;
        
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo
        }

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }

    } catch (error) {
      throw new Error('Failed to connect with your apple account!');
    }
  }

  async function signOut() {
    const storedUser = {
      email: '',
      id: '',
      name: user.name,
      photo: undefined
    };

    setUser({} as UserProps);
    await AsyncStorage.setItem(userStorageKey, JSON.stringify(storedUser));
  }

  async function getStoredUserName() {
    const storedUser = await AsyncStorage.getItem(userStorageKey);
    
    if(storedUser) {
      const { name } = JSON.parse(storedUser) as UserProps;
      
      return name;
    };
  };

  useEffect(() => {
    async function loadUserStorageData() {
      const userStored = await AsyncStorage.getItem(userStorageKey);

      if(userStored) {
        const userLogged = JSON.parse(userStored) as UserProps;
        setUser(userLogged);
      }

      setUserStorageLoading(false);
    }

    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user,
      signInWithGoogle,
      signInWithApple,
      signOut
    }}>
      { children }
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }