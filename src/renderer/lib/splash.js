// var project = {};

// const container = document.createElement("div");
// const open = document.createElement("div");
// const newFile = document.createElement("div");

// container.className = "splash-container";
// open.className = "splash-btn";
// newFile.className = "splash-btn";

// open.innerHTML = "OPEN";
// newFile.innerHTML = "NEW";

// document.body.appendChild(container);

// container.appendChild(open);
// container.appendChild(newFile);

// open.addEventListener("click", (e) => {
//   window.logger.log("info", "start opening existing project");
//   window.dialog.openProject().then((path) => {
//     if (path) kill();
//     project = path;
//   });
// });

// newFile.addEventListener("click", (e) => {
//   window.logger.log("info", "start project creation");
//   window.dialog.newProject().then((path) => {
//     if (path) kill();
//     project = path;
//   });
// });

// function kill() {
//   window.dispatchEvent(new Event('kill-splash'))
//   container.remove()
// }

var project = {
  temps: {
    tempName: "ff-1665596748864",
    temp: "C:\\Users\\arad\\AppData\\Local\\Temp\\ff-1665596748864",
  },
  location: "C:\\Users\\arad\\source\\F\\s.ff",
  metaFile: "",
  dirs: {
    images: "C:\\Users\\arad\\AppData\\Local\\Temp\\ff-1665596748864/images",
    notes: "C:\\Users\\arad\\AppData\\Local\\Temp\\ff-1665596748864/notes",
    scenes: "C:\\Users\\arad\\AppData\\Local\\Temp\\ff-1665596748864/scenes",
  },
};


export { project };
