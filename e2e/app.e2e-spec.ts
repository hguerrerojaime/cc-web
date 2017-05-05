import { CcWebPage } from './app.po';

describe('cc-web App', () => {
  let page: CcWebPage;

  beforeEach(() => {
    page = new CcWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
