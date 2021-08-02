const { addStep } = require('@wdio/allure-reporter').default;

class Element {

    /**
     * Constructor
     */
    constructor() {
        this.timeout = 60000;
    };

    async getElement(el, shouldNotBeDisplayed = false, ms = this.timeout, elementName = 'Element') {
        const element = await el;
        const errorText = shouldNotBeDisplayed ? 'is displayed' : 'is not displayed';
        await element.waitForExist({ timeout: ms, timeoutMsg: `Element ${elementName} ${errorText}` });

        return element;
    };

    async getElementTexts(el, elementsName = 'Elements') {
        addStep(`Get texts array from ${elementsName} elements`);
        const result = [];
        const collection = await el;

        for (const element of collection) {
            const text = await element.getText();
            result.push(text);
        }


        return result;
    }

    /**
     * Click to element
     * @param {Element} el 
     */
    async click(el, elementName = 'Element') {
        addStep(`Click on ${elementName}`);
        const element = await el;

        await element.waitUntil(async () => {
            return await element.isClickable();
        }, this.timeout, `${elementName} is not clickable`);

        try {
            await element.click();
        } catch (e) {
            throw new Error (`Not able to click on ${elementName}`);    
        }
    };


}

module.exports = Element;