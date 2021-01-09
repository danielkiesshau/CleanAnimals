import React from 'react';
import { shallow } from 'enzyme';
import { findByAttr, sleep } from 'utils/testUtils';
import Searchbar from './Searchbar';

const setupShallowWrapper = (props = {}) => shallow(<Searchbar {...props} />);

describe('Searchbar', () => {
  test('should render clear button if Searchbar has text', () => {
    const wrapper = setupShallowWrapper({ initialValue: 'text' });
    const component = findByAttr(wrapper, 'clear-button');
    expect(component.length).toBe(1);
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
