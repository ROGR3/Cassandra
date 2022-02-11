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

lepik.keyRelease((e: string) => {
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
  if (!typed.startsWith("*") && !typed.includes("+")) return typed.split("").join("+")
  return typed.replace(/\*/g, "")
  // return typed.replace(/shift/g, "shift+").replace(/alt/g, "alt+").replace(/ctrl/g, "ctrl+").replace(/space/g, "space+").replace(/tab/g, "tab+").replace(/enter/g, "enter+").replace(/backspace/g, "backspace+").replace(/esc/g, "esc+").replace(/up/g, "up+").replace(/down/g, "down+").replace(/left/g, "left+").replace(/right/g, "right+").replace(/home/g, "home+").replace(/end/g, "end+").replace(/pageup/g, "pageup+").replace(/pagedown/g, "pagedown+").replace(/f1/g, "f1+").replace(/f2/g, "f2+").replace(/f3/g, "f3+").replace(/f4/g, "f4+").replace(/f5/g, "f5+").replace(/f6/g, "f6+").replace(/f7/g, "f7+").replace(/f8/g, "f8+").replace(/f9/g, "f9+").replace(/f10/g, "f10+").replace(/f11/g, "f11+").replace(/f12/g, "f12+").replace(/\*/g, "")

}