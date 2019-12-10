'use strict';

const { app, BrowserWindow } = require('electron')

require('electron-reload')(__dirname, {
  // Note that the path to electron may vary according to the main file
  electron: require(`${__dirname}/node_modules/electron`)
});

function createWindow () {
  // Cria uma janela de navegação.
  let win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  // e carregar o index.html do aplicativo.
  win.loadFile('index.html')
  win.maximize()
  win.show()
}

app.on('ready', createWindow)