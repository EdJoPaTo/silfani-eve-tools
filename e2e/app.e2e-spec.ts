import { EveAngular2Page } from './app.po';

describe('eve-angular2 App', function() {
  let page: EveAngular2Page;

  beforeEach(() => {
    page = new EveAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
