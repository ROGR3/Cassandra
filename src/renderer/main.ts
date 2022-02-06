const settings = JSON.parse(fs.readSettings())
const shortcuts = JSON.parse(fs.readShortcuts())

const SUBMIT_KEY = settings.submitKey

let clickedKeys: string = ""

lepik.keyRelease((e: string) => {
  if (e == SUBMIT_KEY) {
    return submit()
  }
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
    if (clickedKeys.includes(sc)) {
      clickedKeys = ""
      lepik.replaceWord(shortcuts[sc])
    }
  }
  clickedKeys = ""
}