const EventEmitter = require('events');

class Server extends EventEmitter {
    constructor() {
        super();
    }
    async request(resource, data) {
        // Do routing here
        return '';
    }
}
module.exports = Server;