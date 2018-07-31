const singleton = require('./singleton');
const { BrowserWindow, electron } = require('electron');
const fs = require('fs');
const path = require('path');
const settings = require('./settings');

function createMainWindow () {
    // Create the browser window
    singleton.mainWindow = new BrowserWindow({
      title: 'Trello',
      // Width and height
      width: settings.window.size.width, height: settings.window.size.height,
      minWidth: 400, minHeight: 200,
      // Frame, Pos, Menu
      frame: true, center: true, show: false, autoHideMenuBar: true,
      icon: path.join(__dirname, '_builds', 'icons', 'win', 'icon.ico'),
      webPreferences: {
        nodeIntegration: false,
        preload: path.join(__dirname, 'browser.js'),
        plugins: true
      }
    });
    const self = singleton.mainWindow;
    const webContents = self.webContents;

    // ready-to-show
    self.loadURL('https://trello.com/');
  
    // Inject css and then show window
    webContents.on('dom-ready', function() {
      const css = fs.readFileSync(path.join(__dirname, 'assets/styles/override.css'), 'utf8');
      self.webContents.insertCSS(css);

      self.show();
    });
/*
    webContents.on('new-window', (e, url) => {
        e.preventDefault();
        shell.openExternal(url);
    });*/

    // Show progressbar
    webContents.session.on('will-download', (event, item) => {
        const totalBytes = item.getTotalBytes();
    
        item.on('updated', () => {
          self.setProgressBar(item.getReceivedBytes() / totalBytes);
        });
    
        item.on('done', (e, state) => {
          self.setProgressBar(-1);
    
          if (state === 'interrupted') {
            electron.Dialog.showErrorBox('Download error', 'The download was interrupted');
          }
        });
    });
  
    // Save window size to settings before close
    self.on('close', function(e) {
      settings.window.setSize(self.getSize());
    });
  }

module.exports = {
    instance: singleton.mainWindow,
    init: createMainWindow
}