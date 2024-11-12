// let col = 0;
// let row = 0
let isTurnWhite;
let movesWPawn;
let board = [];
let square_destination = [];
let wPawnDirection = 'asc';
let bPawnDirection = 'desc';

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

let b_pawn = ["p", "p", "p", "p", "p", "p", "p", "p"];
let b_piece = ["t", "h", "b", "k", "q", "b", "h", "t"];
let w_pawn = ["P", "P", "P", "P", "P", "P", "P", "P"];
let w_piece = ["T", "H", "B", "K", "Q", "B", "H", "T"];
let n_line = [null, null, null, null, null, null, null, null];

let moves_knight = [
    [[2, -1]], [[2, 1]], [[1, 2]], [[-1, 2]], [[-2, 1]], [[-2, -1]], [[-1 - 2]], [[1, -2]]
];

let moves_hook = [
    [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]],
    [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]],
    [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]],
    [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0]]
]

let moves_bishop = [
    [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]],
    [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7]],
    [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]],
    [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]]
]

let moves_queen = [];
moves_hook.forEach(e => moves_queen.push(e));
moves_bishop.forEach(e => moves_queen.push(e));

let moves_king = [];
moves_queen.forEach(e => moves_king.push([e[0]]));


function movesPawn(r, c, pawnDirection) {
    let res = [];
    let auxR;
    let auxC;

    if (pawnDirection == 'desc') {
        res.push([[1, 0]]);

        if (r == 1 && isEmptySquare(r + 2, c))
            res[0].push([2, 0]);

        auxR = r + 1;
        auxC = c - 1;
        if (!isEmptySquare(auxR, auxC) && isPieceWhite(r, c) != isPieceWhite(auxR, auxC)) {
            res.push([[1, -1]])
        }

        auxR = r + 1;
        auxC = c + 1;
        if (!isEmptySquare(auxR, auxC) && isPieceWhite(r, c) != isPieceWhite(auxR, auxC)) {
            res.push([[1, 1]])
        }

    } else {
        res.push([[-1, 0]]);

        if (r == 6 && isEmptySquare(r - 2, c))
            res[0].push([-2, 0]);

        auxR = r - 1;
        auxC = c - 1;
        if (!isEmptySquare(auxR, auxC) && isPieceWhite(r, c) != isPieceWhite(auxR, auxC)) {
            res.push([[-1, -1]])
        }

        auxR = r - 1;
        auxC = c + 1;
        if (!isEmptySquare(auxR, auxC) && isPieceWhite(r, c) != isPieceWhite(auxR, auxC)) {
            res.push([[-1, +1]])
        }
    }
    return res;
}

/*
    this function will read matrice Board and update html with most updated position
    game
*/
function updateBoard(newBoard) {
    board = newBoard;

    for (row = 0; row < board.length; row++)
        for (col = 0; col < board[0].length; col++) {
            let src = "transparency-image.png";

            if (!isEmptySquare(row, col))
                src = images[board[row][col]];

            document.getElementById("" + row + col).setAttribute("src", "./images/" + src);
        }
}

/*
    check color either is a white or black color
*/
function isPieceWhite(r, c) {
    return document.getElementById("" + r + c).src.includes("b-") ? false : true;
}
/*
    check if a square is Empty
*/
function isEmptySquare(r, c) {
    return (board[r][c] == null);
}

/*
    check if a position whitin a board
*/
function isPieceInBoard(r, c) {
    return (r >= 0 && r <= 7) && (c >= 0 && c <= 7);
}


/* 
   mark on board all possibles destination 
*/
function markDestination(target) {
    let row;
    let col;
    let rowD;
    let colD;
    let positions;
    let pawnDirection = isTurnWhite ? wPawnDirection : bPawnDirection;

    row = Number(target.children[0].id[0]);
    col = Number(target.children[0].id[1]);

    // clear previous lists
    square_destination.map(square => document.getElementById(square).classList.remove("b-board-destination"));

    if (isEmptySquare(row, col))
        return

    // check if a game has starte
    if (document.getElementsByClassName("b-placar")[0].style.display != "flex"){
        return
    }

    // check if selected piece is the same color oh the turn
    if (isTurnWhite != isPieceWhite(row, col)) {
        return
    }

    if (target.children[0].src.includes("pawn"))
        positions = movesPawn(row, col, pawnDirection)
    else if (target.children[0].src.includes("knight"))
        positions = moves_knight
    else if (target.children[0].src.includes("bishop"))
        positions = moves_bishop;
    else if (target.children[0].src.includes("hook"))
        positions = moves_hook;
    else if (target.children[0].src.includes("queen"))
        positions = moves_queen;
    else
        positions = moves_king;

    for (i = 0; i < positions.length; i++) {
        for (j = 0; j < positions[i].length; j++) {
            rowD = row + Number(positions[i][j][0]);
            colD = col + Number(positions[i][j][1]);

            if (isPieceInBoard(rowD, colD)) {

                if (isEmptySquare(rowD, colD)) {
                    document.getElementById("" + rowD + colD).classList.add("b-board-destination");
                    square_destination.push("" + rowD + colD);
                } else {

                    if (isPieceWhite(row, col) == isPieceWhite(rowD, colD))
                        break
                    else {
                        document.getElementById("" + rowD + colD).classList.add("b-board-destination");
                        square_destination.push("" + rowD + colD);
                        break
                    }
                }
            }
        }
    }
}
/*
    this function will reset scenario for a new game
*/
function newGame() {
    document.getElementById("player1Name").innerText = "";
    document.getElementById("player2Name").innerText = "";

    document.getElementsByClassName("b-players")[0].style.display = "flex";
    document.getElementsByClassName("b-placar")[0].style.display = "none";
    document.getElementById("player1").focus();

    if (Math.random() < .5) {
        updateBoard([w_piece, w_pawn, n_line, n_line, n_line, n_line, b_pawn, b_piece]);
        wPawnDirection = 'asc';
        bPawnDirection = 'desc';
    } else {
        updateBoard([b_piece, b_pawn, n_line, n_line, n_line, n_line, w_pawn, w_piece]);
        bPawnDirection = 'asc';
        wPawnDirection = 'desc';
    }
    isTurnWhite = true;
}

/*
    this function will receive plaers names and strt a game
*/
function startGame() {
    document.getElementById("player1Name").innerText = document.getElementById("player1").value;
    document.getElementById("player2Name").innerText = document.getElementById("player2").value;
    document.getElementsByClassName("b-players")[0].style.display = "none";
    document.getElementsByClassName("b-placar")[0].style.display = "flex";
}

// draw the board
updateBoard([
    ["t", "h", "b", "k", "q", "b", "h", "t"],
    ["p", "p", "p", "p", null, "p", null, "p"],
    [null, null, null, null, "p", null, "p", null],
    [null, null, null, null, null, "P", null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, "K", "P", "Q", null, "T", null],
    ["T", null, "B", "H", "B", null, "H", "P"],
    ["P", "P", "P", null, "P", null, "P", null]
]);

wPawnDirection = 'asc';
bPawnDirection = 'desc';
isTurnWhite = true;
