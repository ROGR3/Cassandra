interface Elec {
  close: () => void
  minimize: () => void
  maximize: () => void

}

const elec: Elec = {
  close: closeWinElec,
  minimize: minimizeWinElec,
  maximize: maximizeWinElec
}

function closeWinElec(): void {
  //@ts-expect-error
  window.elec.close()
}

function minimizeWinElec(): void {
  //@ts-expect-error
  window.elec.minimize()
}

function maximizeWinElec(): void {
  //@ts-expect-error
  window.elec.maximize()
}