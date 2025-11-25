// ============================================================================
// IMPORTS
// ============================================================================

// Third-party libraries
import 'react-native-gesture-handler';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  BottomTabBarOptions,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import codePush from 'react-native-code-push';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Internal modules
import Theme from './presentation/styles/theme';
import { HomePageStack, RandomizeStack } from './config/routes';
import { ContextClientAPI } from './domain/services/Factories/ClientAPI';
import NotificationService from './infra/notifications/NotificationService';

// ============================================================================
// CONFIGURATION
// ============================================================================

enableScreens();
const Tab = createBottomTabNavigator();

// Tab bar icon mapping
const TAB_ICONS: Record<string, string> = {
  AnimalsList: 'home',
  Randomize: 'star',
};

// Tab bar height configuration
const TAB_BAR_HEIGHT = {
  ios: 90,
  android: 60,
};

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Custom hook to initialize notification service
 */
const useNotifications = () => {
  useEffect(() => {
    NotificationService.localNotification('Clean Animals', 'Welcome!');
  }, []);
};

/**
 * Custom hook to manage theme state
 */
const useThemeManager = () => {
  const { themePalette } = useContext(Theme);
  const [isLightMode, setLightMode] = useState(true);
  const themeMode = isLightMode ? 'light' : 'dark';

  const toggleLightMode = useCallback(() => {
    setLightMode(!isLightMode);
  }, [isLightMode]);

  return {
    isLightMode,
    themeMode,
    themePalette: themePalette[themeMode],
    toggleLightMode,
  };
};

/**
 * Custom hook to manage API client state
 */
const useClientAPI = () => {
  const { client: clientAPI } = useContext(ContextClientAPI);
  const [client, setClientAPI] = useState(clientAPI);

  return { client, setClientAPI };
};

// ============================================================================
// NAVIGATION CONFIGURATION
// ============================================================================

/**
 * Configure screen options for tab navigation
 */
const configureScreenOptions = ({ route }): BottomTabNavigationOptions => ({
  tabBarIcon: ({ color, size }) => {
    const iconName = TAB_ICONS[route.name] || 'help';
    return (
      <Icon testID="tab-bar-button" name={iconName} size={size} color={color} />
    );
  },
});

/**
 * Generate tab bar options based on theme
 */
const getTabBarOptions = (themePalette: any): BottomTabBarOptions => ({
  tabStyle: {
    backgroundColor: themePalette.white1,
  },
  activeTintColor: themePalette.primary,
  inactiveTintColor: themePalette.lightPrimary,
  style: {
    height: Platform.OS === 'ios' ? TAB_BAR_HEIGHT.ios : TAB_BAR_HEIGHT.android,
    backgroundColor: themePalette.white1,
  },
  showLabel: false,
});

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const App = () => {
  // Initialize hooks
  useNotifications();
  const { client, setClientAPI } = useClientAPI();
  const { isLightMode, themePalette, toggleLightMode } = useThemeManager();

  // Configure navigation
  const screenOptions = useCallback(configureScreenOptions, []);
  const tabBarOptions = getTabBarOptions(themePalette);

  // Theme context value
  const themeValue = {
    isLightMode,
    themePalette,
    toggleLightMode,
  };

  // Client API context value
  const clientAPIValue = {
    client,
    setClientAPI,
  };

  return (
    <ContextClientAPI.Provider value={clientAPIValue}>
      <Theme.Provider value={themeValue}>
        <NavigationContainer>
          <StatusBar
            barStyle="light-content"
            backgroundColor={themePalette.primary}
          />
          <Tab.Navigator
            screenOptions={screenOptions}
            tabBarOptions={tabBarOptions}>
            <Tab.Screen name="AnimalsList" component={HomePageStack} />
            <Tab.Screen name="Randomize" component={RandomizeStack} />
          </Tab.Navigator>
        </NavigationContainer>
      </Theme.Provider>
    </ContextClientAPI.Provider>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default codePush(App);
