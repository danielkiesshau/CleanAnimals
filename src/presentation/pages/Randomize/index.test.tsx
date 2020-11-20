import { shallow } from 'enzyme';
import Randomize from '.';
import { findByAttr } from 'utils/testUtils';

const setupShallowWrapper = (props = {}) => shallow(<Randomize {...props} />);

test('should render `Discover` button', () => {
  const wrapper = setupShallowWrapper();
  const component = findByAttr(wrapper, 'discover-button');
  expect(component.length).toBe(1);
});
