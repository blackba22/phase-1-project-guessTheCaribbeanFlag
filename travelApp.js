// Get flag objects loaded to the DOM
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/places")
      .then((res) => res.json())
      .then((fetchedPlaces) => {
        places = fetchedPlaces;
        showFlags(places);
        selectRandomPlace(places);
    });
})    
  
// Show flags to guess
function showFlags(places) {
    const selectedFlag = places[Math.floor(Math.random() * places.length)];
    const card = document.createElement("img");
    card.src = `${selectedFlag.imageUrl}`;
    card.classList.add("flag-img");
    document.getElementById("flag-list").appendChild(card);
}

// get references to HTML elements
const flagList = document.getElementById("flag-list");
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const messageDiv = document.getElementById("message");
const restartBtn = document.getElementById("restart-btn");
const clueBtn = document.getElementById("clue-btn");


let selectedPlace = {};
let isGameEnded = false;
let places = [];

// select a random place from the places array
function selectRandomPlace(places) {
  selectedPlace = places[Math.floor(Math.random() * places.length)];
  flagList.src = `${selectedPlace.imageUrl}`;
}

// check if the user's guess is correct
function checkGuess() {
  if (isGameEnded) {
    return;
  }

  const guess = guessInput.value.toLowerCase();

  if (guess === `${selectedPlace.location}`.toLowerCase()) {
    messageDiv.textContent = "Correct!";
    isGameEnded = true;
  } else {
    messageDiv.textContent = "Incorrect. Try again.";
  }
}

// reset the game
function resetGame() {
  isGameEnded = false;
  guessInput.value = "";
  messageDiv.textContent = "";
  selectRandomPlace(places);
}

// show clue to user
function showClue() {
    const clueDiv = document.createElement("div");
    clueDiv.textContent = selectedPlace.clue;
    messageDiv.appendChild(clueDiv);
}

// add event listeners to the guess button, restart button and clue button
guessBtn.addEventListener("click", checkGuess);
restartBtn.addEventListener("click", resetGame);
clueBtn.addEventListener("mouseover", showClue);

// initialize the game by selecting a random place
selectRandomPlace(places);
