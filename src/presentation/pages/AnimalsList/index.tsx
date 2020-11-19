import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FlatList, RefreshControl } from 'react-native';
import Pokemon from '../../../domain/models/Pokemon';
import Searchbar from './components/Searchbar';
import theme, { IColors } from '../../styles/theme';
import withLoading from '../../HOCs/withLoading';
import PokemonHttpService from '../../../data/services/PokemonHttpService';
import AxiosHttpClient from '../../../infra/http/AxiosHttpClient';
import AnimalsHttp from '../../../domain/services/AnimalsHttp';
import styled from 'styled-components/native';
import PokemonCard from './components/PokemonCard';
import MockAnimalsHttp from '../../../data/services/MockAnimalsHttp';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../..';
const FlatListWLoad = withLoading(FlatList);

const AnimalsList = (props: IProps) => {
  const searchBarRef = useRef();
  const client = useRef(props.client);
  const { themePalette }: { themePalette: IColors } = useContext(theme);
  const [data, setData] = React.useState(props.data);
  const [searchData, setSearchData] = React.useState(props.data);
  const [isLoading, setLoading] = React.useState(true);
  const [isRefreshing, setRefreshing] = React.useState(false);
  const [isPaginating, setPaginating] = React.useState(false);
  const [isSearching, setSearching] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const loadPage = useCallback(
    async (forcePage?: number) => {
      const result = await client.current.getAnimals(forcePage || page, 25);
      const newData = page > 1 ? [...data, ...result] : result;
      setData(newData);
      setSearchData(newData);
      setLoading(false);
      setPaginating(false);
      setRefreshing(false);
    },
    [client, data, page],
  );

  useEffect(() => {
    loadPage();
  }, [page]);

  const onPress = useCallback(
    (event, pokemon: Pokemon) => {
      event.persist();

      props.navigation.push('DetailsPage', {
        pokemon,
        pokemons: data,
      });
    },
    [props.navigation, data],
  );

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <PokemonCard
          data-test="animal-list-item"
          pokemon={item}
          key={item.name}
          onPress={onPress}
        />
      );
    },
    [onPress],
  );

  const keyExtractor = useCallback((item: Pokemon) => {
    return item.id;
  }, []);

  const filterList = useCallback(
    async (text) => {
      if (text.length === 0) {
        setSearching(false);
        setSearchData(data);
        return;
      }

      const result = await client.current.getAnimalByName(text, data);
      setSearching(true);
      setSearchData(result);
    },
    [data, client, setSearchData],
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    searchBarRef.current.resetInput();
    loadPage(1);
  }, [searchBarRef, loadPage, setRefreshing]);

  return (
    <StyledSafeArea>
      <StyledList
        backgroundColor={themePalette.white1}
        data-test="animals-list"
        data={searchData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl
            tintColor={themePalette.primary}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
        progressViewOffset={1000}
        refreshing={isLoading}
        isLoading={isLoading}
        onEndReached={() => {
          if (!isPaginating && !isSearching) {
            setPaginating(true);
            setPage(page + 1);
          }
        }}
        ListFooterComponent={
          isPaginating && (
            <PaginationLoadIcon size="large" color={themePalette.primary} />
          )
        }
        onEndReachedThreshold={0.1}
      />
      <ContainerSearchBar isRefreshing={isRefreshing}>
        <Searchbar
          isDisabled={isRefreshing}
          isEditable={!isLoading}
          placeholder="Write here to search!"
          ref={(ref) => {
            searchBarRef.current = ref;
          }}
          data-test="search-bar"
          onSearch={filterList}
        />
      </ContainerSearchBar>
    </StyledSafeArea>
  );
};

export type AnimalsNavigationProps = StackNavigationProp<
  RootStackParamList,
  'AnimalList'
>;

interface IProps {
  data: Pokemon[];
  client: AnimalsHttp;
  pokemon: Pokemon;
  navigation: AnimalsNavigationProps;
}

AnimalsList.defaultProps = {
  data: [],
  client: new PokemonHttpService(
    new AxiosHttpClient('https://pokeapi.co/api/v2/'),
  ),
  // client: new MockAnimalsHttp(),
};

export default AnimalsList;

const StyledList = styled(FlatListWLoad).attrs((props) => ({
  contentContainerStyle: {
    paddingTop: 60,
    backgroundColor: props.backgroundColor,
  },
}))`
  width: 100%;
`;
const ContainerSearchBar = styled.View`
  width: 100%;
  position: absolute;
  top: 8px;
  opacity: ${(props) => (props.isRefreshing ? 0.1 : 1)};
`;

const PaginationLoadIcon = styled.ActivityIndicator`
  padding: 15px 0px;
`;

const StyledSafeArea = styled.SafeAreaView`
  align-items: center;
  width: 100%;
  height: 100%;
`;
