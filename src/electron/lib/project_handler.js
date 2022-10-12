"use strict";
import { DEBUG } from "../consts/debug";


// imports
import { app, dialog, ipcMain } from "electron";
import { mkdir, openSync, closeSync, rmSync } from "fs";
import { logger } from "./logger";
import { join } from "path";

var AdmZip = require("adm-zip");

// project structure
const structure = {
  dirs: ["images", "notes", "scenes"],
  meta: "meta.json",
};

// project paths
var project = {
  temps: {
    tempName: "",
    temp: "",
  },
  location: "",
  metaFile: "",
  dirs: {
    images: "",
    notes: "",
    scenes: "",
  },
};

// cleanup temp folder
app.on('before-quit', (e) => {
  rmSync(project.temps.temp, {recursive: true, force: true})
})

function saveProject() {}

function newProject(path) {
  // if dialog was not canceled
  if (path) {
    // set project paths
    project.temps.tempName = `ff-${Date.now()}`;
    project.temps.temp = join(app.getPath("temp"), project.temps.tempName);
    project.location = path;

    let temp = project.temps.temp; // ease

    // create project structure
    mkdir(temp, { recursive: true }, (e, path) =>
      logger.info(`created new project at: ${path}`)
    );
    structure.dirs.forEach((dir) => {
      mkdir(`${temp}/${dir}`, (e) => {
        if (e)
          logger.error(`unable to create new ${dir} directory. ERROR: ${e}`);
      });
    });

    // set project paths
    project.dirs.images = `${temp}/${structure.dirs[0]}`;
    project.dirs.notes = `${temp}/${structure.dirs[1]}`;
    project.dirs.scenes = `${temp}/${structure.dirs[2]}`;

    // create meta.json in project
    let file = openSync(`${temp}/${structure.meta}`, "w");
    closeSync(file);

    // set project paths
    project.metaFile = `${temp}/${structure.meta}`;

    // compress project 
    let zip = new AdmZip()
    zip.addLocalFolder(temp)
    zip.writeZip(path)

    return project;
  }
  return undefined;
}

function openProject(p) {
  // if dialog not canceled
  if (!p.canceled) {
    // set project paths
    project.temps.tempName = `ff-${Date.now()}`;
    project.temps.temp = join(app.getPath("temp"), project.temps.tempName);
    project.location = p.filePaths[0];

    let temp = project.temps.temp; // ease

    // open and extract file to temp
    let zip = new AdmZip(project.location)
    zip.extractAllTo(temp)

    // set project paths
    project.dirs.images = `${temp}/${structure.dirs[0]}`;
    project.dirs.notes = `${temp}/${structure.dirs[1]}`;
    project.dirs.scenes = `${temp}/${structure.dirs[2]}`;

    return project;
  }
  return undefined;
}

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
