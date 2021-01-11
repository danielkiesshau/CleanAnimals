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
import { getConstratedColor } from '../../../../utils/styleUtils';

interface Props {
  animal: Pokemon;
  onPress: any;
}
const SinglePress = withPreventDoubleClick(RectButton);
export default function PokemonCard(props: Props) {
  const { themePalette } = useContext(theme);
  return (
    <Container
      testID={'poke-card'}
      onPress={() => {
        props.onPress(props.animal);
      }}
      theme={themePalette}>
      <Image
        source={{
          uri: props.animal.image,
        }}
        resizeMode="cover"
      />
      <ContainerLabels>
        <Label customColor={themePalette.black} autoCapitalize font={fonts.h1}>
          {props.animal.name}
        </Label>
        <ContainerTypes>
          {props.animal.type?.map((type) => (
            <ContainerType key={type} backgroundColor={getTypeColor(type)}>
              <LabelType
                autoCapitalize
                font={fonts.h3}
                customColor={getConstratedColor(getTypeColor(type))}>
                {type}
              </LabelType>
            </ContainerType>
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
        width="100%"
        height="70"
        backgroundColor={themePalette.white3}
        foregroundColor={themePalette.lightPrimary}>
        <Rect x="15" y="4" rx="4" ry="4" height="60" width="60" />
        <Rect x="20%" rx="4" ry="4" y="28" width="25%" height="10" />
        <Rect x="89%" rx="4" ry="4" y="28" width="10%" height="10" />
      </ContentLoader>
    </SkeletonContainer>
  );
};

const BaseView = styled(SinglePress)`
  height: 70px;
  padding: 0px 0px 0px 0px;
  width: 100%;
  background-color: ${(props) => props.theme.white3};
  margin: 2px 0px;
`;
const SkeletonContainer = styled(BaseView).attrs(() => ({
  onPress: () => {},
  activeOpacity: 0,
}))``;

const Container = styled(BaseView)`
  flex-direction: row;
  align-items: center;
  padding: 0px 10px;
`;

const Image = styled.Image`
  height: 70px;
  width: 70px;
  margin: 0px 4px 0px 0px;
`;

const ContainerLabels = styled.View`
  flex: 1;
  align-self: stretch;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ContainerTypes = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
`;

const ContainerType = styled.View`
  height: 100%;
  width: 75px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor};
`;
const LabelType = styled(Label)``;
