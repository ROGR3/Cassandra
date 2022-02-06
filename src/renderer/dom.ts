let keyInp = <HTMLInputElement>document.getElementById("key");
let valInp = <HTMLInputElement>document.getElementById("value");
let helperText = <HTMLElement>document.querySelector(".helperText");
let settingsDiv = <HTMLElement>document.getElementById("settingsDiv");
let list = <HTMLElement>document.getElementById("list");
let inputs = <NodeListOf<HTMLElement>>document.querySelectorAll(".field");

const evenColor = "rgba(255,255,255,0.1)";
const oddColor = "rgba(0,0,0,0.1)";


document.addEventListener("keypress", (e): string => {
  helperText.style.opacity = "1"
  if (e.key.toLowerCase() == "enter") {
    if (keyInp.value.length == 0 || valInp.value.length == 0) return helperText.innerText = "You need to fill in both fields!";
    if (shortcuts[keyInp.value]) return helperText.innerText = "This key already exists, please remove it first!";
    shortcuts[keyInp.value] = valInp.value;
    helperText.innerText = "Saved!";
    setTimeout(() => helperText.style.opacity = "0", 3000);
    fs.writeShortcuts(JSON.stringify(shortcuts));
    generateLis()
    keyInp.value = "";
    valInp.value = "";
  }
  if (keyInp.value.length == 0 || valInp.value.length == 0) return helperText.style.opacity = "0";
  if (shortcuts[keyInp.value]) return helperText.innerText = "This key already exists, please remove it first!";
  return helperText.innerText = "Hit Enter to save!"

})

function openSettings(): void {
  if (settingsDiv.style.display == "none") {
    settingsDiv.style.display = "block";
    inputs[0].style.opacity = "0";
    inputs[1].style.opacity = "0";
    list.style.opacity = "0";
  } else {
    settingsDiv.style.display = "none";
    inputs[0].style.opacity = "1";
    inputs[1].style.opacity = "1";
    list.style.opacity = "1";
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
    liHidden.innerText = " > " + shortcuts[sc];
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
  helperText.style.opacity = "0";
  generateLis()
}

window.onload = main
console.log(settingsDiv.style.display = "none")

function toggleClass(el: HTMLElement): void {
  el.classList.toggle('toggle-on');
}