'use strict';

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu

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

app.on('ready', function(){
  createWindow()

  const template = [
    {
      label: 'Arquivo',
      submenu: [
        {
          label: 'Sair',
          role: 'quit'
        }
      ]
    },
    
    {
      label: 'Janela',
      submenu: [
        {
          label: 'Recarregar',
          role: 'reload'
        },
        {
          label: "Força recarregar",
          role: 'forceReload'
        },
        {
          label: 'Minimizar',
          role: 'minimize'
        },
        {
          label: 'Tela Cheia',
          role: 'togglefullscreen'
        },
        {
          label: 'Inspecionar',
          role: 'toggledevtools'
        }
      ]
    },
    {
      label: 'Sobre',
      submenu: [
        {
          label: 'Github',
          click: function(){
            electron.shell.openExternal("https://github.com/mcosta21/modelagem-sismica-electron")
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})