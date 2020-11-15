import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { InteractionManager, StyleSheet, Animated } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../..';
import pokemonDetailLoad from '../../../data/mock/pokemonDetailLoad';
import PokemonHttpService from '../../../data/services/PokemonHttpService';
import { TOTAL_AVAILABLE_POKEMONS } from '../../../data/services/utils/pokeApiUtils';
import Pokemon from '../../../domain/models/Pokemon';
import AxiosHttpClient from '../../../infra/http/AxiosHttpClient';
import { capitalize } from '../../../utils/stringUtils';
import Label from '../../components/Label';
import withLoading from '../../HOCs/withLoading';
import fonts from '../../styles/fonts';
import theme, { IColors } from '../../styles/theme';
import Accordion from './components/Accordion';
import HeaderButtons from './components/HeaderButtons';
import Section from './components/Section';
import Stat from './components/Stat';
import Type from './components/Type';

function DetailsPage(props: IProps) {
  let scrollPosition = useRef(0).current;
  let animatedOpacity = useRef(new Animated.Value(0)).current;
  let currentPointer = useRef(Number(props.route?.params?.pokemon.id));
  let [scrollView, setScrollView] = useState<ScrollView | undefined>();

  const themePalette: IColors = useContext(theme);
  const [showShiny, setShowShiny] = useState(false);
  const [pokemon, setPokemon] = useState(props.route?.params?.pokemon);
  const pokemons = useRef(props.route?.params?.pokemons);
  const [isLoading, setLoading] = useState(false);

  const headerButtonPressed = useCallback(
    async (isRightButtonPressed) => {
      let newPokemon: Pokemon;
      currentPointer.current += isRightButtonPressed ? 1 : -1;

      if (currentPointer.current < 1) {
        currentPointer.current = TOTAL_AVAILABLE_POKEMONS;
      }

      if (!pokemons.current[currentPointer.current]) {
        setLoading(true);
        setPokemon({
          ...pokemon,
          ...pokemonDetailLoad,
        });
        pokemons.current.push(
          await props.client.getAnimal(
            undefined,
            (
              currentPointer.current + (isRightButtonPressed ? 1 : 0)
            ).toString(),
          ),
        );
      }

      newPokemon = pokemons.current[currentPointer.current];
      props.navigation.setOptions({
        title: capitalize(newPokemon.name),
      });

      setLoading(false);
      setPokemon(newPokemon);
    },
    [pokemon, setPokemon, props.client, props.navigation],
  );

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons isLoading={isLoading} onPress={headerButtonPressed} />
      ),
    });
  }, [props.navigation, isLoading, headerButtonPressed]);

  useEffect(() => {
    props.navigation.setOptions({
      title: capitalize(props.route?.params?.pokemon?.name),
    });
    return () => {};
  }, [props.route, props.navigation, props]);

  const onAccordionOpened = useCallback(
    (toValue: number) => {
      InteractionManager.runAfterInteractions(() => {
        scrollView?.scrollTo({
          y: scrollPosition + toValue,
        });
      });
    },
    [scrollView, scrollPosition],
  );

  const toggleShiny = useCallback(() => {
    if (isLoading) {
      return;
    }
    Animated.timing(animatedOpacity, {
      toValue: !showShiny ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setShowShiny(!showShiny);
  }, [isLoading, setShowShiny, animatedOpacity, showShiny]);

  const animatedShinyContainer = {
    backgroundColor: themePalette.gray2,
    opacity: animatedOpacity,
  };

  return (
    <Container
      ref={(ref) => {
        if (ref && !scrollView) {
          setScrollView(ref);
          scrollView = ref;
        }
      }}
      onScroll={({ nativeEvent }) => {
        scrollPosition = nativeEvent.contentOffset.y;
      }}
      scrollEventThrottle={16}
      backgroundColor={themePalette.white2}>
      <ImageContainer>
        <ImagePokemonWLoad
          isLoading={isLoading}
          source={{
            uri: pokemon.image,
          }}
          resizeMode="cover"
        />
        <Animated.View
          style={[animated.imageContainer, animatedShinyContainer]}>
          <ImagePokemonWLoad
            isLoading={isLoading}
            source={{
              uri: pokemon.shinyImage,
            }}
            resizeMode="cover"
          />
        </Animated.View>
        <EyeButton
          isLoading={isLoading}
          color={themePalette.primary}
          name={showShiny ? 'visibility-off' : 'visibility'}
          onPress={toggleShiny}
          size={fonts.icons.a}
        />
      </ImageContainer>
      <Section isRow title="Type">
        {pokemon.type.map((type) => (
          <Type key={type} type={type} />
        ))}
      </Section>
      <StatsContainer isRow isWrap title="Base stats">
        <Stat
          stat="hp"
          value={pokemon.stats.hp}
          backgroundColor={themePalette.white3}
        />
        <Stat
          stat="attack"
          value={pokemon.stats.attack}
          backgroundColor={themePalette.secondary}
        />
        <Stat
          stat="defense"
          value={pokemon.stats.defense}
          backgroundColor={themePalette.secondary}
        />
        <Stat
          stat="specialAttack"
          value={pokemon.stats.specialAttack}
          backgroundColor={themePalette.white3}
        />
        <Stat
          stat="specialDefense"
          value={pokemon.stats.specialDefense}
          backgroundColor={themePalette.white3}
        />
        <Stat
          stat="speed"
          value={pokemon.stats.speed}
          backgroundColor={themePalette.secondary}
        />
        <Stat
          stat="specialAttack"
          value={pokemon.stats.specialAttack}
          backgroundColor={themePalette.secondary}
        />
        <Stat
          stat="specialDefense"
          value={pokemon.stats.specialDefense}
          backgroundColor={themePalette.white3}
        />
      </StatsContainer>
      <Section title="Moves">
        {pokemon.moves.map((move) => (
          <Accordion
            onAccordionOpened={onAccordionOpened}
            key={move.name}
            title={move.name}>
            <Label font={fonts.t2}>{move.description}</Label>
          </Accordion>
        ))}
      </Section>
    </Container>
  );
}

export default DetailsPage;

DetailsPage.defaultProps = {
  client: new PokemonHttpService(
    new AxiosHttpClient('https://pokeapi.co/api/v2/'),
  ),
};

interface IProps {
  route: RouteProp<RootStackParamList, 'DetailsPage'>;
  navigation: StackNavigationProp<RootStackParamList, 'DetailsPage'>;
  client: PokemonHttpService;
}

const animated = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
  },
});

const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingBottom: 20,
  },
}))`
  flex: 1;
  align-self: stretch;
  background-color: ${(props) => props.backgroundColor};
`;

const ImageContainer = styled.View`
  align-self: stretch;
  height: 262px;
  align-items: center;
`;

const ImagePokemon = styled.Image`
  height: 265px;
  width: 265px;
`;

const ImagePokemonWLoad = withLoading(ImagePokemon);

const StatsContainer = styled(Section)`
  height: 200px;
`;

const EyeButton = styled(Icon)`
  position: absolute;
  top: 15px;
  right: 15px;
  opacity: ${(props) => (props.isLoading ? 0.2 : 1)};
`;
