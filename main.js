const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    // width: parseInt(dimensions.width * 0.8),
    // height: parseInt(dimensions.height * 0.8),
    // minWidth: parseInt(dimensions.width * 0.8),
    // minHeight: parseInt(dimensions.height * 0.8),
    // maxWidth: dimensions.width,
    // maxHeight: dimensions.height,
    // icon: `${__dirname}/assets/icon.ico`
    // webPreferences: {
    //   devTools: true,
    // },
    height: 400,
    width: 400,
  });

  mainWindow.loadURL(`file://${__dirname}/countdown.html`);
  mainWindow.on("close", () => {
    console.log("closed");
    mainWindow = null;
  });
  mainWindow.on("dom-ready", function () {
    webview.openDevTools();
  });
  mainWindow.webContents.openDevTools(true);
});
