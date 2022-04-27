const electron = require("electron");
const path = require("path");
const fs = require("fs");
const { ipcRenderer: ipc, screen, desktopCapturer } = electron;
function getMainSource(desktopCapturer, screen, done) {
  const options = {
    types: ["screen"],
    tumbnailSize: screen.getPrimaryDisplay().workAreaSize,
  };
  desktopCapturer.getSources(options, (err, sources) => {
    if (err) return console.log("cannot capture screen");

    const isMainSource = (source) =>
      source.name === "Entire screen" || source.name === "Screen 1";
    done(sources.filter(isMainSource)[0]);
  });
}
function onCapture(evt, targetPath) {
  console.log("capture");
  getMainSource(desktopCapturer, screen, (source) => {
    const png = source.thumbnail.toPng();
    const filePath = path.join(targetPath, new Date() + ".png");
    writeScreenShot(png, filePath);
  });
}

function writeScreenShot(png, filePath) {
  fs.writeFile(filePath, png, (err) => {
    if (err) return console.log("filed to write file");
  });
}
ipc.on("capture", onCapture);
