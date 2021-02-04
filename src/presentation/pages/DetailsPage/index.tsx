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
import { TOTAL_AVAILABLE_POKEMONS } from 'data/services/utils/pokeApiUtils';
import { capitalize } from 'utils/stringUtils';
import theme from 'presentation/styles/theme';
import HeaderButtons from './components/HeaderButtons';
import ImageContainer from './components/ImageContainer';
import { ContextClientAPI } from '../../../domain/services/Factories/ClientAPI';
import HttpClient from '../../../infra/http/HttpClient';
import PokemonDetails from './components/PokemonDetails';
import DogDetails from './components/DogDetails';
import { API_CLASS } from '@env';

const GET_PER_PAGINATION = 25;
const detailComponents = {
  POKEMON: PokemonDetails,
  DOG: DogDetails,
};
const Details = detailComponents[API_CLASS];
function DetailsPage(props: Props) {
  let isMounted = useRef(true);
  let scrollPosition = useRef(0);
  let animatedOpacity = useRef(new Animated.Value(0));
  let currentPointer = useRef(0);
  let [scrollView, setScrollView] = useState<ScrollView | undefined>();

  const { client } = useContext(ContextClientAPI);
  const { themePalette } = useContext(theme);
  const [showNormal, setShowNormal] = useState(true);
  const [showShiny, setShowShiny] = useState(false);
  const [page, setPage] = useState(2);
  const [animal, setAnimal] = useState(props.route?.params?.animal);
  const animals = useRef(props.route?.params?.animals || []);
  const [isLoading, setLoading] = useState(false);

  const setHeaderTitle = useCallback(
    (animalName) => {
      const title = capitalize(animalName);
      props.navigation.setOptions({
        title: title.length > 20 ? title + '...' : title,
      });
    },
    [props.navigation],
  );
  const headerButtonPressed = useCallback(
    async (isRightButtonPressed) => {
      let newAnimal;
      currentPointer.current += isRightButtonPressed ? 1 : -1;

      newAnimal = animals.current[currentPointer.current];

      setHeaderTitle(newAnimal?.name || animal.name);

      setAnimal(!newAnimal ? { ...animal, ...pokemonDetailLoad } : newAnimal);

      if (
        !isLoading &&
        currentPointer.current >= (page - 1) * GET_PER_PAGINATION - 10
      ) {
        setLoading(true);
        const result = await client.getAnimals(page, GET_PER_PAGINATION);
        const newPage = page + 1;
        animals.current = [...animals.current, ...result];
        if (isMounted.current) {
          setPage(newPage);
          setLoading(false);
        }
      }
    },
    [setAnimal, setHeaderTitle, client, isLoading, page, animal],
  );

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () =>
        animals.current.length > 0 && (
          <HeaderButtons
            isLoading={isLoading}
            onPress={headerButtonPressed}
            leftDisabled={currentPointer.current === 1}
            rightDisabled={currentPointer.current === TOTAL_AVAILABLE_POKEMONS}
          />
        ),
    });
  }, [props.navigation, isLoading, headerButtonPressed, animal]);

  useEffect(() => {
    currentPointer.current = props.route?.params?.animals.findIndex(
      (a) => a.name === animal.name,
    );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setHeaderTitle(props.route?.params?.animal?.name);
    return () => {};
  }, [setHeaderTitle, props.route, props.navigation, props]);

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
      testID="DetailsPage"
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
        animal={animal}
        toggleShiny={toggleShiny}
        showShiny={showShiny}
        showNormal={showNormal}
        animatedShinyContainer={animatedShinyContainer}
      />
      <Details animal={animal} onAccordionOpened={onAccordionOpened} />
    </Container>
  );
}

export default DetailsPage;

interface Props {
  route: RouteProp<RootStackParamList, 'DetailsPage'>;
  navigation: StackNavigationProp<RootStackParamList, 'DetailsPage'>;
  client: HttpClient;
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
