import 'react-native-gesture-handler';
import React, { useCallback, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Theme from '../presentation/styles/theme';
import AnimalsList from '../presentation/pages/AnimalsList';
import Randomize from '../presentation/pages/Randomize';
import DetailsPage from '../presentation/pages/DetailsPage';
import Pokemon from '../domain/models/Pokemon';
import styled from 'styled-components/native';
import fonts from '../presentation/styles/fonts';

export type RootStackParamList = {
  AnimalList: undefined;
  DetailsPage: {
    pokemon: Pokemon;
    pokemons: Pokemon[];
  };
  Randomize: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const HomePageStack = () => {
  const { themePalette, isLightMode } = useContext(Theme);

  const screenOptions = {
    headerTitleStyle: {
      color: themePalette.black,
    },
    headerStyle: {
      shadowOpacity: isLightMode ? 1 : 0,
      elevation: isLightMode ? 3 : 0,
      backgroundColor: themePalette.white1,
    },
    headerTintColor: themePalette.primary,
    headerBackTitle: 'Back',
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="AnimalList"
        component={AnimalsList}
        options={{
          title: 'Pokemons',
        }}
      />
      <Stack.Screen name="DetailsPage" component={DetailsPage} />
    </Stack.Navigator>
  );
};

export const RandomizeStack = () => {
  const { themePalette, toggleLightMode, isLightMode } = useContext(Theme);

  const screenOptions = {
    headerTitleStyle: {
      color: themePalette.black,
    },
    headerStyle: {
      shadowOpacity: isLightMode ? 1 : 0,
      elevation: isLightMode ? 3 : 0,
      backgroundColor: themePalette.white1,
    },
    headerTintColor: themePalette.primary,
    headerBackTitle: 'Back',
  };

  const headerRight = useCallback(
    () => (
      <ButtonTheme
        name="model-training"
        size={fonts.icons.default}
        color={isLightMode ? themePalette.primary : themePalette.black}
        onPress={toggleLightMode}
      />
    ),
    [isLightMode, themePalette],
  );

  const randomizeOptions = {
    title: 'Random Pokemon',
    headerRight,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Randomize"
        component={Randomize}
        options={randomizeOptions}
      />
      <Stack.Screen name="DetailsPage" component={DetailsPage} />
    </Stack.Navigator>
  );
};

const ButtonTheme = styled(Icon)`
  margin-right: 20px;
`;
