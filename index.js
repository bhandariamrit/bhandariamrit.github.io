const cards = document.querySelectorAll(".memory-card");

let hasflippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let totalMatchedCard = 0;
let totalMove = 0;
let totalTime = 0;

// Flip Card

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasflippedCard) {
        //first click
        hasflippedCard = true;
        firstCard = this;
        return;
    }

    // second click
    hasflippedCard = false;
    secondCard = this;
    checkForMatch();
}
// Matching Card
function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}
// Validation for More than 2 cards should not be previewed.
function disableCards() {

    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
    totalMatchedCard++;

    // Popup Modal 


    if (totalMatchedCard == 6) {


        var text = `Congratulations!! Your Move: ${totalMove} and your Time: ${totalTime} sec.`;
        $(".modal-body").text(text);

        $('#myModal').modal();



    }
}




// Unflip Cards
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 1500);
}

// Reset Board
function resetBoard() {
    [hasflippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


// Shuffle Board
(function shuffle() {
    cards.forEach((card) => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();
cards.forEach((card) => card.addEventListener("click", flipCard));




// move count

const clickCards = document.querySelector(".memory-game");
let move = document.querySelector(".count");
clickCards.addEventListener("click", countUp);

function countUp() {
    move.innerHTML++;
    totalMove++;
}





/// Timer Count

const startingMinutes = 0;
let time = startingMinutes * 60;

const timeTaken = document.querySelector('.timer');

setInterval(updateCountDown, 1000);

function updateCountDown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    timeTaken.innerHTML = `${minutes}: ${seconds}`;

    time++;
    totalTime++;
}


//// Reset function

function reset() {
    window.location.reload();
}


// Stop Timer after all the cards matched.