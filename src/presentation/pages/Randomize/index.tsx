import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
  },
});

const Randomize: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <Text data-test="welcome-text"
    style={styles.welcome}>Randomize!</Text>
  </SafeAreaView>
);

export default Randomize;

