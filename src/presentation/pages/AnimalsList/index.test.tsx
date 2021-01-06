import React from 'react';
import { shallow } from 'enzyme';
import AnimalsList from '.';
import { findByAttr } from 'utils/testUtils';
import pokemons from 'data/mock/pokemons';

const setupShallowWrapper = (props = {}) => shallow(<AnimalsList {...props} />);

describe('Animals List', () => {
  test('should render animals list', () => {
    const wrapper = setupShallowWrapper();
    const component = findByAttr(wrapper, 'animals-list');
    expect(component.length).toBe(1);
  });
});

describe('Search Bar', () => {
  test('should render search-bar', () => {
    const wrapper = setupShallowWrapper();
    const component = findByAttr(wrapper, 'search-bar');
    expect(component.length).toBe(1);
  });

  test('should filter list when searching', async () => {
    const mockSetSearch = jest.fn();
    React.useState = () => [[], mockSetSearch];
    const wrapper = setupShallowWrapper({ data: [...pokemons] });
    const searchBar = findByAttr(wrapper, 'search-bar').dive();
    const searchInput = findByAttr(searchBar, 'search-input');

    await searchInput.props().onChangeText('sparrow');

    expect(mockSetSearch.mock.calls.length).toBe(1);
  });

  test('should reset list when text is cleared', async () => {
    const mockSetSearch = jest.fn();
    React.useState = () => [pokemons, mockSetSearch];
    const wrapper = setupShallowWrapper({ data: [...pokemons] });
    const searchBar = findByAttr(wrapper, 'search-bar').dive();
    const searchInput = findByAttr(searchBar, 'search-input');

    await searchInput.props().onChangeText('sparrow');
    await searchInput.props().onChangeText('');
    expect(mockSetSearch).toBeCalled();
  });
});
