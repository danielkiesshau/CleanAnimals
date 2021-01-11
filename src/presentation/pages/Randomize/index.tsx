import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components/native';
import { RootStackParamList } from 'config/routes';
import PokemonHttpService from 'data/services/PokemonHttpService';
import Label from 'presentation/components/Label';
import fonts from 'presentation/styles/fonts';
import theme from 'presentation/styles/theme';
import withPreventDoubleClick from 'presentation/HOCs/withPreventDoubleClick';
import { BorderlessButton } from 'react-native-gesture-handler';
import { ContextClientAPI } from 'domain/services/Factories/ClientAPI';
import { API_CLASS } from '@env';
import { capitalize } from '../../../utils/stringUtils';
const packageJson = require('../../../../package.json');

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'DetailsPage'>;
  client: PokemonHttpService;
}

const SinglePress = withPreventDoubleClick(BorderlessButton);

const Randomize = (props: Props) => {
  const { client } = useContext(ContextClientAPI);
  const { themePalette } = useContext(theme);
  const [isLoading, setLoading] = useState(false);

  const discoverPressed = useCallback(async () => {
    setLoading(true);
    const pokemon = await client.getRandomAnimal();
    setLoading(false);
    props.navigation.navigate('DetailsPage', {
      pokemon,
      pokemons: [],
    });
  }, [props.navigation, setLoading, client]);

  return (
    <Container backgroundColor={themePalette.white1}>
      <StyledLabel font={fonts.h2} customColor={themePalette.black}>
        {`Press the button to pick a random ${capitalize(
          API_CLASS.toLocaleLowerCase(),
        )}!`}
      </StyledLabel>
      <ContainerButton>
        <SinglePress
          disabled={isLoading}
          testID="discover-button"
          onPress={discoverPressed}>
          <DiscoverLabel
            font={fonts.h1}
            customColor={themePalette.primary}
            opacity={isLoading ? 0.25 : 1}>
            {`Discover a ${capitalize(API_CLASS.toLocaleLowerCase())}!`}
          </DiscoverLabel>
        </SinglePress>
        {isLoading && (
          <LoadIndicator color={themePalette.primary} size="small" />
        )}
        <VersionContainer>
          <Label font={fonts.h1} customColor={themePalette.lightPrimary}>
            {`v${packageJson.version}`}
          </Label>
        </VersionContainer>
      </ContainerButton>
    </Container>
  );
};

export default Randomize;

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor};
`;

const ContainerButton = styled.View`
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

const VersionContainer = styled.View`
  padding-bottom: 20px;
  margin-top: 50px;
`;
