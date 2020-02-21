const { app,Menu , BrowserWindow } = require('electron')


// Gardez une reference globale de l'objet window, si vous ne le faites pas, la fenetre sera
// fermee automatiquement quand l'objet JavaScript sera garbage collected.
let win

function createWindow () {
  // Créer le browser window.
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true ,
      webSecurity : false
    }
  })

  // and load the index.html of the app.
  win.loadFile('app/index.html')

  // Ouvre les DevTools.
  //win.webContents.openDevTools()
  win.maximize();
  // Émit lorsque la fenêtre est fermée.
  win.on('closed', () => {
    // Dé-référence l'objet window , normalement, vous stockeriez les fenêtres
    // dans un tableau si votre application supporte le multi-fenêtre. C'est le moment
    // où vous devez supprimer l'élément correspondant.
    win = null
  })
}

// Cette méthode sera appelée quand Electron aura fini
// de s'initialiser et sera prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quand cet événement est émit.
app.on('ready', createWindow)

// Quitte l'application quand toutes les fenêtres sont fermées.
app.on('window-all-closed', () => {
  // Sur macOS, il est commun pour une application et leur barre de menu
  // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
  // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
  if (win === null) {
    createWindow()

  }
})





const template = [


  {
    label: 'Action',
    submenu: [
      { label: 'Dashboard',click(){win.loadFile('app/index.html')}},
      { type: 'separator' },
      {label:'Clients list' ,click(){
        let  win2 = new BrowserWindow({
          width: 1024,
          height: 768,
          frame : false,
          webPreferences: {
            nodeIntegration: true
          }
        })
        win2.loadFile('app/clients.html')
        win2.webContents.openDevTools()

    }},
    {label:'Funds' ,click(){
      let  win3 = new BrowserWindow({
        width: 1200,
        height: 768,
        frame : false,
        webPreferences: {
          nodeIntegration: true
        }
      })
      win3.loadFile('app/recette.html')
      // win3.webContents.openDevTools()

  }},
      { type: 'separator' },
      { label: 'Settings',click(){win.loadFile('app/parametres.html')}},
      { type: 'separator' },
      { label: 'forcereload' },
      { role: 'close' },

    ]
  },
{
  label : "Edit" ,
  submenu : [
    { role: 'undo' },
  { role: 'redo' },
  { type: 'separator' },
  { role: 'cut' },
  { role: 'copy' },
  { role: 'paste' }
  ]
},
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom',label:'Zoom' },
      { role: 'togglefullscreen',label:'Full screen' },
      { label: 'Console',click(){win.webContents.openDevTools()} },

    ]
  },

  {
    label: 'Help',
    submenu : [
      { role: 'about' },
      { label: 'FREQUENCY',click: async () => {
        const { shell } = require('electron')
        await shell.openExternal('http://frequency-dz.com')
      } },
      { label: 'Youtube',click ()  {
        let  win3 = new BrowserWindow({
          width: 400,
          height: 600,
          frame : false,
        })
        win3.loadURL('http://m.youtube.com')
        // win3.webContents.openDevTools()
      } }

    ]

  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
