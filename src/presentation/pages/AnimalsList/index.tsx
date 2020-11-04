import React, {useContext} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
  },
});

const AnimalsList: React.FC = () => {
  return(
  <SafeAreaView style={styles.container}>
    <Text data-test="welcome-text"
    style={styles.welcome}>Lista de animais!</Text>
  </SafeAreaView>
)};

export default AnimalsList;

