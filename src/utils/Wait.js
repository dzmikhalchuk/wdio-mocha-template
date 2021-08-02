class Wait {

    /**
     * Constructor
     */
    constructor() {
        this.timeout = 60000;
    }

    /**
     * Wait until element to be displayed
     * @param {Element} el
     * @param {String} elementName
     * @returns {Element} desired element
     */
    async forDisplayed(el, elementName = 'Element') {
        const element = await el;
        await element.waitForExist(this.timeout, `${elementName} does not exist`);

        await element.waitUntil(async () => {
            return await element.isDisplayed()
        }, this.timeout, `${elementName} is not displayed`);

        return element;
    };

}

module.exports = Wait;