interface Fs {
  readSettings: () => string
  readShortcuts: () => string
  writeSettings: (text: string) => void
  writeShortcuts: (text: string) => void
}

const fs: Fs = {
  readSettings,
  readShortcuts,
  writeSettings,
  writeShortcuts
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
