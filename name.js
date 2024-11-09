function displayName() {
    // Open the second HTML page
    const playerName1 = document.getElementById("player1Name").value;
    const playerName2 = document.getElementById("player2Name").value;

    document.getElementById("displayPlayer1Name").innerText=playerName1;
    document.getElementById("displayPlayer2Name").innerText=playerName2;   
}
