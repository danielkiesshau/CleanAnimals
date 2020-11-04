export const findByAttr = (wrapper, key) => {
  return wrapper.find({ 'data-test': key });
};
