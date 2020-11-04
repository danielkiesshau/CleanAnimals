import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimalsList from './presentation/pages/AnimalsList';
import Randomize from './presentation/pages/Randomize';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
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
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="AnimalsList" component={AnimalsList} />
        <Tab.Screen name="Randomize" component={Randomize} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
