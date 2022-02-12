interface Lepik {
  keyTap: (key: string) => void
  keyPress: (cb: Function) => void
  replaceWord: (text: string) => void

}

const lepik: Lepik = {
  replaceWord,
  keyTap,
  keyPress,
}


function replaceWord(text: string): void {
  //@ts-expect-error
  window.lepikApi.replaceWord(text)
}

function keyTap(key: string): void {
  //@ts-expect-error
  window.lepikApi.keyTap(key)
}

function keyPress(cb: Function): void {
  //@ts-expect-error
  window.lepikApi.keyPress(cb)
}
