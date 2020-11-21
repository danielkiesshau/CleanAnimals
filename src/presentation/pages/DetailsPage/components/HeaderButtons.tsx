import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BorderlessButton } from 'react-native-gesture-handler';
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
      <Button
        onPress={() => {
          if (!props.leftDisabled) {
            props.onPress(false);
          }
        }}>
        <Icon
          isDisabled={props.leftDisabled}
          name="chevron-left"
          size={fonts.icons.header}
          color={themePalette.primary}
        />
      </Button>
      <Button
        onPress={() => {
          if (!props.rightDisabled) {
            props.onPress(true);
          }
        }}>
        <Icon
          isDisabled={props.rightDisabled}
          name="chevron-right"
          size={fonts.icons.header}
          color={themePalette.primary}
        />
      </Button>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Button = styled(BorderlessButton)`
  opacity: ${(props) => (props.isDisabled ? 0.2 : 1)};
`;

const LoadIndicator = styled.ActivityIndicator`
  margin-right: 10px;
`;
