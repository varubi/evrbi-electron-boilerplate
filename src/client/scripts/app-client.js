var app = (_ => {
    const electron = require('electron'),
        remote = electron.remote,
        outgoing = remote.require('./main'),
        incoming = electron.ipcRenderer;

    return {
        remote: remote,
        on: (event, callback) => {
            outgoing.listen(event);
            incoming.on(event, callback);
        },
        get: async (resource, callback) => {
            return new Promise(async resolve => {
                const data = await outgoing.request(resource);
                if (typeof callback == 'function')
                    callback(data)
                resolve(data);
            })
        },
        post: async (resource, data, callback) => {
            return new Promise(async resolve => {
                const data = await outgoing.request(resource, data);
                if (typeof callback == 'function')
                    callback(data)
                resolve(data);
            })
        },
    }
})();
document.addEventListener('DOMContentLoaded', function () {
    var window = app.remote.getCurrentWindow();
    onClick('#app-minimize', _ => window.minimize())
    onClick('#app-maximize', _ => window[!window.isMaximizd() ? 'maximize' : 'unmaximize']())
    onClick('#app-close', _ => window.close())

    function onClick(selector, callback) {
        document.querySelector(selector).addEventListener('click', callback);
    }
})
