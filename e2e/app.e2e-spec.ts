import { SearchythesearchengineClientPage } from './app.po';

describe('searchythesearchengine-client App', () => {
  let page: SearchythesearchengineClientPage;

  beforeEach(() => {
    page = new SearchythesearchengineClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
