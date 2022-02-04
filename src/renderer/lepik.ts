interface Lepik {
  keyTap: (key: string) => void
  keyRelease: (cb: Function) => void
  replaceWord: (text: string) => void
  readSettings: () => string
  readShortcuts: () => string
  writeSettings: (text: string) => void
  writeShortcuts: (text: string) => void
}

const lepik: Lepik = {
  readShortcuts,
  replaceWord,
  keyTap,
  keyRelease,
  readSettings,
  writeSettings,
  writeShortcuts
}

function replaceWord(text: string): void {
  //@ts-expect-error
  window.api.replaceWord(text)
}

function keyTap(key: string): void {
  //@ts-expect-error
  window.api.keyTap(key)
}

function keyRelease(cb: Function): void {
  //@ts-expect-error
  window.api.keyRelease(cb)
}

function writeSettings(text: string): void {
  //@ts-expect-error
  window.api.writeSettings(text)
}

function writeShortcuts(text: string): void {
  //@ts-expect-error
  window.api.writeShortcuts(text)
}

function readShortcuts(): string {
  //@ts-expect-error
  return window.api.readShortcuts()
}

function readSettings(): string {
  //@ts-expect-error
  return window.api.readSettings()
}
