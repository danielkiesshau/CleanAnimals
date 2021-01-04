import React, { useCallback, useContext, useEffect, useRef } from 'react';
import Pokemon from 'domain/models/Pokemon';
import AnimalsHttp from 'domain/services/AnimalsHttp';
import { ContextClientAPI } from '../../../../domain/services/Factories/ClientAPI';

export default (clientProp: AnimalsHttp, dataProp: Pokemon[]) => {
  const { client, setClientAPI } = useContext(ContextClientAPI);
  const searchBarRef = useRef();
  const [data, setData] = React.useState(dataProp);
  const [searchData, setSearchData] = React.useState(data);
  const [isLoading, setLoading] = React.useState(true);
  const [isRefreshing, setRefreshing] = React.useState(false);
  const [isPaginating, setPaginating] = React.useState(false);
  const [isSearching, setSearching] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const loadPage = useCallback(
    async (forcePage?: number) => {
      const result = await client.getAnimals(forcePage || page, 25);
      const newData = page > 1 ? [...data, ...result] : result;
      setData(newData);
      client.animals = newData;
      setSearchData(newData);
      setLoading(false);
      setPaginating(false);
      setRefreshing(false);
    },
    [client, data, page],
  );

  const filterList = useCallback(
    async (text) => {
      if (text.length === 0) {
        setSearching(false);
        setSearchData(data);
        return;
      }

      const result = await client.getAnimalByName(text, data);
      setSearching(true);
      setSearchData(result);
    },
    [data, client, setSearchData],
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    searchBarRef?.resetInput();
    loadPage(1);
  }, [searchBarRef, loadPage, setRefreshing]);

  useEffect(() => {
    loadPage();
    // eslint-disable-next-line
  }, [page]);

  return {
    data,
    setData,
    searchData,
    setSearchData,
    isLoading,
    setLoading,
    isRefreshing,
    setRefreshing,
    isPaginating,
    setPaginating,
    isSearching,
    setSearching,
    page,
    setPage,
    onRefresh,
    filterList,
    loadPage,
    searchBarRef,
  };
};
