import { app, Menu, ipcMain, BrowserWindow } from "electron";

const isMac = process.platform === "darwin";

const menubarTemplate = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideOthers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" },
          ],
        },
      ]
    : []),
  {
    label: "File",
    submenu: [
      {
        label: "Open Project",
        click: () => {
          console.log("openFile");
        },
      },
      {
        label: "New Project",
        click: () => {
          console.log("newProject");
        },
      },
      { role: "toggleDevTools" },
    ],
  },
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      { role: "delete" },
      { type: "separator" },
      { role: "selectAll" },
    ],
  },
  {
    role: "help",
    submenu: [
      {
        label: "Github",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://github.com/Downmoto/ff");
        },
      },
    ],
  },
];
Menu.setApplicationMenu(Menu.buildFromTemplate(menubarTemplate));






ipcMain.on('CONTEXT::NAV', (event) => {
  const template = [
    {
      label: "New Folder",
      click: () => {
        console.log("new folder");
      },
    },
    {
      label: "New File",
      click: () => {
        console.log("new file");
      },
    },
    {
      label: "New File from explorer",
      click: () => {
        console.log("new file from explorer");
      },
    },
  ];

  const menu = Menu.buildFromTemplate(template)
  menu.popup(BrowserWindow.fromWebContents(event.sender))
})