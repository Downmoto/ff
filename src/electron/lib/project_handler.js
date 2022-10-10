"use strict";
import { DEBUG } from "../consts/debug";

import { app, dialog, ipcMain } from "electron";
import { mkdir, openSync, closeSync } from "fs";
import { logger } from "./logger";
import { join } from "path";

const zl = require("zip-lib");

const structure = {
  dirs: ["images", "notes", "scenes"],
  meta: "meta.json",
};

function newProject(path) {
  let temp = join(app.getPath('temp'), 'ff')
  mkdir(temp, { recursive: true }, (e, path) =>
    logger.info(`created new project at: ${path}`)
  );
  structure.dirs.forEach((dir) => {
    mkdir(`${temp}/${dir}`, (e) => {
      if (e) logger.error(`unable to create new ${dir} directory. ERROR: ${e}`);
    });
  });

  let file = openSync(`${temp}/${structure.meta}`, "w");
  closeSync(file)


  zl.archiveFolder(temp, path).then(() => {
    console.log('done')
  }).catch(err => console.log(err))
}

ipcMain.handle("DIALOG::NEW", async () => {
  const d = dialog.showSaveDialogSync({
    title: "New project",
    defaultPath: DEBUG ? __dirname : app.getPath("documents"),
    buttonLabel: "Create project",
    filters: [{ name: "f", extensions: ["ff"] }],
  });

  if (d) newProject(d);
  return d;
});

function openProject(p) {
  let path = p[0]
  let project = {
    metaFile: join(path, 'meta.json'),
    dirs: {
      images: join(path, 'images'),
      notes: join(path, 'notes'),
      scenes: join(path, 'scenes'),
    }
  }

  console.log(project)
}

ipcMain.handle("DIALOG::OPEN", async () => {
  const d = dialog.showOpenDialogSync({
    title: "Open project",
    defaultPath: DEBUG ? __dirname : app.getPath("documents"),
    buttonLabel: "Open project",
    properties: ["openDirectory"],
  });

  if (d) openProject(d);
  return d;
})
