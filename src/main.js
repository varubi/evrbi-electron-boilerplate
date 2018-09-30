const { app, BrowserWindow } = require('electron'),
    path = require('path'),
    url = require('url'),
    server = new (require(path.join(__dirname, 'server', 'app-server.js')))()
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        'minHeight': 800,
        'minWidth': 1024,
        title: 'Electron App',
        frame: false
    })

    mainWindow.setMenu(null);

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'client', 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', () => { mainWindow = null })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => { process.platform !== 'darwin' && app.quit() })
app.on('activate', () => { mainWindow === null && createWindow() })

exports.listen = function (event) {
    server.on(event, (...arguments) => mainWindow.webContents.set(event, arguments))
};
exports.request = server.request;

