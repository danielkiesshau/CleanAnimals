describe('Home List', () => {
  beforeEach(async () => {
    // await device.reloadReactNative();
  });

  it('should have 0 animals rendered for odd search', async () => {
    await element(by.id('search-input')).typeText('asdfasfsdagq@#!a9');
    await expect(element(by.id('animal-list-item'))).not.toExist();
    await element(by.id('search-input')).clearText();
  });

  it('should be able to navigate to DetailsPage when animal is clicked', async () => {
    const component = await element(by.id('poke-card')).atIndex(0);
    await component.tap();
    await waitFor(element(by.id('DetailsPage')))
      .toExist()
      .withTimeout(2500);
  });
});

describe('Details page', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    const component = await element(by.id('poke-card')).atIndex(0);
    await component.tap();
    await waitFor(element(by.id('DetailsPage')))
      .toExist()
      .withTimeout(2500);
  });

  it('should navigate between animals', async () => {
    await element(by.id('navigate-right-button')).multiTap(4);

    await element(by.id('navigate-left-button')).multiTap(3);
  });

  it('should change background when shiny is toggled', async () => {
    await element(by.id('shiny-button')).tap();
  });

  it("should be able to open/close first animal's move", async () => {
    await element(by.id('DetailsPage')).scrollTo('bottom');
    await element(by.id('container-accordion')).atIndex(0).multiTap(2);
  });
});

describe('Random animal page', async () => {
  beforeEach(async () => {
    await device.reloadReactNative();

    await element(by.id('tab-bar-button'))
      .atIndex(device.getPlatform() === 'android' ? 1 : 2)
      .tap();
  });

  it('should be able to discover a random animal', async () => {
    await element(by.id('discover-button')).tap();
  });

  it('should be able to change color theme', async () => {
    await element(by.id('change-theme-button')).tap();
  });
});
