const userData = require('../../data/user-data');
const request = require('request');
const rp = require('request-promise');
const { addStep } = require('@wdio/allure-reporter').default;


class Api {

    /**
     * @constructor
     */
    constructor() {
        this.env = userData.env.DEV.url;

        this.endpoint = {
            dfsp: this.env + '/admin-portal-backend/dfsps',
        };
    };

    /**
     * Get request headers
     * @returns {Map} Request headers
     */
    async _getHeaders() {
        let headers = new Map();
        headers.set('Content-Type', 'application/json');
        
        return headers;
    }

    /**
     * Send request
     * @param {String} uri 
     * @param {Object} body 
     * @param {Map} headers 
     * @param {String} method 
     * @param {any} additionalOptions 
     */
    async _sendRequest (uri, body, headers, method = 'POST', additionalOptions) {
        return new Promise((resolve, reject) => {
            const options = {
                method,
                uri,
                body,
                headers: this._processHeaders(headers),
                agentOptions: { rejectUnauthorized: false },
                ...additionalOptions
            };

            request(options, function (error, response, _body) {
                if (error) {
                    console.error('request error:', error);
                    reject(error);
                    return;
                }

                const responseObj = response.toJSON();
                responseObj.statusMessage = response.statusMessage;

                responseObj.responseText = responseObj.body;
                responseObj.statusText = response.statusMessage;
                responseObj.status = responseObj.statusCode;

                if (responseObj.body) {
                    try {
                        responseObj.body = JSON.parse(responseObj.body);
                    } catch (err) {
                    if (!err.message.match(/Unexpected token .* in JSON/)) {
                        // if it's not error with parsing json
                        throw err;
                    }
                    }
                }

                resolve(responseObj);
            });
        });
    };
    
    _processHeaders(rawHeaders) {
      // convert map to object
      let headers = {};
    
      if (rawHeaders instanceof Map) {
        rawHeaders.forEach((value, key) => {
          headers[key] = value;
        });
      } else {
        headers = rawHeaders;
      }
    
      return headers;
    };

    /**
     * Get dfsps list
     */
    async dfspList() {
        addStep('Get dfsp list from API');
        const headers = await this._getHeaders();
        const body = '';
        const responce =  await this._sendRequest(this.endpoint.dfsp, body, headers, 'GET');

        let dfsps = [];
        for (const dfsp of JSON.parse(responce.responseText)) {
            dfsps.push(dfsp.name);
        }

        return dfsps;
    };
    
}

module.exports = Api;