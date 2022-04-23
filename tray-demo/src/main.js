const electron = require("electron");
const path = require("path");
const { app, Menu, Tray } = electron;
app.on("ready", () => {
  //new electron.BrowserWindow();
  const tray = new Tray("insta.png");
  console.log("ready");
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "wow",
    },
  ]);
  tray.setContextMenu(contextMenu);
});
