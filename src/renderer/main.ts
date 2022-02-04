const settings = JSON.parse(lepik.readSettings())
const shortcuts = JSON.parse(lepik.readShortcuts())

const SUBMIT_KEY = settings.submitKey



let clickedKeys: string = ""


lepik.keyRelease((e: string) => {
  clickedKeys += e;
  console.log(SUBMIT_KEY)
  if (e == SUBMIT_KEY) {
    submit()
  }
})

function submit(): void {
  for (let sc in shortcuts) {
    if (clickedKeys.includes(sc)) {
      clickedKeys = ""
      lepik.replaceWord(shortcuts[sc])
      return
    }
  }
  console.log(clickedKeys + " clicked")
  clickedKeys = ""
}