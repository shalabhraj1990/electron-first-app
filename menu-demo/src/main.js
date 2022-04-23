const electron = require("electron");
const { app, Menu, Tray } = electron;

app.on("ready", () => {
  new electron.BrowserWindow();
  console.log("ready!!");
  let name = electron.app.getName();
  const template = [
    {
      label: name,
      submenu: [
        {
          label: `About ${name}`,
          click: () => {
            console.log("clicked about");
          },
          role: "about",
        },
        {
          type: "separator",
        },
        {
          label: "Quit",
          click: () => {
            app.quit();
          },
          accelerator: "Cmd+Q",
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});
