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
bt = document.getElementById("v-keyboard").children;


for(var i = 0; i<bt.length; i++){
  console.log(bt[i].innerHTML);
  bt[i].addEventListener("click", (e)=> pressKey(e.target.innerHTML));
}
  


  //element.addEventListener("click", pressKey(element.innerHTML))





