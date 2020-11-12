import React from 'react';
import { shallow } from 'enzyme';
import { findByAttr } from '../../../../utils/testUtils';
import Searchbar from './Searchbar';

const setupShallowWrapper = (props = {}) => shallow(<Searchbar {...props} />);

describe('Searchbar', () => {
  test('should render clear button if Searchbar has text', () => {
    const wrapper = setupShallowWrapper({ initialValue: 'text' });
    const component = findByAttr(wrapper, 'clear-button');
    expect(component.length).toBe(1);
  });

  test('should call `props.onSearch` when search text changed', () => {
    const SEARCH_STRING = 'sparrow';
    const mockOnSearch = jest.fn();
    const wrapper = setupShallowWrapper({ onSearch: mockOnSearch });
    const searchInput = findByAttr(wrapper, 'search-input');
    searchInput.props().onChangeText(SEARCH_STRING);

    expect(mockOnSearch).toHaveBeenCalledWith(SEARCH_STRING);
  });
});

test('should clearText clear button clicked', () => {
  const mockSetText = jest.fn();
  React.useState = jest.fn(() => ['text', mockSetText]);
  const wrapper = setupShallowWrapper({
    initialValue: 'text',
    onSearch: () => {},
  });

  const button = findByAttr(wrapper, 'clear-button');
  button.props().onPress();

  expect(mockSetText).toHaveBeenCalledWith('');
});
