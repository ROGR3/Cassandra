interface Settings {
  submitKey: string
  safeMode: boolean
  darkMode: boolean
}

interface Shortcuts {
  [key: string]: string
}


const settings: Settings = JSON.parse(fs.readSettings())
const shortcuts: Shortcuts = JSON.parse(fs.readShortcuts())


let clickedKeys: string = ""

let isChanging: boolean = false

lepik.keyPress((e: string) => {
  if (isChanging) return handleSBChange(e)
  if (e == settings.submitKey) return submit(clickedKeys)
  switch (e) {
    case "backspace":
      clickedKeys = clickedKeys.slice(0, -1)
      break
    case "space":
    case "tab":
    case "ctrl":
    case "enter":
      clickedKeys = ""
      break
    case "shift":
    case "alt":
      break
    default:
      clickedKeys += e
      break
  }
})
function submit(typedKeys: string): void {
  console.log("submitting: " + clickedKeys)
  clickedKeys = ""
  let { key, value } = getKeyValuePair(typedKeys)
  if (!key || !value) return
  if (settings.safeMode && typedKeys != (key)) return
  if (!settings.safeMode && !typedKeys.includes(key)) return
  console.log("replacing:" + key + " with " + getSpecialString(value))
  lepik.replaceWord(getSpecialString(value))
  clickedKeys = ""
}


function handleSBChange(key: string): void {
  settings.submitKey = key
  fs.writeSettings(JSON.stringify(settings))
  isChanging = false
  let submitHotkeyEl = <HTMLButtonElement>document.querySelector("#submitHotkeyEl")
  submitHotkeyEl.innerText = key
  submitHotkeyEl.style.width = ""
  submitHotkeyEl.style.height = ""
}

function getKeyValuePair(ck: string): { key: string, value: string } {
  let key = ck
  let value = shortcuts[key]
  return { key, value }
}

function getSpecialString(typed: string): string {
  if (typed.startsWith("*")) return typed.split("").join("+").replace("*+", "*")
  return typed
}