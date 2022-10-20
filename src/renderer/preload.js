import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("logger", {
  log: (level, msg) => {
    ipcRenderer.send("LOGGER::LOG", { level: level, msg: msg });
  },
});