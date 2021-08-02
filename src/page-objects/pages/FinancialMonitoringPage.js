const BasePage = require('./BasePage');
const Utils = require('../../utils/Utils');
const { addStep } = require('@wdio/allure-reporter').default;

class FinancialMonitoringPage extends BasePage {
    
    constructor() {
        super();
    }

    get dfsps() { return $$('table tr > th') };

}

module.exports = FinancialMonitoringPage;