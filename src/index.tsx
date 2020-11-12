import 'react-native-gesture-handler';
import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Theme from './presentation/styles/theme';

import AnimalsList from './presentation/pages/AnimalsList';
import Randomize from './presentation/pages/Randomize';

enableScreens();

const Tab = createBottomTabNavigator();

export default function App() {
  const theme = useContext(Theme);
  return (
    <Theme.Provider value={theme.light}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'AnimalsList') {
                iconName = 'home';
              } else if (route.name === 'Randomize') {
                iconName = 'star';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: theme.light.primary,
            inactiveTintColor: theme.light.lightPrimary,
            style: {
              height: 100,
            },
          }}>
          <Tab.Screen
            name="AnimalsList"
            component={AnimalsList}
            options={{
              tabBarLabel: '',
            }}
          />
          <Tab.Screen
            name="Randomize"
            component={Randomize}
            options={{
              tabBarLabel: '',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Theme.Provider>
  );
}
