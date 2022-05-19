// initialisierung von Elementen
var wordle_grid = document.getElementById("wordle-grid");
var v_keys      = document.getElementById("v-keyboard").children;
var lang_select = document.getElementById("language-select");
var poup_wnd    = document.getElementById("popup-wnd");
var keys        = document.getElementById("v-keyboard").children;

var filename = "";
var word = "";

var curr_row = 0;

var letters = 5; 
var rows = 6;

var input = "";
var words;
var useNonExistingWords = false;

var emojis = "";

initialize();
setupEventListener();

async function initialize() {
    input = "";
    word = "";
    curr_row = 0;
    filename = lang_select.value;
    poup_wnd.classList.remove("active");
    emojis = "";

    for(var i = 0; i < keys.length; i++){
        keys[i].classList.remove("grey"); 
        keys[i].classList.remove("yellow"); 
        keys[i].classList.remove("green"); 
    }

    await fetch('../lang/' + filename + ".json")
    .then(res => res.json())
    .then(data => { words = shuffle(data); console.log("Lang init done.")} );
    await selectWord();
    await setupGrid();
    
    console.log("Init done");
}


function selectWord() {
    for(var i = 0; i < words.length; i++) {
        if(words[i].length == letters) {
            word = words[i].toLowerCase();
            break;
        }
    }
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
        var input_element = wordle_grid.children.item(curr_row).children.item(i);

        if(input[i] == undefined){
            input_element.innerHTML = "";
            input_element.classList.remove("selected");
        }else{
            input_element.innerHTML = input[i].toUpperCase();
            input_element.classList.add("selected");
        }
    }
}

function wordExists() {
    var exists = false;

    words.forEach(w => {
        w = w.toLowerCase();    
        if(input == w) {
            exists = true;
        }
    });

    return exists;
}

async function colorKey(key, color) {
    for(var i = 0; i < keys.length; i++)
    {
        var element = keys[i];
        if(element.innerHTML == key.toUpperCase()) {
            if(element.classList.contains("yellow") && color == "green") {
                element.classList.remove("yellow");
                element.classList.add("green");
            }else{
                element.classList.add(color);
            }
                
        }
    }
}

function checkInput() {
    var cinput = input;
    var cword = word;

    var win_result = "";
    var result = "";
    for(var i = 0; i < letters; i++) result+="W";
    for(var i = 0; i < letters; i++) win_result+="R";


    //Check for green letters
    for(var i = 0; i < letters; i++) {
        if(cinput[i] == cword[i]) {
            cword = cword.replaceAt(i, '#');
            cinput = cinput.replaceAt(i, '#');
            result = result.replaceAt(i, 'R');

            colorKey(input[i], "green");
        }
    }

    //Check for yellow letters
    for(var i = 0; i < letters; i++) {
        for(var w = 0; w < letters; w++) {
            if(cinput.charAt(i) == '#') {
                continue;
            }else if(cinput.charAt(i) == cword.charAt(w)) {
                cword = cword.replaceAt(w, '#');
                cinput = cinput.replaceAt(i, '#');
                result = result.replaceAt(i, 'S');

                colorKey(input[i], "yellow");
                continue;
            }else {
                //Der Rest ist grau
                colorKey(input[i], "grey");
            }
        }
    }

    //Auswertung des Inputs-Checks. Emojis werden erstellt 
    for(let i = 0; i < letters; i++) {
        if(result.charAt(i) == 'R'){
            wordle_grid.children.item(curr_row).children.item(i).classList.add("green");
            emojis+="🟩";
        }else if(result.charAt(i) == 'S'){
            wordle_grid.children.item(curr_row).children.item(i).classList.add("yellow");
            emojis+="🟨";
        }else {
            wordle_grid.children.item(curr_row).children.item(i).classList.add("grey");
            emojis+="⬛";
        }
    }

    emojis += "\n"

    return result.match(win_result);
}

function setupEventListener() {
    document.body.addEventListener("keydown", (e) => {
        pressKey(e.key);
    });
}

async function pressKey(key) {

    //Wenn die Zeile noch nicht "voll" ist -> gucken ob Input ein Bcuhstabe ist
    if(input.length < letters){
        if(isLetter(key)) {
            input+=key.toLowerCase();
            updateInput();
        }
    }else if(key == "Enter") {
       if(await wordExists() || useNonExistingWords == true) {
            if(checkInput()) {
                //Bei richtiger Antwort (Gewonnen)
                poup_wnd.classList.add("active");
                console.log("I guessed this " + letters + "-letter word in " + (curr_row+1) +"/" + rows + " tries.\n\n" + emojis);
            }else{
                if(curr_row < rows-1) {
                    ///Bei falscher Antwort + übrige Versuche => nächster Versuch (nächste Zeile)
                    curr_row++;
                    input = "";
                }else{
                    //Bei falscher Antwort und aufgebrauchten Versuchen (Verloren)
                    alert("Verloren. Gesuchtes Wort: " + word.toUpperCase());
                }
            }
        }else{
            //bei nicht existierenden Wörtern (zmd. wenn aktiv)
            alert("Word doesnt exist!");
        }
    }

    if(key == "Backspace" || key == "Delete") {
        input = input.substring(0, input.length - 1);
        updateInput();
    }
}


function isLetter(str) {
    return str.length === 1 && str.match(/[a-z\u00c4\u00d6\u00dc]/i);
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function shuffle(data) {
    return data
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}