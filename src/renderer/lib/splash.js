let pathToProject = ''

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
  window.logger.log("info", "start opening existing project")
  window.dialog.openProject().then(path => {
    if (path) kill()
    pathToProject = path
  })
});

newFile.addEventListener("click", (e) => {
  window.logger.log("info", "start project creation");
  window.dialog.newProject().then((path) => {
    if (path) kill()
    pathToProject = path;
  });
});

function kill() {
    // container.remove()
}

export {pathToProject}