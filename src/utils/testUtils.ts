import { ShallowWrapper } from 'enzyme';

export const findByAttr = (
  wrapper: ShallowWrapper,
  key: string,
): ShallowWrapper => {
  return wrapper.find({ 'data-test': key });
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
