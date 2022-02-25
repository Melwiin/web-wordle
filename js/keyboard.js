var v_keyboard = document.getElementById("v-keyboard");
var liste = ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "Ü", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö", "Ä", "Delete", "Y", "X", "C", "V", "B", "N", "M", "Enter"]

for (let r = 0; r < liste.length; r++) {

  var button_name = document.createElement("button");
  button_name.innerHTML = liste[r];

  if (button_name.innerHTML == "Delete") {
    button_name.id = "delete"
  }
  if (button_name.innerHTML == "Enter") {
    button_name.id = "enter"
  }

  v_keyboard.appendChild(button_name);
}

