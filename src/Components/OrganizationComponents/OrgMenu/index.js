import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateMenu from './CreateMenu'
import OrgMenu from './OrgMenu'

const Stack = createStackNavigator();

export default function Route() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="OrgMenu"
          component={OrgMenu}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Create menu"
          component={CreateMenu}
        />
      </Stack.Navigator>
  );
}