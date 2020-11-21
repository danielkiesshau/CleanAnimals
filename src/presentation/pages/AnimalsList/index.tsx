import React, { useCallback, useContext } from 'react';
import { FlatList, RefreshControl, ViewProps } from 'react-native';
import Pokemon from 'domain/models/Pokemon';
import Searchbar from './components/Searchbar';
import theme from 'presentation/styles/theme';
import withLoading from 'presentation/HOCs/withLoading';
import PokemonHttpService from 'data/services/PokemonHttpService';
import AxiosHttpClient from 'infra/http/AxiosHttpClient';
import AnimalsHttp from 'domain/services/AnimalsHttp';
import styled from 'styled-components/native';
import PokemonCard from './components/PokemonCard';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'config/routes';
import useAnimalsList from './hooks/useAnimalsList';
const FlatListWLoad = withLoading(FlatList);

const AnimalsList = (props: Props) => {
  const listController = useAnimalsList(props.client, props.data);
  const { themePalette } = useContext(theme);

  const onPress = useCallback(
    (pokemon: Pokemon) => {
      props.navigation.push('DetailsPage', {
        pokemon,
        pokemons: listController.data,
      });
    },
    [props.navigation, listController.data],
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

  return (
    <StyledSafeArea>
      <StyledList
        backgroundColor={themePalette.white1}
        data-test="animals-list"
        data={listController.searchData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl
            tintColor={themePalette.primary}
            refreshing={listController.isRefreshing}
            onRefresh={listController.onRefresh}
          />
        }
        progressViewOffset={1000}
        refreshing={listController.isLoading}
        isLoading={listController.isLoading}
        onEndReached={() => {
          if (!listController.isPaginating && !listController.isSearching) {
            listController.setPaginating(true);
            listController.setPage(listController.page + 1);
          }
        }}
        ListFooterComponent={
          listController.isPaginating && (
            <PaginationLoadIcon size="large" color={themePalette.primary} />
          )
        }
        onEndReachedThreshold={0.1}
      />
      <ContainerSearchBar isRefreshing={listController.isRefreshing}>
        <Searchbar
          isDisabled={listController.isRefreshing}
          isEditable={!listController.isLoading}
          placeholder="Write here to search!"
          ref={(ref) => {
            listController.searchBarRef.current = ref;
          }}
          data-test="search-bar"
          onSearch={listController.filterList}
        />
      </ContainerSearchBar>
    </StyledSafeArea>
  );
};

AnimalsList.defaultProps = {
  data: [],
  client: new PokemonHttpService(
    new AxiosHttpClient('https://pokeapi.co/api/v2/'),
  ),
  // client: new MockAnimalsHttp(),
};

export default AnimalsList;

export type AnimalsNavigationProps = StackNavigationProp<
  RootStackParamList,
  'AnimalList'
>;

interface Props {
  data: Pokemon[];
  client: AnimalsHttp;
  pokemon: Pokemon;
  navigation: AnimalsNavigationProps;
}

interface ContainerSearchBarProps extends ViewProps {
  isRefreshing?: boolean;
}

const StyledList = styled(FlatListWLoad).attrs((props) => ({
  contentContainerStyle: {
    paddingTop: 60,
    backgroundColor: props.backgroundColor,
  },
}))`
  width: 100%;
`;

const ContainerSearchBar = styled.View<ContainerSearchBarProps>`
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
