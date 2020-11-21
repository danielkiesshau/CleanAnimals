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
import { InteractionManager, Animated } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { RootStackParamList } from 'config/routes';
import pokemonDetailLoad from 'data/mock/pokemonDetailLoad';
import PokemonHttpService from 'data/services/PokemonHttpService';
import {
  POKE_BASE_URL,
  TOTAL_AVAILABLE_POKEMONS,
} from 'data/services/utils/pokeApiUtils';
import Pokemon from 'domain/models/Pokemon';
import AxiosHttpClient from 'infra/http/AxiosHttpClient';
import { capitalize } from 'utils/stringUtils';
import theme from 'presentation/styles/theme';
import HeaderButtons from './components/HeaderButtons';
import ImageContainer from './components/ImageContainer';
import Moves from './components/Moves';
import Section from './components/Section';
import Stats from './components/Stats';
import Type from './components/Type';

const GET_PER_PAGINATION = 25;

function DetailsPage(props: Props) {
  let scrollPosition = useRef(0);
  let animatedOpacity = useRef(new Animated.Value(0));
  let currentPointer = useRef(Number(props.route?.params?.pokemon.id));
  let [scrollView, setScrollView] = useState<ScrollView | undefined>();

  const { themePalette } = useContext(theme);
  const [showNormal, setShowNormal] = useState(true);
  const [showShiny, setShowShiny] = useState(false);
  const [page, setPage] = useState(2);
  const [pokemon, setPokemon] = useState(props.route?.params?.pokemon);
  const pokemons = useRef(props.route?.params?.pokemons || []);
  const [isLoading, setLoading] = useState(false);

  const headerButtonPressed = useCallback(
    async (isRightButtonPressed) => {
      let newPokemon: Pokemon;
      currentPointer.current += isRightButtonPressed ? 1 : -1;

      newPokemon = pokemons.current[currentPointer.current];
      props.navigation.setOptions({
        title: capitalize(newPokemon?.name || pokemon.name),
      });

      setPokemon(
        !newPokemon ? { ...pokemon, ...pokemonDetailLoad } : newPokemon,
      );

      if (
        !isLoading &&
        currentPointer.current >= (page - 1) * GET_PER_PAGINATION - 10
      ) {
        setLoading(true);
        const result = await props.client.getAnimals(page, GET_PER_PAGINATION);
        const newPage = page + 1;
        pokemons.current = [...pokemons.current, ...result];
        setPage(newPage);
        setLoading(false);
      }
    },
    [setPokemon, props.client, props.navigation, isLoading, page, pokemon],
  );

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () =>
        pokemons.current.length > 0 && (
          <HeaderButtons
            isLoading={isLoading}
            onPress={headerButtonPressed}
            leftDisabled={currentPointer.current === 1}
            rightDisabled={currentPointer.current === TOTAL_AVAILABLE_POKEMONS}
          />
        ),
    });
  }, [props.navigation, isLoading, headerButtonPressed, pokemon]);

  useEffect(() => {
    props.navigation.setOptions({
      title: capitalize(props.route?.params?.pokemon?.name),
    });
    return () => {};
  }, [props.route, props.navigation, props]);

  const onAccordionOpened = useCallback(
    (toValue: number, isOpening: boolean, positionY: number) => {
      InteractionManager.runAfterInteractions(() => {
        const diff = scrollPosition.current - positionY;
        const outOfFOV = (diff < 150 && diff > 75) || (diff < 0 && diff > -90);
        if (isOpening && outOfFOV) {
          scrollView?.scrollTo({
            y: scrollPosition.current + toValue + 25,
          });
        }
      });
    },
    [scrollView, scrollPosition],
  );

  const toggleShiny = useCallback(() => {
    if (showShiny) {
      setShowNormal(true);
    }
    if (isLoading) {
      return;
    }
    Animated.timing(animatedOpacity.current, {
      toValue: showShiny ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (!showShiny) {
        setShowNormal(!showNormal);
      }
    });

    setShowShiny(!showShiny);
  }, [
    isLoading,
    setShowShiny,
    animatedOpacity,
    showShiny,
    setShowNormal,
    showNormal,
  ]);

  const animatedShinyContainer = {
    backgroundColor: themePalette.gray2,
    opacity: animatedOpacity.current,
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
        if (nativeEvent.contentOffset.y > 0) {
          scrollPosition.current = nativeEvent.contentOffset.y;
        }
      }}
      scrollEventThrottle={16}
      backgroundColor={themePalette.white2}>
      <ImageContainer
        pokemon={pokemon}
        toggleShiny={toggleShiny}
        showShiny={showShiny}
        showNormal={showNormal}
        animatedShinyContainer={animatedShinyContainer}
      />
      <Section isRow title="Type">
        {pokemon.type.map((type) => (
          <Type key={type} type={type} />
        ))}
      </Section>
      <Stats pokemon={pokemon} />
      <Moves pokemon={pokemon} onAccordionOpened={onAccordionOpened} />
    </Container>
  );
}

export default DetailsPage;

DetailsPage.defaultProps = {
  client: new PokemonHttpService(new AxiosHttpClient(POKE_BASE_URL)),
};

interface Props {
  route: RouteProp<RootStackParamList, 'DetailsPage'>;
  navigation: StackNavigationProp<RootStackParamList, 'DetailsPage'>;
  client: PokemonHttpService;
}

const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingBottom: 20,
  },
}))`
  flex: 1;
  align-self: stretch;
  background-color: ${(props) => props.backgroundColor};
`;
