let clickedKeys: string = ""
let mainHotkey: string = "f"

//@ts-expect-error
window.lepik.keyRelease((e: string) => {
  clickedKeys += e;
  if (e == mainHotkey) {
    submit()
  }
})

function submit(): void {

  console.log(clickedKeys + " clicked")
  clickedKeys = ""
}