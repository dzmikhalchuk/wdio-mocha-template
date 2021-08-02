class Header {
    
    constructor() {
    }

    get tabs() { return $('header button[role=tab]') };
    get logOutButton() { return $('#btnLogout') };

}

module.exports = Header;