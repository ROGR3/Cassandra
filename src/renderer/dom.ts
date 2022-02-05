let keyInp = <HTMLInputElement>document.getElementById("keyInp");
let valInp = <HTMLInputElement>document.getElementById("valInp");
let helperText = <HTMLElement>document.querySelector(".helperText");
let list = <HTMLElement>document.getElementById("list");

helperText.style.opacity = "0";
generateLis()

document.addEventListener("keypress", (e) => {
  if (keyInp.value.length == 0 || valInp.value.length == 0) return helperText.style.opacity = "0";
  helperText.innerText = "Hit Enter to save!"
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
})




function generateLis() {
  list.innerHTML = "";
  for (let sc in shortcuts) {
    let li = document.createElement("li");
    li.innerText = sc + ": " + shortcuts[sc];
    let del = document.createElement("i");
    del.classList.add("fa", "fa-trash-o");
    del.addEventListener("click", () => {
      delete shortcuts[sc];
      fs.writeShortcuts(JSON.stringify(shortcuts));
      list.removeChild(li);
    })
    let edit = document.createElement("i");
    edit.classList.add("fa", "fa-pencil");
    edit.addEventListener("click", () => {
      keyInp.value = sc;
      valInp.value = shortcuts[sc];
      delete shortcuts[sc];
      fs.writeShortcuts(JSON.stringify(shortcuts));
      list.removeChild(li);
    })
    li.appendChild(del);
    li.appendChild(edit);
    list.appendChild(li);
  }
}