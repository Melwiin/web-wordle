var wordle_grid = document.getElementById("wordle-grid");
// var restart_button = document.getElementById("restart-button");
// restart_button.addEventListener("click", (e)=> initialize());

var word = "";

var curr_row = 0;

var letters = 5;
var rows = 6;

var input = "";
var words;



initialize();
setupEventListener();

async function initialize() {
    input = "";
    word = "";
    curr_row = 0;

    await fetch('../lang/en.json')
    .then(res => res.json())
    .then(data => { words = data; } );
    await selectWord();
    await setupGrid();
    
    console.log("Init done");
}


function selectWord() {
    var rand_word = getRandomInt(words.length);
    while (words[rand_word].length != letters) {
        rand_word = getRandomInt(words.length);
    }
    
    word = words[rand_word].toUpperCase();
}

function setupGrid() {
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

function setupEventListener() {
    document.body.addEventListener("keydown", (e) => {
        pressKey(e.key);
    });
}

function pressKey(key) {
    if(input.length < letters){
        if(isLetter(key)) {
            input+=key.toUpperCase();
            updateInput();
        }
    }else if(key == "Enter") {
        checkInput();
        curr_row++;
        input = "";
    }

    if(key == "Backspace" || key == "Delete") {
        input = input.substring(0, input.length - 1);
        updateInput();
    }
}


function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }