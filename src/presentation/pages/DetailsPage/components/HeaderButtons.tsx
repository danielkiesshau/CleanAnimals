import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import fonts from 'presentation/styles/fonts';
import theme from 'presentation/styles/theme';

interface Props {
  onPress: (isNextPressed: boolean) => void;
  isLoading?: boolean;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
}

export default function HeaderButtons(props: Props) {
  const { themePalette } = useContext(theme);
  return (
    <Container>
      {props.isLoading && (
        <LoadIndicator color={themePalette.primary} size="small" />
      )}
      <ChevronButton
        isDisabled={props.leftDisabled}
        name="chevron-left"
        size={fonts.icons.header}
        color={themePalette.primary}
        onPress={() => {
          if (!props.leftDisabled) {
            props.onPress(false);
          }
        }}
      />
      <ChevronButton
        isDisabled={props.rightDisabled}
        name="chevron-right"
        size={fonts.icons.header}
        color={themePalette.primary}
        onPress={() => {
          if (!props.rightDisabled) {
            props.onPress(true);
          }
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
  opacity: ${(props) => (props.isDisabled ? 0.2 : 1)};
`;

const LoadIndicator = styled.ActivityIndicator`
  margin-right: 10px;
`;
