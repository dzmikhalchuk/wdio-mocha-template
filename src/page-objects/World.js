const LoginPage = require('./pages/LoginPage');
const FinancialMonitoringPage = require('./pages/FinancialMonitoringPage');

class World {
    constructor() {
        this.loginPage = new LoginPage();
        this.financialMonitoringPage = new FinancialMonitoringPage();
    }
}

module.exports = new World();