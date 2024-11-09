// Indicate whose turn it is
//Turns will be “hot-seat” – players will take turns using the same computer to play

// Function to set randomly the first turn of the game
function firstTurn(){
    turn = Math.random();
    if(turn < 0.5){
       return 1;
    }else{
       return 2;
    }
}
var playerTurn = firstTurn();


// Function to change turn 
function changeTurn(){
       if (playerTurn == 1){
           playerTurn = 2;
       }else{
           playerTurn = 1;
       }     
   return playerTurn
}

//function to get the current turn
function getTurn() {
   return playerTurn;
}