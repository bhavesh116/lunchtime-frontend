import  React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { Text, View, BackHandler } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getOrganizationsInitiate } from '../../redux/actions/CustomerActions/organizations'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Organizations from './Organizations'
import Profile from './Profile'
import Orders from './Orders'
import Menu from './MenuToday'

const Tab = createBottomTabNavigator();

const CustomerRoutes = () => {
  
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
            if (route.name === 'Organizations') {
              iconName = 'building'
            }
            if (route.name === 'Menu') {
              iconName = 'utensils'
            }
            if (route.name === 'Orders') {
              iconName = 'truck'
            }
            if (route.name === 'Profile') {
              iconName = 'user'
            }       
            return <FontAwesomeIcon icon={iconName} size={25} color={focused ? 'gold' : '#adb5bd'}/>
          }
        })}
        tabBarOptions={{
          showLabel: false
        }}
      >
        <Tab.Screen name="Organizations" component={Organizations} />
        <Tab.Screen name="Menu" component={Menu} />
        <Tab.Screen name="Orders" component={Orders} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
  )
}

export default CustomerRoutes