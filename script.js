var rugbyPlayers = ["LOMU", "MCCAW", "TUILAGI", "BAKER",
    "CARTER", "NONU", "WILKINSON", "JOHNSON",
    "FONUA", "HAYNE"];

var treeTypes = ["ASH", "ASPEN", "REDWOOD", "BIRCH", "CHERRY",
    "WALNUT", "OAK", "MAPLE", "HICKORY", "ELM", "WILLOW",
    "PINE", "SEQUOIA", "MADRONE", "ALDER", "CYPRESS"];

var musicTerms = ["CLASSICAL", "JAZZ", "ROCK", "RHYTHM", "MOTIF",
    "TEMPO", "SHARPS", "FLATS", "HARMONY", "MELODY", "CHORD",
    "PIANO", "FORTE", "SFORZANDO", "NOTES"];

var palindromicWords = ["MADAM", "ROTATOR", "ROTOR", "LEVEL", "KAYAK",
    "RADAR", "WOW", "NOON", "SOLOS", "RACECAR", "CIVIC",
    "REPAPER", "SAGAS", "STATS", "REVIVER"];

var concreteTypes = ["PLAIN", "REINFORCED", "PRESTRESSED", "PRECAST",
    "LIGHTWEIGHT", "POLYMER", "SHOTCRETE", "PERVIOUS",
    "VACUUM", "PUMPED", "STAMPED", "LIMECRETE", "ASPHALT",
    "GLASS"];



var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var word = "";

var guesses = 6;

var guessedLetters = [];

var lossCounter = 0;

var winCounter = 0;

function startGame(){
    guessedLetters = [];
    guesses = 6;
    document.getElementById("winOrLose").innerHTML="";
    var cat = document.getElementById("gameCategory").value;
    cat = parseInt(cat);
    if(cat == 1){
        word = rugbyPlayers[Math.floor(Math.random() * rugbyPlayers.length)];
    }
    if(cat == 2){
        word = treeTypes[Math.floor(Math.random() * treeTypes.length)];
    }
    if(cat == 3){
        word = musicTerms[Math.floor(Math.random() * musicTerms.length)];
    }
    if(cat == 4){
        word = palindromicWords[Math.floor(Math.random() * palindromicWords.length)];
    }
    if(cat == 5){
        word = concreteTypes[Math.floor(Math.random() * concreteTypes.length)];
    }
    document.getElementById("alphabetButtons").innerHTML = "";
    for(var i = 0; i < alphabet.length; i++){
        var btn = document.createElement("button");
        btn.innerHTML = alphabet[i];
        document.getElementById("alphabetButtons").appendChild(btn);
        btn.setAttribute("class", "letterBtn");
        btn.setAttribute("value", alphabet[i]);
        btn.setAttribute("onclick","guessLetter(this)");
    }
    document.getElementById("yourGuesses").innerHTML = "Guessed Letters: ";
    document.getElementById("livesRemaining").innerHTML="Guesses Remaining: " + guesses;
    document.getElementById("wonGames").innerHTML="Wins: " + winCounter;
    document.getElementById("lostGames").innerHTML="Losses: " + lossCounter;
}

function printWord(){
    var answer = "";
    setPicture();
    for(var i = 0; i < word.length; i++){
        if(guessedLetters.indexOf(word[i]) > - 1){
            answer += word[i];
        }else{
            answer += "_ ";
        }
    }
    document.getElementById("wordDisplay").innerHTML = answer;
    return answer;
}

function guessLetter(button) {
    var letter = button.value;
    var btnArray = document.getElementsByClassName("letterBtn");
    guessedLetters.push(letter);
    if(word.indexOf(letter) == -1){
        printWord();
        guesses --;
    }else{
        printWord();
    }
    setPicture();
    button.style.backgroundColor = "grey";
    button.disabled = true;
    if(guesses > 0){
        document.getElementById("livesRemaining").innerHTML="Guesses Remaining: " + guesses;
        document.getElementById("yourGuesses").innerHTML="Guessed Letters: " + guessedLetters;
    }else if(guesses == 0){
        document.getElementById("livesRemaining").innerHTML="";
        document.getElementById("yourGuesses").innerHTML="";
        document.getElementById("winOrLose").innerHTML="Sorry! You lost! Choose a new category " +
            "and click Start to play again!";
        for(var i = 0; i < btnArray.length; i++) {
            btnArray[i].disabled = true;
            btnArray[i].style.backgroundColor = "gray";
        }

        lossCounter += 1;
    }
    if(document.getElementById("wordDisplay").innerHTML.indexOf("_ ") == -1){
        document.getElementById("livesRemaining").innerHTML="";
        document.getElementById("yourGuesses").innerHTML="";
        document.getElementById("winOrLose").innerHTML="Congrats! You won! Choose a new category " +
            "and click Start to play again!";
        for(var j = 0; j < btnArray.length; j++){
            btnArray[j].disabled = true;
            btnArray[j].style.backgroundColor = "gray";
        }
        winCounter += 1;
    }
    document.getElementById("wonGames").innerHTML = "Wins: " + winCounter;
    document.getElementById("lostGames").innerHTML="Losses: " + lossCounter;
}

function setPicture(){
    document.getElementById("hangmanImage").innerHTML = "<img src='hangmanImages/"  + guesses + ".png'>";
}
