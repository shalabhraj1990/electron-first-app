const fs = require("fs");
const { stderr } = require("process");
const exec = require("child_process").exec;

let timer;
document.getElementById("input").addEventListener("keyup", (evt) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    const dir = evt.target.value;
    if (isDir(dir)) {
      checkGitStatu(dir);
    }

    console.log("Typing", evt.target.value);
  }, 500);
});
function checkGitStatu(dir) {
  exec(
    "git status",
    {
      cwd: dir,
    },
    (err, stdout, stderr) => {
      console.log("err", err);
      console.log("stdout", stdout);
      console.log("stderr", stderr);
      if (err) return setStatus("unknown");
      if (/nothing added to commit/.test(stdout)) return setStatus("clean");
      return setStatus("dirty");
    }
  );
}
function isDir(dir) {
  try {
    return fs.lstatSync(dir).isDirectory;
  } catch (error) {
    return false;
  }
}

function setStatus(status) {
  const el = removeStatus();
  el.classList.add(status);
  return el;
}

function removeStatus() {
  const el = document.getElementById("status");
  el.classList.remove("unknown", "clean", "dirty");
  return el;
}
