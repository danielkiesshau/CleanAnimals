import 'react-native-gesture-handler';
import React, { useCallback, useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  BottomTabBarOptions,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import Theme from './presentation/styles/theme';
import { HomePageStack, RandomizeStack } from './config/routes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Platform } from 'react-native';

enableScreens();

const Tab = createBottomTabNavigator();

export default function App() {
  const { themePalette } = useContext(Theme);

  const [isLightMode, setLightMode] = useState(true);
  const themeMode = isLightMode ? 'light' : 'dark';

  const toggleLightMode = useCallback(() => {
    setLightMode(!isLightMode);
  }, [isLightMode, setLightMode]);

  const screenOptions = useCallback(
    ({ route }): BottomTabNavigationOptions => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'AnimalsList') {
          iconName = 'home';
        } else if (route.name === 'Randomize') {
          iconName = 'star';
        }

        return (
          <Icon
            testID="tab-bar-button"
            name={iconName}
            size={size}
            color={color}
          />
        );
      },
    }),
    [],
  );

  const tabBarOptions: BottomTabBarOptions = {
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
  };

  const value = {
    isLightMode,
    themePalette: themePalette[themeMode],
    toggleLightMode,
  };

  return (
    <Theme.Provider value={value}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={screenOptions}
          tabBarOptions={tabBarOptions}>
          <Tab.Screen name="AnimalsList" component={HomePageStack} />
          <Tab.Screen name="Randomize" component={RandomizeStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </Theme.Provider>
  );
}
