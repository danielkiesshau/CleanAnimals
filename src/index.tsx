import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Font from './presentation/styles/fonts';
import Theme, { ITheme } from './presentation/styles/theme';

import AnimalsList from './presentation/pages/AnimalsList';
import Randomize from './presentation/pages/Randomize';

enableScreens();

const Tab = createBottomTabNavigator();

export default function App() {
  const theme: ITheme = useContext(Theme);
  return (
    <Theme.Provider value={Theme.light}>
      <Font.Provider value={Font}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'AnimalsList') {
                  iconName = 'home';
                } else if (route.name === 'Randomize') {
                  iconName = 'star';
                }

                // You can return any component that you like here!
                return <Icon name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: theme.light.primary,
              inactiveTintColor: theme.light.lightPrimary,
            }}>
            <Tab.Screen name="AnimalsList" component={AnimalsList} />
            <Tab.Screen name="Randomize" component={Randomize} />
          </Tab.Navigator>
        </NavigationContainer>
      </Font.Provider>
    </Theme.Provider>
  );
}
