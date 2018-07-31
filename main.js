const {app, session} = require('electron');
const mainWindow = require('./mainWindow');

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

  mainWindow.init();
});

app.on('window-all-closed', function (e) {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
