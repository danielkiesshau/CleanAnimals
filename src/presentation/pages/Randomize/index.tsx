import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../..';
import PokemonHttpService from '../../../data/services/PokemonHttpService';
import Label from '../../components/Label';
import fonts from '../../styles/fonts';
import theme, { IColors } from '../../styles/theme';
import AxiosHttpClient from '../../../infra/http/AxiosHttpClient';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'DetailsPage'>;
  client: PokemonHttpService;
}

const Randomize = (props: Props) => {
  const themePalette: IColors = useContext(theme);
  const [isLoading, setLoading] = useState(false);
  return (
    <Container backgroundColor={themePalette.white1}>
      <StyledLabel font={fonts.h2} color="secondary">
        Press the button to pick a random Pokemon!
      </StyledLabel>
      <ContainerButton>
        <Pressable
          disabled={isLoading}
          data-test="discover-button"
          onPress={async () => {
            setLoading(true);
            const pokemon = await props.client.getRandomPokemon();
            setLoading(false);
            props.navigation.navigate('DetailsPage', {
              pokemon,
              pokemons: [],
            });
          }}>
          <DiscoverLabel
            font={fonts.h1}
            color="primary"
            opacity={isLoading ? 0.25 : 1}>
            Discover a Pokemon!
          </DiscoverLabel>
        </Pressable>
        {isLoading && (
          <LoadIndicator color={themePalette.primary} size="small" />
        )}
      </ContainerButton>
    </Container>
  );
};

export default Randomize;

Randomize.defaultProps = {
  client: new PokemonHttpService(
    new AxiosHttpClient('https://pokeapi.co/api/v2/'),
  ),
};

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor};
`;

const ContainerButton = styled(Pressable)`
  align-items: center;
`;

const StyledLabel = styled(Label)`
  width: 300px;
  text-align: center;
  margin-bottom: 20px;
`;

const DiscoverLabel = styled(Label)`
  opacity: ${(props) => props.opacity};
`;

const LoadIndicator = styled.ActivityIndicator`
  position: absolute;
  top: 35px;
`;
