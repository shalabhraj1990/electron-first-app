const electron = require("electron");
const { app, BrowserWindow } = electron;
let mainWindow;
app.on("ready", () => {
  console.log("ready");
  mainWindow = new BrowserWindow({
    width: 400,
    height: 500,
  });
  mainWindow.loadURL(`file://${__dirname}/status.html`);

  mainWindow.on("close", () => {
    mainWindow = null;
  });
});
