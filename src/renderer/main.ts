const settings = JSON.parse(fs.readSettings())
const shortcuts = JSON.parse(fs.readShortcuts())


let clickedKeys: string = ""

let isChanging: boolean = false

lepik.keyRelease((e: string) => {
  if (isChanging) return handleSBChange(e)
  if (e == settings.submitKey) return submit()

  switch (e) {
    case "backspace":
      clickedKeys = clickedKeys.slice(0, -1)
      break
    case "space":
    case "tab":
    case "ctrl":
      clickedKeys = ""
      break
    case "shift":
    case "alt":
      break
    default:
      clickedKeys += e
      break
  }
  console.log(clickedKeys)
})
function submit(): void {
  for (let sc in shortcuts) {
    if (settings.safeMode) {
      if (clickedKeys != (sc)) return
      clickedKeys = ""
      lepik.replaceWord(shortcuts[sc])
    } else {
      if (!clickedKeys.includes(sc)) return
      clickedKeys = ""
      lepik.replaceWord(shortcuts[sc])
    }
  }
  clickedKeys = ""
}


function handleSBChange(key: string) {
  settings.submitKey = key
  fs.writeSettings(JSON.stringify(settings))
  isChanging = false
  let submitHotkeyEl = <HTMLButtonElement>document.querySelector("#submitHotkeyEl")
  submitHotkeyEl.innerText = key
  submitHotkeyEl.style.width = ""
  submitHotkeyEl.style.height = ""
}