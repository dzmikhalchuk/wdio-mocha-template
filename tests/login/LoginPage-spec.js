const World = require("../../src/page-objects/World");
const userData = require("../../src/data/user-data");
const Utils = require('../../src/utils/Utils');
const chai = require('chai');
const expect = chai.expect;
const { addFeature, addStory, addArgument, addTestId } = require('@wdio/allure-reporter').default;

describe('Log In Page', () => {
    addStory('Log In Page Tests');

    const timeout = 60000;

    describe('Base Elements Verification', () => {
        before(async () => {
            await browser.maximizeWindow();
            await browser.url(userData.env.DEV.url);
        });

        it('User is able to see "Username" input on Log In page', async () => {
            addFeature('Log In Page');
            addTestId('MP-1394');
            addArgument('Priority', 'P0');

            World.loginPage.passwordInput

            const usernameInput = await World.loginPage.usernameInput;
            await usernameInput.waitForDisplayed(timeout, 'Wait for "Username" displayed');

            expect(await usernameInput.isDisplayed(), '"Username" input is displayed').to.be.true;
        });

        it('User is able to see "Password" input on Log In page', async () => {
            addFeature('Log In Page');
            addTestId('MP-1394');
            addArgument('Priority', 'P0');

            const passwordInput = await World.loginPage.passwordInput;
            await passwordInput.waitForDisplayed(timeout, 'Wait for "Password" displayed');

            expect(await passwordInput.isDisplayed(), '"Password" input is displayed').to.be.true;
        });

        it('User is able to see "LOGIN" button on Log In page', async () => {
            addFeature('Log In Page');
            addTestId('MP-1394');
            addArgument('Priority', 'P0');

            const loginBtn = await World.loginPage.loginButton;
            await loginBtn.waitForDisplayed(timeout, 'Wait for "Password" displayed');

            expect(await loginBtn.isDisplayed(), '"Login" button is displayed').to.be.true;
            expect(await loginBtn.getText(), '"Login" button text verification: ').to.equal('LOGIN1');
        });
    });

    describe('Log In Verification', () => {
        before(async () => {
            await browser.deleteCookies();
            await browser.maximizeWindow();
            await browser.url(userData.env.DEV.url);
        });

        it('User is able to Log In', async () => {
            addFeature('Log In Page');
            addArgument('Priority', 'P1');

            // set username
            const usernameInput = await World.loginPage.usernameInput;
            await usernameInput.setValue(userData.users.ADMIN.login);
            
            // set password    
            const passwordInput = await World.loginPage.passwordInput;
            await passwordInput.setValue(userData.users.ADMIN.password);

            const loginBtn = await World.loginPage.loginButton;
            await Utils.element.click(loginBtn, 'Login Button');

            const logoutBtn = await Utils.element.getElement(World.financialMonitoringPage.header.logOutButton);
            await logoutBtn.waitForDisplayed(timeout, 'Wait for "Logout" button displayed');

            expect(await logoutBtn.isDisplayed(), '"Logout" button is displayed').to.be.true;
        });
    });
});