var project = {};

const container = document.createElement("div");
const open = document.createElement("div");
const newFile = document.createElement("div");

container.className = "splash-container";
open.className = "splash-btn";
newFile.className = "splash-btn";

open.innerHTML = "OPEN";
newFile.innerHTML = "NEW";

document.body.appendChild(container);

container.appendChild(open);
container.appendChild(newFile);

open.addEventListener("click", (e) => {
  open.style.pointerEvents = "none";
  newFile.style.pointerEvents = "none";

  window.logger.log("info", "start opening existing project");
  window.dialog.openProject().then((path) => {
    if (path) {
      project = path;
      kill();
    }
    newFile.style.pointerEvents = "auto";
    open.style.pointerEvents = "auto";
  });
});

newFile.addEventListener("click", (e) => {
  newFile.style.pointerEvents = 'none'
  open.style.pointerEvents = "none";

  window.logger.log("info", "start project creation");
  window.dialog.newProject().then((path) => {
    if (path){
      project = path;
      kill()
    }
    newFile.style.pointerEvents = "auto";
    open.style.pointerEvents = "auto";
  });
});

function kill() {
  window.dispatchEvent(new CustomEvent('kill-splash', {detail: project}))
  container.remove()
}