import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { RootStackParamList } from '../../..';
import { capitalize } from '../../../utils/stringUtils';

function DetailsPage(props: IProps) {
  useEffect(() => {
    props.navigation.setOptions({
      title: capitalize(props.route?.params?.pokemon?.name),
    });
    return () => {};
  }, [props.route]);
  return (
    <View>
      <Text>DETAILS</Text>
    </View>
  );
}

export default DetailsPage;
interface IProps {
  route: RouteProp<RootStackParamList, 'DetailsPage'>;
  navigation: StackNavigationProp<RootStackParamList, 'DetailsPage'>;
}
