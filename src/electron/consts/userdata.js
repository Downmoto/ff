'use strict'

// DEPRECIATING, MOVING TO ELECTRON NATIVE FUNCTIONALITY
import { DEBUG } from "../consts/debug";


import { mkdir } from "fs";
import { resolve, join as pathJoin } from "path";
import { logger } from "../lib/logger";


var userData = resolve(
  process.env.APPDATA ||
    (process.platform == "darwin"
      ? process.env.HOME + "/Library/Preferences"
      : process.env.HOME + "/.local/share")
);

mkdir(`${userData}/fApp`, () => logger.log('info', 'fApp in appData exists'))
userData = pathJoin(userData, 'fApp')

if (DEBUG) {
  userData = pathJoin(__dirname, "userdata");
}

export { userData };