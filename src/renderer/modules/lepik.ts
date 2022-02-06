interface Lepik {
  keyTap: (key: string) => void
  keyRelease: (cb: Function) => void
  replaceWord: (text: string) => void

}

const lepik: Lepik = {
  replaceWord,
  keyTap,
  keyRelease,
}


function replaceWord(text: string): void {
  //@ts-expect-error
  window.lepikApi.replaceWord(text)
}

function keyTap(key: string): void {
  //@ts-expect-error
  window.lepikApi.keyTap(key)
}

function keyRelease(cb: Function): void {
  //@ts-expect-error
  window.lepikApi.keyRelease(cb)
}
