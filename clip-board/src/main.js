const electron = require("electron");
const path = require("path");
const { app, Tray, Menu, clipboard, globalShortcut } = electron;
const STACK_SIZE = 5;
const ITEM_MAX_LENGTH = 20;
app.on("ready", () => {
  let stack = [];
  const tray = new Tray(path.join("src", "insta.png"));
  tray.setContextMenu(
    Menu.buildFromTemplate([{ label: "<empty>", enabled: false }])
  );
  checkClipBoardForChange(clipboard, (text) => {
    stack = addToStack(text, stack);

    tray.setContextMenu(
      Menu.buildFromTemplate(formateMenuTemplateForStack(clipboard, stack))
    );
    registerShortCut(globalShortcut, clipboard, stack);
    console.log(stack);
  });
});
function registerShortCut(globalShortcut, clipboard, stack) {
  globalShortcut.unregisterAll();
  for (let i = 0; i < STACK_SIZE; i++) {
    globalShortcut.register(`Cmd+Alt+${i + 1}`, () => {
      clipboard.writeText(stack[i]);
    });
  }
}
function formateItem(item) {
  return item && item.length > ITEM_MAX_LENGTH
    ? item.substr(0, ITEM_MAX_LENGTH) + "..."
    : item;
}
function formateMenuTemplateForStack(clipboard, stack) {
  return stack.map((item, i) => {
    return {
      label: `copy : ${formateItem(item)}`,
      click: clipboard.writeText(item),
      accelerator: `Cmd+Alt+${i + 1}`,
    };
  });
}

function addToStack(item, stack) {
  return [item].concat(stack.length >= STACK_SIZE)
    ? stack.slice(0, stack.length - 1)
    : stack;
}

function checkClipBoardForChange(clipboard, onChange) {
  let cache = clipboard.readText();
  let latest;
  setInterval(() => {
    latest = clipboard.readText();
    if (latest !== cache) {
      cache = latest;
      onChange(cache);
    }
  }, 1000);
}

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
