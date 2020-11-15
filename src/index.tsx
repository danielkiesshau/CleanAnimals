import 'react-native-gesture-handler';
import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Theme, { IColors } from './presentation/styles/theme';

import AnimalsList from './presentation/pages/AnimalsList';
import Randomize from './presentation/pages/Randomize';
import DetailsPage from './presentation/pages/DetailsPage';
import Pokemon from './domain/models/Pokemon';
import { Platform } from 'react-native';

enableScreens();

const Tab = createBottomTabNavigator();

export type RootStackParamList = {
  AnimalList: undefined;
  DetailsPage: {
    pokemon: Pokemon;
    pokemons: Pokemon[];
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const HomePageStack = () => {
  const themePalette: IColors = useContext(Theme);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          color: themePalette.black,
        },
        headerTintColor: themePalette.primary,
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen name="AnimalList" component={AnimalsList} />
      <Stack.Screen name="DetailsPage" component={DetailsPage} />
    </Stack.Navigator>
  );
};
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
              height: Platform.OS === 'ios' ? 90 : 60,
            },
            showLabel: false,
          }}>
          <Tab.Screen name="AnimalsList" component={HomePageStack} />
          <Tab.Screen name="Randomize" component={Randomize} />
        </Tab.Navigator>
      </NavigationContainer>
    </Theme.Provider>
  );
}
