import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Resume } from '../screens/Resume';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme();

  return(
    // @ts-expect-error - Expo sdk 42 uses @react/types 16.x, and react-navigation 6.x needs a version >= 17
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 88,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        }
      }}
    >
      <Screen 
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: (({ size, color }) => 
          // @ts-ignore
            <MaterialIcons 
              name="format-list-bulleted" 
              size={size} 
              color={color} 
            />
          )
        }}
      />
      <Screen 
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: (({ size, color }) => 
          // @ts-ignore
            <MaterialIcons 
              name="attach-money" 
              size={size} 
              color={color} 
            />
          )
        }}
      />
      <Screen 
        name="Resumo"
        component={Resume}
        options={{
          tabBarIcon: (({ size, color }) => 
          //@ts-ignore
            <MaterialIcons 
              name="pie-chart" 
              size={size} 
              color={color} 
            />
          )
        }}
      />
    </Navigator>
  )
}