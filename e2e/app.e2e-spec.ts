import { SilfaniEveToolsPage } from './app.po';

describe('silfani-eve-tools App', function() {
  let page: SilfaniEveToolsPage;

  beforeEach(() => {
    page = new SilfaniEveToolsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
