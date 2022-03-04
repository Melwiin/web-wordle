var v_keyboard = document.getElementById("v-keyboard");
var key_list = ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "Ü", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö", "Ä", "Delete", "Y", "X", "C", "V", "B", "N", "M", "Enter"]

//Init call -> possible reinit of keyboard (clear keyboard)
initKeyboard();
function initKeyboard() {
  //loop trough list 
  key_list.forEach(key => {
    var btn = document.createElement("button");
    btn.innerHTML = key;
    btn.type = "button";

    //exceptions for enter and delete
    if (btn.innerHTML == "Delete") btn.id = "delete";
    else if (btn.innerHTML == "Enter") btn.id = "enter";
    // button_name.class = "button" <--- keine ahnung was das macht?

    v_keyboard.appendChild(btn);
  });


  // bt = document.getElementById("v-keyboard").children; || Why getelementbyid again? 
  var bt = v_keyboard.children;
  for (var i = 0; i < bt.length; i++) {
    /*EVENT LISTENER*/
    bt[i].addEventListener("click", (e) => pressKey(e.target.innerHTML));
  }
}
