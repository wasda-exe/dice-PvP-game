//On page load, double 6's
//What about default image as double 6's on first load, then reload alter?
//Could replace img src=dice<> number directly, with js attribute modification.

//Seperation of concerns would imply that we had different classes for each.
    // In that case, we could originally have divs without any image.
    // Still having to remove a specific class on reload would be difficult for this.

//direct number modification is likely the way to go, inserting src as string + $var (js concat)

window.onload = function() {
    // on first load, reloaded becomes null
    var reloaded = sessionStorage.getItem("alreadyReloaded");

    // 1. if first load, the if block not executed
    // 2. if reloaded evaluates to a value that is already stored
    //    after first reload, below is executed upon each load
    if(reloaded) {
        roll();
        // updateScore();
    } else {

        // at first load end, alreadyReloaded is now set to true
        // In each subsequent reload, the if(reloaded block executes.)
        sessionStorage.setItem("alreadyReloaded", true);
        resetScore();
        // sessionStorage.setItem('player1Score', 0);
        // sessionStorage.setItem('player2Score', 0);
    }

}

function roll() {
    // dice images
    let dice1 = document.querySelector('.img1');
    let dice2 = document.querySelector('.img2');
    
    // random numbers between 1 and 6
    let roll1 = Math.floor(Math.random() * 6) + 1;
    let roll2 = Math.floor(Math.random() * 6) + 1;
    dice1.setAttribute('src', 'images/dice'+roll1+'.png')
    dice2.setAttribute('src', 'images/dice'+roll2+'.png')

    //decide winning announcement
    let text;
    if (roll1 > roll2) {
        text = '🚩 Player 1 Wins!';
        updateScore(1)
    } else if (roll1 < roll2) {
        text = 'Player 2 Wins! 🚩';
        updateScore(2)
    } else {
        text = 'Draw';
        updateScore(0)
    }

    //update announcement
    let announcement = document.querySelector('.announcement');
    announcement.textContent = text;
}

// updates score counter on website as well as sessionStorage
function updateScore(winner) {
    // score counters
    let player1Score = document.querySelector('.player1Score');
    let player2Score = document.querySelector('.player2Score');

    // get old scores (initialize with old values)
    let newPlayer1Score = parseInt(sessionStorage.getItem('player1Score'));
    let newPlayer2Score = parseInt(sessionStorage.getItem('player2Score'));
    
    // calc new scores
    if(winner===1) {
        newPlayer1Score++;
        
    } else if (winner===2) {
        newPlayer2Score++;
    }

    // update stored score values
    sessionStorage.setItem('player1Score', newPlayer1Score);
    sessionStorage.setItem('player2Score', newPlayer2Score);

    // update score counters
    player1Score.textContent=newPlayer1Score;
    player2Score.textContent=newPlayer2Score;
}

// reset the score on website
let resetButton = document.querySelector('.btn');
resetButton.addEventListener("click", resetScore);
function resetScore() {
    sessionStorage.setItem('player1Score', 0);
    sessionStorage.setItem('player2Score', 0);
    updateScore(0);
}