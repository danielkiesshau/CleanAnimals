import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { getTypeColor } from 'data/services/utils/pokeApiUtils';
import Pokemon from 'domain/models/Pokemon';
import Label from 'presentation/components/Label';
import withPreventDoubleClick from 'presentation/HOCs/withPreventDoubleClick';
import fonts from 'presentation/styles/fonts';
import theme from 'presentation/styles/theme';
import { RectButton } from 'react-native-gesture-handler';

interface Props {
  pokemon: Pokemon;
  onPress: any;
}
const SinglePress = withPreventDoubleClick(RectButton);
export default function PokemonCard(props: Props) {
  const { themePalette } = useContext(theme);
  return (
    <Container
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
const Container = styled(SinglePress)`
  flex-direction: row;
  align-items: center;
  height: 70px;
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.theme.white2};
  margin: 2px 0px;
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
