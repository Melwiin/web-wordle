var wordle_grid = document.getElementById("wordle-grid");
var letters = 5;
var rows = 6;

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