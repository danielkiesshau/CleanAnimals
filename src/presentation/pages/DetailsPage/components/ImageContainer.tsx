import React, { useContext } from 'react';
import { StyleSheet, Animated, ViewProps } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import withLoading from 'presentation/HOCs/withLoading';
import fonts from 'presentation/styles/fonts';
import theme from 'presentation/styles/theme';
import { BorderlessButton } from 'react-native-gesture-handler';

interface Props {
  animal: any;
  animatedShinyContainer?: any;
  toggleShiny: Function;
  showShiny?: boolean;
  showNormal?: boolean;
}

export default function ImageContainer(props: Props) {
  const { themePalette } = useContext(theme);
  const { animal } = props;
  return (
    <Container backgroundColor={themePalette.white1}>
      {props.showNormal && (
        <ImageAnimalWLoad
          isLoading={!animal.image}
          source={{
            uri: animal.image,
          }}
          resizeMode="cover"
        />
      )}
      <Animated.View
        style={[animated.imageContainer, props.animatedShinyContainer]}>
        <ImageAnimalWLoad
          isLoading={!animal.image}
          source={{
            uri: animal.shinyImage,
          }}
          resizeMode="cover"
        />
      </Animated.View>
      <EyeButton
        testID="shiny-button"
        isLoading={!animal.image}
        onPress={props.toggleShiny}>
        <Icon
          color={themePalette.primary}
          name={'visibility'}
          size={fonts.icons.a}
        />
      </EyeButton>
    </Container>
  );
}

const animated = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
  },
});

interface ImageContainerProps extends ViewProps {
  backgroundColor?: string;
}

const Container = styled.View<ImageContainerProps>`
  align-self: stretch;
  height: 262px;
  align-items: center;
`;

const ImagePokemon = styled.Image`
  height: 265px;
  width: 265px;
`;

const ImageAnimalWLoad = withLoading(ImagePokemon);

const EyeButton = styled(BorderlessButton)`
  position: absolute;
  top: 15px;
  right: 15px;
  opacity: ${(props) => (props.isLoading ? 0.2 : 1)};
`;
