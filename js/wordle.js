var wordle_grid = document.getElementById("wordle-grid");

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

document.body.addEventListener("keydown", (e) => {
    if(input.length < letters){
        if(isLetter(e.key)) {
            input+=e.key.toUpperCase();
            updateInput();
        }
    }else if(e.key == "Enter") {
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