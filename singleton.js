const {app} = require('electron');

let mainWindow = null;

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow == null) {
        return;
    }
    // Focus created window
    if (mainWindow.isMinimized()) {
        mainWindow.restore();
    }
    mainWindow.focus();
});
  
if (isSecondInstance) {
    app.quit();
}

module.exports = {
    mainWindow: mainWindow
};