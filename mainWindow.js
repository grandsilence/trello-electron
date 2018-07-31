const singleton = require('./singleton');
const {BrowserWindow} = require('electron');
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
    
    // ready-to-show
    singleton.mainWindow.loadURL('https://trello.com/');
  
    singleton.mainWindow.webContents.on('dom-ready', function() {
      // Inject CSS
      const css = fs.readFileSync(path.join(__dirname, 'assets/styles/override.css'), 'utf8');
      singleton.mainWindow.webContents.insertCSS(css);
  
      singleton.mainWindow.show();
    });
  
    // Save window size to settings before close
    singleton.mainWindow.on('close', function(e) {
      settings.window.setSize(singleton.mainWindow.getSize());
    });
  }

module.exports = {
    instance: singleton.mainWindow,
    init: createMainWindow
}