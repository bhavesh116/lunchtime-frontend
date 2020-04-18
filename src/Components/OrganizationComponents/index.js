import  React, { useEffect } from 'react';
import { Text, View, BackHandler } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import Customers from './Customers'
import OrgMenu from './OrgMenu'
import OrgProfile from './OrgProfile'

const Tab = createBottomTabNavigator();

const TabRoutes = () => {

  useEffect(() => {
     BackHandler.addEventListener("hardwareBackPress", () => {
      BackHandler.exitApp()
    });
  }, [])

  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Customers') {
              iconName = 'users'
            }
            if (route.name === 'MenuOrg') {
              iconName = 'utensils'
            }
            if (route.name === 'OrgProfile') {
              iconName = 'user'
            }
            return <FontAwesomeIcon icon={iconName} size={25} color={focused ? 'gold' : '#adb5bd'} />
          },
        })}
        tabBarOptions={{
          showLabel: false
        }}
      >
        <Tab.Screen name="Customers" component={Customers} />
        <Tab.Screen name="MenuOrg" component={OrgMenu} />
        <Tab.Screen name="OrgProfile" component={OrgProfile} />
      </Tab.Navigator>
  )
}

export default TabRoutes