const electron = require("electron");

const ipc = electron.ipcRenderer;

document.getElementById("start").addEventListener("click", () => {
  ipc.send("countdown-start");
  console.log("start clicked");
});

ipc.on("countdown", (env, count) => {
  document.getElementById("count").innerHTML = count;
});
