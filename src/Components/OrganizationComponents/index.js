import  React, { useEffect } from 'react';
import { Text, View, BackHandler } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

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
            if (route.name === 'Home') {
              iconName = 'home'
            } else if (route.name === 'Settings') {
              iconName = 'cog'
            }

            // You can return any component that you like here!
            return <FontAwesomeIcon icon={iconName} size={25} color={focused ? '#B91CFF' : '#f1f1f1'}/>
          },
        })}
        tabBarOptions={{
          showLabel: false
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
  )
}

export default TabRoutes