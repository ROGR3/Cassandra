const settings = JSON.parse(fs.readSettings())
const shortcuts = JSON.parse(fs.readShortcuts())

const SUBMIT_KEY = settings.submitKey

let clickedKeys: string = ""

lepik.keyRelease((e: string) => {
  if (e == SUBMIT_KEY) {
    submit()
  }
  clickedKeys = e == "space" ? "" : clickedKeys + e;
})
function submit(): void {
  console.log(shortcuts)
  for (let sc in shortcuts) {
    if (clickedKeys == (sc)) {
      clickedKeys = ""
      lepik.replaceWord(shortcuts[sc])
    }
  }
  console.log(clickedKeys + " clicked")
  clickedKeys = ""
}