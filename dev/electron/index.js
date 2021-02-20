const { app, BrowserWindow, ipcMain } = require('electron')
const windowStateKeeper = require('electron-window-state')
const { appUrl, AppWindow, windowEvents, deviceUrl } = require('../utils/constants')

// ipc
ipcMain.on(windowEvents['createWindow'], (e, windowParams) => {
    console.log(windowParams);
    e.sender.send(windowEvents['createWindowSuccess'], { success: true });
    createDeviceWindow(windowParams);
})

function createDeviceWindow(windowParams) {
    let _width = windowParams['width'],
        _height = windowParams['height'];
    let state = windowStateKeeper({
        defaultWidth: _width,
        defaultHeight: _height,
    })
    const deviceWindow = new BrowserWindow({
        x: state.x,
        y: state.y,
        width: _width,
        height: _height,
        minWidth: 320,
        minHeight: 200,
        maxWidth: 768,
        maxHeight: 1440,
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        backgroundColor: '#FFF'
    })

    deviceWindow.loadFile(deviceUrl)
    state.manage(deviceWindow)
}

function createWindow() {
    let { defaultHeight, defaultWidth } = AppWindow;
    let state = windowStateKeeper({
        ...AppWindow
    })
    const win = new BrowserWindow({
        x: state.x,
        y: state.y,
        width: defaultWidth,
        height: defaultHeight,
        minWidth: defaultWidth,
        minHeight: defaultHeight,
        maxWidth: defaultWidth,
        maxHeight: defaultHeight,
        webPreferences: {
            nodeIntegration: true
        },
        backgroundColor: '#FFF'
    })

    win.loadFile(appUrl)
    state.manage(win)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
