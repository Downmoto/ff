"use strict";
import { DEBUG } from "../consts/debug";

// imports
import { app, dialog, ipcMain, Menu, BrowserWindow } from "electron";
import { mkdir, openSync, closeSync, rmSync, mkdirSync } from "fs";
import { logger } from "./logger";
import { join, parse } from "path";
var glob = require("glob");

var AdmZip = require("adm-zip");

// project metadata in memory
var project = {
  temp: "",
  location: "",
  metaFile: "",
  structure: {
    directoryName: "projectRoot",
    files: [],
    directories: [],
  },
  name: "",
};

// cleanup temp folder
app.on("before-quit", (e) => {
  rmSync(project.temp, { recursive: true, force: true });
});

function getDirs(src) {
  let meta = { directories: [], files: [] };
  let res = glob.sync(src + "/**/*");
  console.log(res)
  let raw = [];
  res.forEach((elem) => raw.push(elem.split("--/")[1]));

  for (const path of raw) {
    let temp_loc = meta;
    for (const s of path.split("/")) {
      if (s.includes(".")) {
        temp_loc["files"].push(s);
      } else {
        let found = false;
        for (const directory of temp_loc["directories"]) {
          if (directory["directoryName"] === s) {
            var parent = directory["directoryName"]; 
            temp_loc = directory;
            found = true;
            break;
          }
        }
        if (!found) {
          temp_loc["directories"].push({
            directoryName: s,
            parent: parent == s ? 'projectRoot' : parent,
            files: [],
            directories: [],
          });
          temp_loc = temp_loc["directories"].slice(-1)[0];
        }
      }
    }
  }
  project.structure.files = meta.files;
  project.structure.directories = meta.directories;
  console.log(JSON.stringify(meta, null, 4))
}

function newProject(path) {
  // if dialog was not canceled
  if (path) {
    // project structure
    const newProjectStructure = {
      dirs: ["images", "notes", "scenes"],
      meta: "meta.json",
    };

    project.name = parse(path).name;

    // set project paths
    project.temp = join(app.getPath("temp"), `ff-${Date.now()}--`);
    project.location = path;

    let temp = project.temp;

    // create project structure
    mkdir(temp, { recursive: true }, (e, path) =>
      logger.info(`created new project at: ${path}`)
    );
    newProjectStructure.dirs.forEach((dir) => {
      let e = mkdirSync(`${temp}/${dir}`);
      let n = mkdirSync(`${temp}/${dir}/okidoki`);

      if (e) logger.error(`unable to create new ${dir} directory. ERROR: ${e}`);
    });

     mkdirSync(`${temp}/notes/b`);
     mkdirSync(`${temp}/notes/b/k`);


    // create meta.json in project
    let file = openSync(`${temp}/${newProjectStructure.meta}`, "w");
    closeSync(file);

    let sceneFile = openSync(`${temp}/scenes/scene-one.txt`, "w");
    closeSync(sceneFile);

    getDirs(temp);

    // set project paths
    project.metaFile = `${temp}/${newProjectStructure.meta}`;

    // compress project
    let zip = new AdmZip();
    zip.addLocalFolder(temp);
    zip.writeZip(path);

    return project;
  }
  return undefined;
}

function openProject(p) {
  // if dialog not canceled
  if (!p.canceled) {
    let path = p.filePaths[0];

    project.name = parse(path).name;

    // set project paths
    project.temp = join(app.getPath("temp"), `ff-${Date.now()}--`);
    project.location = path;

    let temp = project.temp;

    // open and extract file to temp
    let zip = new AdmZip(project.location);
    zip.extractAllTo(temp);

    getDirs(temp);

    project.metaFile = `${temp}/meta.json`;

    return project;
  }
  return undefined;
}

function saveProject() {}

ipcMain.handle("DIALOG::NEW", async () => {
  const d = dialog.showSaveDialogSync({
    title: "New project",
    defaultPath: DEBUG ? __dirname : app.getPath("documents"),
    buttonLabel: "Create project",
    filters: [{ name: "f", extensions: ["ff"] }],
  });

  return newProject(d);
});

ipcMain.handle("DIALOG::OPEN", async () => {
  const d = await dialog.showOpenDialog({
    title: "Open project",
    defaultPath: DEBUG ? __dirname : app.getPath("documents"),
    buttonLabel: "Open project",
    filters: [{ name: "f", extensions: ["ff"] }],
  });

  return openProject(d);
});

// TODO: save as dialog
// ipcMain.handle("DIALOG::SAVEAS")


export function newDir(folder) {
  console.log(folder)
}

export function newFile() {}

export function newFileFromExplorer() {}