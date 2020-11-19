import 'react-native-gesture-handler';
import React, { createContext, useCallback, useContext, useState } from 'react';
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
import styled from 'styled-components/native';
import fonts from './presentation/styles/fonts';

enableScreens();

const Tab = createBottomTabNavigator();

export type RootStackParamList = {
  AnimalList: undefined;
  DetailsPage: {
    pokemon: Pokemon;
    pokemons: Pokemon[];
  };
  Randomize: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const HomePageStack = () => {
  const { themePalette, isLightMode }: { themePalette: IColors } = useContext(
    Theme,
  );
  return (
    <Stack.Navigator
      screenOptions={{
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
      }}>
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

const RandomizeStack = (props) => {
  const {
    themePalette,
    toggleLightMode,
    isLightMode,
  }: { themePalette: IColors } = useContext(Theme);
  return (
    <Stack.Navigator
      screenOptions={{
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
      }}>
      <Stack.Screen
        name="Randomize"
        component={Randomize}
        options={{
          title: 'Random Pokemon',
          headerRight: () => (
            <ButtonTheme
              name="model-training"
              size={fonts.icons.default}
              color={themePalette.primary}
              onPress={toggleLightMode}
            />
          ),
        }}
      />
      <Stack.Screen name="DetailsPage" component={DetailsPage} />
    </Stack.Navigator>
  );
};

const ButtonTheme = styled(Icon)`
  margin-right: 20px;
`;

export default function App() {
  const { themePalette } = useContext(Theme);

  const [isLightMode, setLightMode] = useState(true);
  const themeMode = isLightMode ? 'light' : 'dark';

  const toggleLightMode = useCallback(() => {
    setLightMode(!isLightMode);
  }, [isLightMode, setLightMode]);

  return (
    <Theme.Provider
      value={{
        isLightMode,
        themePalette: themePalette[themeMode],
        toggleLightMode,
      }}>
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
            tabStyle: {
              backgroundColor: themePalette[themeMode].white1,
            },
            activeTintColor: themePalette[themeMode].primary,
            inactiveTintColor: themePalette[themeMode].lightPrimary,
            style: {
              height: Platform.OS === 'ios' ? 90 : 60,
              backgroundColor: themePalette[themeMode].white1,
            },
            showLabel: false,
          }}>
          <Tab.Screen name="AnimalsList" component={HomePageStack} />
          <Tab.Screen name="Randomize" component={RandomizeStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </Theme.Provider>
  );
}
