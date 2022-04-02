let keyInp = <HTMLInputElement>document.getElementById("key");
let valInp = <HTMLInputElement>document.getElementById("value");
let helperText = <HTMLHeadingElement>document.querySelector(".helperText");
let settingsDiv = <HTMLDivElement>document.getElementById("settingsDiv");
let list = <HTMLUListElement>document.getElementById("list");
let inputs = <NodeListOf<HTMLElement>>document.querySelectorAll(".field");
let root = <HTMLElement>document.querySelector(":root");
const evenColor = "rgba(255,255,255,0.1)";
const oddColor = "rgba(0,0,0,0.1)";


document.addEventListener("keypress", (e): string => {
  helperText.style.opacity = "1"
  if (e.key.toLowerCase() == "enter") {
    if (keyInp.value.length == 0 || valInp.value.length == 0) return helperText.innerText = "You need to fill in both fields!";
    if (shortcuts[keyInp.value]) return helperText.innerText = "This key already exists!";;
    valInp.value = decodeURIComponent(encodeURIComponent(valInp.value).replace(/%0A/g, "\\n"));
    shortcuts[keyInp.value.replace(/ /g, "\ ")] = valInp.value.replace(/ /g, "\ ");
    helperText.innerText = "Saved!";
    setTimeout(() => helperText.style.opacity = "0", 3000);
    fs.writeShortcuts(JSON.stringify(shortcuts));
    generateLis()
    keyInp.value = "";
    valInp.value = "";
  }
  if (keyInp.value.length == 0 || valInp.value.length == 0) return helperText.style.opacity = "0";
  if (shortcuts[keyInp.value]) return helperText.innerText = "This key already exists!";
  return helperText.innerText = "Hit Enter to save!"

})

function openSettings(): void {
  if (settingsDiv.style.display == "none") {
    settingsDiv.style.display = "block";
    inputs[0].style.opacity = "0";
    inputs[1].style.opacity = "0";
    list.style.opacity = "0";
    document.getElementById("settings")?.classList.add("fa-close");
  } else {
    settingsDiv.style.display = "none";
    inputs[0].style.opacity = "1";
    inputs[1].style.opacity = "1";
    list.style.opacity = "1";
    document.getElementById("settings")?.classList.remove("fa-close");
  }
  document.querySelectorAll(".hidden").forEach(e => {
    let element = <HTMLElement>e
    element.style.display = "none"
  })
}

function generateLis(): void {
  list.innerHTML = "";
  let divider = 1
  for (let sc in shortcuts) {
    divider++
    let liHidden = document.createElement("li");
    let liText = ""
    shortcuts[sc].split("\\n").forEach(e => {
      liText += "ㅤ" + e.trim() + "\n"
    })
    liHidden.innerText = liText
    liHidden.style.display = "none";
    liHidden.classList.add("hidden")
    divider % 2 == 0 ? liHidden.style.background = evenColor : liHidden.style.background = oddColor;

    let li = document.createElement("li");
    li.innerText = sc;
    divider % 2 == 0 ? li.style.background = evenColor : li.style.background = oddColor;
    li.addEventListener("click", (e) => {
      document.querySelectorAll(".hidden").forEach(e => {
        let element = <HTMLElement>e
        if (e != liHidden) element.style.display = "none"
      })
      const eventTarget: HTMLElement = <HTMLElement>e.target;
      if (eventTarget.className.includes("fa")) return;
      if (liHidden.style.display == "none") {
        liHidden.style.display = "block"
        showValue.style.transform = "rotateX(180deg)"
      } else {
        showValue.style.transform = "rotateX(0)"
        liHidden.style.display = "none"
      }
    })

    let showValue = document.createElement("i");
    showValue.classList.add("fa", "fa-chevron-circle-down", "wierdIcon");
    showValue.title = "Show value";
    showValue.addEventListener("click", () => {
      document.querySelectorAll(".hidden").forEach(e => {
        let element = <HTMLElement>e
        if (e != liHidden) element.style.display = "none"
      })
      if (liHidden.style.display == "none") {
        liHidden.style.display = "block"
        showValue.style.transform = "rotateX(180deg)"
      } else {
        showValue.style.transform = "rotateX(0)"
        liHidden.style.display = "none"
      }
    })

    let del = document.createElement("i");
    del.classList.add("fa", "fa-trash-o", "icon");
    del.title = "Delete a shortcut";
    del.addEventListener("click", () => {
      delete shortcuts[sc];
      fs.writeShortcuts(JSON.stringify(shortcuts));
      list.removeChild(li);
      list.removeChild(liHidden);
      helperText.innerText = "Delete successful!";
      helperText.style.opacity = "1"
    })

    let edit = document.createElement("i");
    edit.classList.add("fa", "fa-pencil", "icon");
    edit.title = "Edit shortcut";
    edit.addEventListener("click", () => {
      keyInp.value = sc;
      valInp.value = shortcuts[sc];
      delete shortcuts[sc];
      fs.writeShortcuts(JSON.stringify(shortcuts));
      list.removeChild(li);
      list.removeChild(liHidden);
      helperText.innerText = "Hit Enter to save!"
      helperText.style.opacity = "1"
    })
    li.appendChild(del);
    li.appendChild(edit);
    li.appendChild(showValue);
    list.appendChild(li);
    list.appendChild(liHidden);
  }
}

function main(): void {

  generateLis()
  handleSwitchesOnStart()
  changeTheme(settings.darkMode)
}

window.onload = main

function toggleClass(el: HTMLElement): void {
  el.classList.toggle('toggle-on');
  if (el.className.includes("themeSwitcher")) {
    settings.darkMode = !settings.darkMode;
    fs.writeSettings(JSON.stringify(settings));
  } else if (el.className.includes("safeModeSwitcher")) {
    settings.safeMode = !settings.safeMode;
    fs.writeSettings(JSON.stringify(settings));
  }
  changeTheme(settings.darkMode)

}

function handleSwitchesOnStart() {
  let themeSwitcher = <HTMLElement>document.querySelector(".themeSwitcher");
  settings.darkMode ? themeSwitcher.classList.add("toggle-on") : themeSwitcher.classList.remove("toggle-on")
  let safeModeSwitcher = <HTMLElement>document.querySelector(".safeModeSwitcher");
  settings.safeMode ? safeModeSwitcher.classList.add("toggle-on") : safeModeSwitcher.classList.remove("toggle-on")
}

function changeTheme(isDarkMode: boolean): void {
  if (isDarkMode) {
    for (let theme in THEMES.dark) root.style.setProperty(`--${theme}`, THEMES.dark[theme]);
  } else {
    for (let theme in THEMES.light) root.style.setProperty(`--${theme}`, THEMES.light[theme]);
  }
}

interface Theme {
  primary: string,
  secondary: string,
  grey: string,
  white: string,
  bg: string,
  bgDark: string
}

interface Themes {
  dark: Theme,
  light: Theme,
}

const THEMES: { [key: string]: any } = {
  dark: {
    "primary": "#ff8d00",
    "secondary": "#ff5e00",
    "grey": "#9b9b9b",
    "white": "#cacaca",
    "bg": "#2e2c2a",
    "bgDark": "#252423"
  }, light: {
    "primary": "#e72d03",
    "secondary": "#992929",
    "grey": "#999",
    "white": "#222",
    "bg": "#ededed",
    "bgDark": "#fff"
  }
}

function changeSHotkey(el: HTMLButtonElement): void {
  isChanging = true;
  el.style.width = "100%";
  el.style.height = "2rem";
  el.innerText = ""
  el.blur()
}


