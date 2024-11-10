let col = 0;
let row = 0

let images = {
    "t": "b-hook.png",
    "h": "b-knight.png",
    "b": "b-bishop.png",
    "k": "b-king.png",
    "q": "b-queen.png",
    "p": "b-pawn.png",  
    "T": "w-hook.png",
    "H": "w-knight.png",
    "B": "w-bishop.png",
    "K": "w-king.png",
    "Q": "w-queen.png",
    "P": "w-pawn.png"
}


let board = [
    ["t",   "h",  "b",  "k",  "q",  "b",  "h",  "t"],
    ["p",   "p",  "p",  "p", null,  "p",  "p",  "p"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null,  "p", null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["P",   "P",  "P",  "P",  "P",  "P",  "P",  "P"],
    ["T",   "H",  "B",  "K",  "Q",  "B",  "H",  "T"]
];


/*
    this function will read matrice Board and update html with most updated position
    game
*/
function updateBoard() {
    for (row = 0; row < board.length; row++)
        for (col = 0; col < board[0].length; col++) {
            let src = "transparency-image.png";
            
            if (board[row][col] != null) 
                src = images[board[row][col]];


            console.log( "./images/" + src );
            document.getElementById("" + row + col).setAttribute("src", "./images/" + src );
        }
}

function newGame() {
    
    // todo

}



updateBoard();