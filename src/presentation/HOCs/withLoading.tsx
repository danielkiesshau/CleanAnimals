import React, { useContext, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import theme, { IColors } from '../styles/theme';

export default function withLoading(Component) {
  return (props) => {
    const { themePalette } = useContext(theme);
    return props.isLoading ? (
      <Container backgroundColor={themePalette.white1}>
        <ActivityIndicator
          data-test="load-icon"
          color={themePalette.primary}
          size="large"
        />
      </Container>
    ) : (
      <Component {...props} />
    );
  };
}

export type Loading = {
  isLoading: boolean;
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`;