import { shallow } from 'enzyme';
import Randomize from '.';
import pokemons from '../../../data/mock/pokemons';
import Pokemon from '../../../domain/models/Pokemon';
import { findByAttr } from '../../../utils/testUtils';

const setupShallowWrapper = (props = {}) => shallow(<Randomize {...props} />);

test('should render `Discover` button', () => {
  const wrapper = setupShallowWrapper();
  const component = findByAttr(wrapper, 'discover-button');
  expect(component.length).toBe(1);
});

test('should call `navigate` on `Discover` pressed', () => {
  const mockNavigation = {
    navigate: jest.fn((route: string, pokemon: Pokemon) => {
      return pokemons[0];
    }),
  };

  const wrapper = setupShallowWrapper({ navigation: mockNavigation });
  const component = findByAttr(wrapper, 'discover-button');

  component.props().onPress();

  expect(mockNavigation.navigate).toReturnWith(pokemons[0]);
});
