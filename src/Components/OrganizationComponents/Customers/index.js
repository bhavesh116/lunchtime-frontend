import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OrgCustomers from './OrgCustomers'
import OrgRequests from './OrgRequests'
const Stack = createStackNavigator();

export default function Route() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="OrgCustomers"
          component={OrgCustomers}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Requests"
          component={OrgRequests}
        />
      </Stack.Navigator>
  );
}
