import { ipcRenderer, contextBridge } from "electron";
import { readFileSync, writeFileSync } from "fs";
const lepik = require("lepikjs")
contextBridge.exposeInMainWorld("api", {
  keyRelease: (cb: Function): void => {
    lepik.on("keyRelease", cb)
  },
  keyTap: (key: string): void => {
    lepik.keyTap(key)
  },
  replaceWord: (text: string): void => {
    lepik.keyTap("ctrl+backspace")
    lepik.write(text, 0)
  },
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
    writeFileSync(__dirname + "../../../database/settungs.json", text, "utf8")
  }
});