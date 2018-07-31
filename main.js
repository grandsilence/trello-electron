const {app, BrowserWindow, session} = require('electron');
const settings = require('./settings');
const fs = require('fs');
const path = require('path');

//to make singleton instance
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
})
if (isSecondInstance) {
  app.quit()
  return;
}

function createMainWindow () {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: settings.window.size.width, height: settings.window.size.height,
    frame: true, center: true,
    show: false,
    title: 'Trello',
    autoHideMenuBar: true,
    icon: path.join(__dirname, '_builds', 'icons', 'win', 'icon.ico'),
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'browser.js'),
      plugins: true
    }
  });
  
  // ready-to-show
  mainWindow.loadURL('https://trello.com/');

  mainWindow.webContents.on('dom-ready', function() {
    // Inject CSS
    const css = fs.readFileSync(path.join(__dirname, 'assets/styles/override.css'), 'utf8');
    mainWindow.webContents.insertCSS(css);

    mainWindow.show();
  });

  // Save window size to settings before close
  mainWindow.on('close', function(e) {
    settings.window.setSize(mainWindow.getSize());
  });
}

app.on('ready', function() {
  const filter = {
    urls: [
      '*://*.launchdarkly.com/*',
      '*://*.newrelic.com/*',
      '*://*.googletagmanager.com/*',
      '*://*.google-analytics.com/*',
      '*://c.trello.com/i?*',
      '*://collector.githubapp.com/*',
      '*://p.typekit.net/p.gif?*'
    ]
  };
  session.defaultSession.webRequest.onBeforeRequest(filter, (details, callback) => {
    callback({cancel: true})
  });

  createMainWindow();
});

app.on('window-all-closed', function (e) {
  if (process.platform !== 'darwin')
    app.quit();
});
