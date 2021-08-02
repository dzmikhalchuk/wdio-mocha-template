const World = require("../../src/page-objects/World");
const userData = require("../../src/data/user-data");
const Utils = require('../../src/utils/Utils');
const chai = require('chai');  
const expect = chai.expect;
const { addFeature, addStory, addArgument } = require('@wdio/allure-reporter').default;

describe('Financial Monitoring Page', () => {

    const timeout = 60000;

    before(async () => {
        await browser.maximizeWindow();
        await browser.url(userData.env.DEV.url);
    });

    describe('DFSP List Verification', () => {
        it('Veify dfsp list from API', async () => {
            addFeature('Veify dfsp list from API');
            addArgument('Priority', 'P0');

            await World.loginPage.enterCredsAndLogin();

            const logoutButton = await World.financialMonitoringPage.header.logOutButton;
            await logoutButton.waitForDisplayed(timeout, 'Wait for "Logout" button displayed');

            const dfsps = await World.financialMonitoringPage.dfsps;

            const dfspListUi = await Utils.element.getElementTexts(dfsps, 'Dfsp titles');
            const dfspListApi = await Utils.api.dfspList();

            expect(dfspListUi).to.have.members(dfspListApi);
        });

        it('Veify dfsp list from API (Failed)', async () => {
            addFeature('Veify dfsp list from API');
            addArgument('Priority', 'P0');

            const dfspListUi = ['Dfsp2', 'Dfsp2']
            const dfspListApi = await Utils.api.dfspList();

            expect(dfspListUi, 'Dfsp verification: ').to.deep.equal(dfspListApi);
        });
    });

});