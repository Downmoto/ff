// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("logger", {
  log: (level, msg) => {
    ipcRenderer.send("LOGGER::LOG", { level: level, msg: msg });
  },
});


contextBridge.exposeInMainWorld("dialog", {
  openProject: () => ipcRenderer.invoke("DIALOG::OPEN"),
  newProject: () => ipcRenderer.invoke("DIALOG::NEW"),
});

contextBridge.exposeInMainWorld('contextMenu', {
  navCM: (template) => ipcRenderer.send('CONTEXT::NAV', template) 
})