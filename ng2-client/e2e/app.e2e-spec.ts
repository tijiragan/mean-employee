import { EmployeeCrudPage } from './app.po';

describe('employee-crud App', function() {
  let page: EmployeeCrudPage;

  beforeEach(() => {
    page = new EmployeeCrudPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
