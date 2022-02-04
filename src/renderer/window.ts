const lepik = {
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
