(function () {
    const { ipcRenderer } = require('electron');
    ipcRenderer.on('deviceShow', (e, data) => {
        console.log(data);
    })
})();