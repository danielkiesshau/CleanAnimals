import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import fonts from '../../../styles/fonts';
import theme, { IColors } from '../../../styles/theme';

interface IProps {
  onPress: (isNextPressed: boolean) => void;
  isLoading?: boolean;
}

export default function HeaderButtons(props: IProps) {
  const themePalette: IColors = useContext(theme);
  return (
    <Container>
      <ChevronButton
        isLoading={props.isLoading}
        name="chevron-left"
        size={fonts.icons.header}
        color={themePalette.primary}
        onPress={() => {
          if (props.isLoading) {
            return;
          }
          props.onPress(false);
        }}
      />
      <ChevronButton
        isLoading={props.isLoading}
        name="chevron-right"
        size={fonts.icons.header}
        color={themePalette.primary}
        onPress={() => {
          if (props.isLoading) {
            return;
          }
          props.onPress(true);
        }}
      />
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ChevronButton = styled(Icon)`
  opacity: ${(props) => (props.isLoading ? 0.2 : 1)};
`;
