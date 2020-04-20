import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainProfile from './MainProfile'
import EditProfile from './ProfileEdit'
import UpdatePassword from './UpdatePassword'
const Stack = createStackNavigator();

export default function Route() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="MainOrgProfile"
          component={MainProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Edit Org Profile"
          component={EditProfile}
        />
        <Stack.Screen
          name="Org Password"
          component={UpdatePassword}
        />
      </Stack.Navigator>
  );
}
