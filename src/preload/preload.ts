import { ipcRenderer, contextBridge } from "electron";
const lepik = require("lepikjs")
contextBridge.exposeInMainWorld("lepik", {
  keyRelease: (cb: Function) => {
    return lepik.on("keyRelease", cb)
  },
  keyTap: (key: string) => {
    return lepik.keyTap(key)
  },
  write: (text: string) => {
    return lepik.write(text)
  }
});