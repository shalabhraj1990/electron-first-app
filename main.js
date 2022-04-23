const electron = require("electron");
const countdown = require("./countdown");
const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

//let mainWindow;

let windows = [];

app.on("ready", () => {
  [1, 2, 3].forEach(() => {
    const win = new BrowserWindow({
      //mainWindow = new BrowserWindow({
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

    win.loadURL(`file://${__dirname}/countdown.html`);
    win.on("close", () => {
      console.log("closed");
      win = null;
    });

    //countdown();

    win.on("dom-ready", function () {
      webview.openDevTools();
    });

    win.webContents.openDevTools(true);
    windows.push(win);
  });
});

ipcMain.on("countdown-start", () => {
  countdown((count) => {
    // mainWindow.webContents.send("countdown", count);
    windows.forEach((win) => {
      win.webContents.send("countdown", count);
    });
  });
  console.log("even captured");
});
