describe('Example', () => {
  beforeEach(async () => {
    // await device.reloadReactNative();
  });

  it('should have container', async () => {
    await expect(element(by.id('container'))).toExist();
  });
});
