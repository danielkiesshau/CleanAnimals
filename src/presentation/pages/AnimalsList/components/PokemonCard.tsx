import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { getTypeColor } from 'data/services/utils/pokeApiUtils';
import Pokemon from 'domain/models/Pokemon';
import Label from 'presentation/components/Label';
import withPreventDoubleClick from 'presentation/HOCs/withPreventDoubleClick';
import fonts from 'presentation/styles/fonts';
import theme from 'presentation/styles/theme';
import { RectButton } from 'react-native-gesture-handler';
import ContentLoader, { Rect } from 'react-content-loader/native';

interface Props {
  pokemon: Pokemon;
  onPress: any;
}
const SinglePress = withPreventDoubleClick(RectButton);
export default function PokemonCard(props: Props) {
  const { themePalette } = useContext(theme);
  return (
    <Container
      testID={'poke-card'}
      onPress={() => {
        props.onPress(props.pokemon);
      }}
      theme={themePalette}>
      <Image
        source={{
          uri: props.pokemon.image,
        }}
        resizeMode="cover"
      />
      <ContainerLabels>
        <Label customColor={themePalette.black} autoCapitalize font={fonts.h1}>
          {props.pokemon.name}
        </Label>
        <ContainerTypes>
          {props.pokemon.type.map((type) => (
            <LabelType
              autoCapitalize
              key={type}
              customColor={getTypeColor(type)}>
              {type}
            </LabelType>
          ))}
        </ContainerTypes>
      </ContainerLabels>
    </Container>
  );
}

export const PokemonCardSkeleton = () => {
  const { themePalette } = useContext(theme);
  return (
    <SkeletonContainer theme={themePalette}>
      <ContentLoader
        viewBox="0 0 380 70"
        backgroundColor={themePalette.white3}
        foregroundColor={themePalette.lightPrimary}>
        <Rect y="10" rx="4" ry="4" height="60" width="60" />
        <Rect x="80" rx="4" ry="4" y="32" width="125" height="10" />
        <Rect x="325" rx="4" ry="4" y="32" width="50" height="10" />
      </ContentLoader>
    </SkeletonContainer>
  );
};

const BaseView = styled(SinglePress)`
  height: 70px;
  width: 100%;
  background-color: ${(props) => props.theme.white2};
  margin: 2px 0px;
`;
const SkeletonContainer = styled(BaseView).attrs(() => ({
  onPress: () => {},
  activeOpacity: 0,
}))``;

const Container = styled(BaseView)`
  flex-direction: row;
  align-items: center;
`;

const Image = styled.Image`
  height: 70px;
  width: 70px;
  margin: 0px 4px 0px 0px;
`;

const ContainerLabels = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ContainerTypes = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LabelType = styled(Label)`
  margin: 0px 6px 0px 0px;
`;
