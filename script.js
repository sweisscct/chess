
// Indicate whose turn it is
//Turns will be “hot-seat” – players will take turns using the same computer to play


function firstTurn(){
     turn = Math.random();
     if(turn < 0.5){
        return 1;
     }else{
        return 2;
     }
}
var playerTurn = firstTurn();

function changeTurn(){
        if (playerTurn == 1){
            playerTurn = 2;
        }else{
            playerTurn = 1;
        }     
    return playerTurn
}

function getTurn() {
    return playerTurn;
}