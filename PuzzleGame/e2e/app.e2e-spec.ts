import { browser, element, by } from 'protractor';

describe('QuickStart E2E Tests', () => {

  let expectedMsg = 'Number of steps';

  beforeEach(() => {
    browser.get('');
  });

  it('should display: ' + expectedMsg, () => {
    expect(element(by.id('steps')).getText()).toContain(expectedMsg);
  });

});
