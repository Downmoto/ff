'use strict'
import { DEBUG } from "../consts/debug";


// imports
import winston from 'winston';
import { ipcMain } from 'electron';
import { join as pathJoin } from "path";
import { userData } from '../consts/userdata';


// create logger
export const logger = winston.createLogger({
  level: DEBUG ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: pathJoin(userData, "logs/error.log"), level: "error" }),
    new winston.transports.File({ filename: pathJoin(userData, "logs/combined.log") }),
  ],
});

// log to console while in development
if (DEBUG) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.simple(),
    )})
  );
}

// handle renderer logging
ipcMain.on("LOGGER::LOG", (e, {level, msg}) => {
    logger.log({
        level: level,
        message: msg
    })
})
