const Utils = require('../../utils/Utils');
const { addStep } = require('@wdio/allure-reporter').default;
const userData = require('../../data/user-data');

class LoginPage {
    
    constructor() {
    }

    get usernameInput() { return $('input[id*=login-username]') };
    get passwordInput() { return $('input[id*=login-password]') };
    get loginButton() { return $('button[id*=login-btn]') };

    async loginButtonClick() {
        addStep('Click on Login Button');
        await Utils.element.click(this.loginButton, 'Login Button');
    };

    async enterCredsAndLogin() {
        addStep('Enter Creds And Login');
        const username = userData.users.CLIENT.username;
        const password = userData.users.CLIENT.password;

        const usernameInput = await Utils.element.getElement(this.usernameInput, 'Username input');
        const passwordInput = await Utils.element.getElement(this.passwordInput, 'Password input');

        await usernameInput.setValue(username);
        await passwordInput.setValue(password);
        await Utils.element.click(this.loginButton, 'Login button');
    };

}

module.exports = LoginPage;