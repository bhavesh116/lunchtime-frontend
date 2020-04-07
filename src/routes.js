import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from './Components/Auth'
import CustomerRoutes from './Components/CustomerComponents'
import OrganizationRoutes from './Components/OrganizationComponents'
const Stack = createStackNavigator();

export default function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CustomerRoutes"
          component={CustomerRoutes}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="OrganizationRoutes"
          component={OrganizationRoutes}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
