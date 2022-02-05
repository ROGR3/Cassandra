interface Lepik {
  keyTap: (key: string) => void
  keyRelease: (cb: Function) => void
  replaceWord: (text: string) => void

}
interface Fs {
  readSettings: () => string
  readShortcuts: () => string
  writeSettings: (text: string) => void
  writeShortcuts: (text: string) => void
}
const lepik: Lepik = {
  replaceWord,
  keyTap,
  keyRelease,
}
const fs: Fs = {
  readSettings,
  readShortcuts,
  writeSettings,
  writeShortcuts
}

function replaceWord(text: string): void {
  //@ts-expect-error
  window.lepikApi.replaceWord(text)
}

function keyTap(key: string): void {
  //@ts-expect-error
  window.lepikApi.keyTap(key)
}

function keyRelease(cb: Function): void {
  //@ts-expect-error
  window.lepikApi.keyRelease(cb)
}

function writeSettings(text: string): void {
  //@ts-expect-error
  window.fsApi.writeSettings(text)
}

function writeShortcuts(text: string): void {
  //@ts-expect-error
  window.fsApi.writeShortcuts(text)
}

function readShortcuts(): string {
  //@ts-expect-error
  return window.fsApi.readShortcuts()
}

function readSettings(): string {
  //@ts-expect-error
  return window.fsApi.readSettings()
}
