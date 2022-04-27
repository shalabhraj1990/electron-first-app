const electron = require("electron");

const { app, BrowserWindow, globalShortcut } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    width: 1000,
    height: 2000,
    // resizable: false,
    //frame: false,
  });

  mainWindow.loadURL(`file://${__dirname}/capture.html`);
  mainWindow.openDevTools();
  mainWindow.on("close", () => {
    mainWindow = null;
  });
  globalShortcut.register("ctrl+alt+j", () => {
    console.log("capture main");
    mainWindow.webContents.send("capture", app.getPath("pictures"));
  });
});
