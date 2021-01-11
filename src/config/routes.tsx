import 'react-native-gesture-handler';
import React, { useCallback, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Theme from 'presentation/styles/theme';
import AnimalsList from 'presentation/pages/AnimalsList';
import Randomize from 'presentation/pages/Randomize';
import DetailsPage from 'presentation/pages/DetailsPage';
import styled from 'styled-components/native';
import fonts from 'presentation/styles/fonts';
import { BorderlessButton } from 'react-native-gesture-handler';
import { API_CLASS } from '@env';
import { capitalize } from 'utils/stringUtils';

export type RootStackParamList = {
  AnimalList: undefined;
  DetailsPage: any;
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
          title: capitalize(API_CLASS.toLowerCase()) + 's',
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
      <ButtonTheme onPress={toggleLightMode} testID="change-theme-button">
        <Icon
          name="model-training"
          size={fonts.icons.default}
          color={isLightMode ? themePalette.primary : themePalette.black}
        />
      </ButtonTheme>
    ),
    [isLightMode, themePalette, toggleLightMode],
  );

  const randomizeOptions = {
    title: 'Random ' + capitalize(API_CLASS.toLocaleLowerCase()),
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

const ButtonTheme = styled(BorderlessButton)`
  margin-right: 20px;
`;
