var wordle_grid = document.getElementById("wordle-grid");

var word = "ULTRA".toUpperCase();

var curr_row = 0;

var letters = 5;
var rows = 6;

var input = "";

initialize();

function initialize() {
    input = "";
    curr_row = 0;

    wordle_grid.innerHTML = "";

    for (let r = 0; r < rows; r++) 
    {
        var n_row = document.createElement("div");
        n_row.className = "row";
    
        for (let l = 0; l < letters; l++) 
        {
            var n_letter = document.createElement("div");
            n_letter.className = "input";
    
            n_row.appendChild(n_letter);
        }
    
        wordle_grid.appendChild(n_row);
    }
}

function updateInput() {
    for(let i = 0; i < letters; i++) {
        if(input[i] == undefined){
            wordle_grid.children.item(curr_row).children.item(i).innerHTML = "";
        }else{
            wordle_grid.children.item(curr_row).children.item(i).innerHTML = input[i];
        }
    }
}

function checkInput() {
    var cinput = input;
    var cword = word;

    var result = "";
    for(var i = 0; i < letters; i++) result+="W";

    for(var i = 0; i < letters; i++) {
        if(cinput[i] == cword[i]) {
            cword = cword.replaceAt(i, '#');
            cinput = cinput.replaceAt(i, '#');
            result = result.replaceAt(i, 'R');
        }
    }

    for(var i = 0; i < letters; i++) {
        for(var w = 0; w < letters; w++) {
            if(cinput.charAt(i) == '#') {
                continue;
            }else if(cinput.charAt(i) == cword.charAt(w)) {
                cword = cword.replaceAt(w, '#');
                cinput = cinput.replaceAt(i, '#');
                result = result.replaceAt(i, 'S');

                continue;
            }else {

            }
        }
    }

    for(let i = 0; i < letters; i++) {
        if(result.charAt(i) == 'R'){
            wordle_grid.children.item(curr_row).children.item(i).classList.add("green");
        }else if(result.charAt(i) == 'S'){
            wordle_grid.children.item(curr_row).children.item(i).classList.add("yellow");
        }else {
            wordle_grid.children.item(curr_row).children.item(i).classList.add("grey");
        }
    }
}

document.body.addEventListener("keydown", (e) => {
    if(input.length < letters){
        if(isLetter(e.key)) {
            input+=e.key.toUpperCase();
            updateInput();
        }
    }else if(e.key == "Enter") {
        checkInput();
        curr_row++;
        input = "";
    }

    if(e.key == "Backspace") {
        input = input.substring(0, input.length - 1);
        updateInput();
    }
});


function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}