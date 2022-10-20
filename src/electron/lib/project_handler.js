"use strict";
import { DEBUG } from "../consts/debug";

// imports
var glob = require("glob");

// project metadata in memory

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