//const electron = require("electron");
const path = require("path");
const { app, Menu, Tray } = require("electron");
app.on("ready", () => {
  //new electron.BrowserWindow();
  const tray = new Tray("insta.png");
  const contextMenu = Menu.buildFromTemplate([
    { label: "Item1", type: "radio" },
    { label: "Item2", type: "radio" },
    { label: "Item3", type: "radio", checked: true },
    { label: "Item4", type: "radio" },
  ]);
  tray.setToolTip("This is my application.");
  tray.setContextMenu(contextMenu);
});
