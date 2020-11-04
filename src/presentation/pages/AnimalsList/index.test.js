import React from 'react';
import { shallow } from 'enzyme';
import AnimalsList from '.';
import { findByAttr } from '~/utils/testUtils';

const setupShallowWrapper = () => shallow(<AnimalsList />);

test('should have welcome text', () => {
  const wrapper = setupShallowWrapper();
  const component = findByAttr(wrapper, 'welcome-text');
  expect(component.length).toBe(1);
});
