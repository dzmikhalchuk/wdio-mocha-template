const Wait = require('./Wait');
const Element = require('./Element');
const Api = require('./api/Api');

class Utils {

    constructor() {
        this.wait = new Wait();
        this.element = new Element();
        this.api = new Api();
    }

}

module.exports = new Utils();