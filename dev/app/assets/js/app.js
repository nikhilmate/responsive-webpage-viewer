(function () {
    const { ipcRenderer } = require('electron');

    const { windowEvents } = require('../utils/constants');

    window.MAIN_WINDOW = {
        formId: 'window-form',
        INIT: function () {
            typeof INIT === 'function' && INIT();
        }
    };

    function INIT() {
        var winForm = document.getElementById(MAIN_WINDOW['formId']);
        if (winForm) {
            winForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('clicked');
                ipcRenderer.send(windowEvents['createWindow'], { width: 500, height: 800 });
            });
        }

        ipcRenderer.on(windowEvents['createWindowSuccess'], (e, data) => {
            console.log(data);
        });
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    MAIN_WINDOW.INIT();
});