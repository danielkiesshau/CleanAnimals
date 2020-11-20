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
  const { themePalette } = useContext(theme);
  return (
    <Container>
      {props.isLoading && (
        <LoadIndicator color={themePalette.primary} size="small" />
      )}
      <ChevronButton
        name="chevron-left"
        size={fonts.icons.header}
        color={themePalette.primary}
        onPress={() => {
          props.onPress(false);
        }}
      />
      <ChevronButton
        name="chevron-right"
        size={fonts.icons.header}
        color={themePalette.primary}
        onPress={() => {
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

const LoadIndicator = styled.ActivityIndicator`
  margin-right: 10px;
`;
