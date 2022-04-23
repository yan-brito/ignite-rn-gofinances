import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SignIn } from '../screens/SignIn';

const Stack = createStackNavigator();

export function AuthRoutes() {
  return (
    // @ts-expect-error - Expo sdk 42 uses @react/types 16.x, and react-navigation 6.x needs a version >= 17
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen 
        name="SignIn"
        component={SignIn}
      />
    </Stack.Navigator>
  );
}