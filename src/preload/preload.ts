import { ipcRenderer, contextBridge } from "electron";
import { readFileSync, writeFileSync } from "fs";
const lepik = require("lepikjs")
contextBridge.exposeInMainWorld("lepikApi", {
  keyPress: (cb: Function): void => {
    lepik.on("keyPress", cb)
  },

  replaceWord: (text: string): void => {
    lepik.keyTap("ctrl+backspace")
    if (text.startsWith("*"))
      lepik.keyTap(text.substring(1))
    else
      lepik.write(text, 0.000001)
  },

});
contextBridge.exposeInMainWorld("fsApi", {
  readShortcuts: (): string => {
    return readFileSync(__dirname + "../../../database/shortcuts.json", "utf8")
  },
  writeShortcuts: (text: string): void => {
    writeFileSync(__dirname + "../../../database/shortcuts.json", text, "utf8")
  },
  readSettings: (): string => {
    return readFileSync(__dirname + "../../../database/settings.json", "utf8")
  },
  writeSettings: (text: string): void => {
    writeFileSync(__dirname + "../../../database/settings.json", text, "utf8")
  },
})
contextBridge.exposeInMainWorld("elec", {
  close: (): void => {
    console.log("closing")
    ipcRenderer.send("close")
  },
  minimize: (): void => {
    console.log("minimize")
    ipcRenderer.send("minimize")
  },
  maximize: (): void => {
    console.log("maximize")
    ipcRenderer.send("maximize")
  },
})