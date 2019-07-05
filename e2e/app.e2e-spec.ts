import { WSPage } from './app.po';

describe('abp-zero-template App', function () {
    let page: WSPage;

    beforeEach(() => {
        page = new WSPage();
    });

    it('should display message saying app works', () => {
        page.navigateTo();
        page.getCopyright().then(value => {
            expect(value).toEqual(new Date().getFullYear() + ' © WS.');
        });
    });
});
