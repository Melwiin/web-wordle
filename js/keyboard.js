var v_keyboard = document.getElementById("v-keyboard");
var liste = ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "Ü", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö", "Ä", "Delete", "Y", "X", "C", "V", "B", "N", "M", "Enter"]

for (let r = 0; r < liste.length; r++) {

  var button_name = document.createElement("button");
  button_name.innerHTML = liste[r];

  if (button_name.innerHTML == "Delete") {
    button_name.id = "delete"
  }
  else if (button_name.innerHTML == "Enter") {
    button_name.id = "enter"
  }
  button_name.class = "button"

  v_keyboard.appendChild(button_name);
}


function getKeyFromButton(button){
  //button.
}

/*EVENT LISTENER*/
const bt = document.getElementsByClassName("button");
bt.forEach.addEventListener("click", (e)=> {
  pressKey(getKeyFromButton(bt));
});





