// Get DOM elements
const playerHand = document.getElementById('player-hand');
const computerHand = document.getElementById('computer-hand');
const resultText = document.getElementById('result-text');
const playerScoreSpan = document.getElementById('player-score');
const computerScoreSpan = document.getElementById('computer-score');
const choiceButtons = document.querySelectorAll('.choice-btn');
const resetButton = document.getElementById('reset-btn');

// Game variables
let playerScore = 0;
let computerScore = 0;
const choices = ['rock', 'paper', 'scissors'];
const imagePaths = {
    rock: 'images/rock.png',
    paper: 'images/paper.png',
    scissors: 'images/scissors.png',
    default: 'images/default.png'
};

// Function to get computer's choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a Tie!";
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return "You Win!";
    } else {
        return "Computer Wins!";
    }
}

// Function to update scores and display result
function updateGame(playerChoice, computerChoice, winner) {
    // Update hand images
    playerHand.src = imagePaths[playerChoice];
    computerHand.src = imagePaths[computerChoice];

    // Remove shake class after showing choices
    setTimeout(() => {
        playerHand.classList.remove('shake');
        computerHand.classList.remove('shake');
    }, 500); // Should match the animation duration

    // Update result text
    resultText.textContent = winner;

    // Update scores
    if (winner === "You Win!") {
        playerScore++;
        playerScoreSpan.textContent = playerScore;
        resultText.style.color = '#aaffaa'; // Green for win
    } else if (winner === "Computer Wins!") {
        computerScore++;
        computerScoreSpan.textContent = computerScore;
        resultText.style.color = '#ffaaaa'; // Red for loss
    } else {
        resultText.style.color = '#ffd700'; // Gold for tie
    }
}

// Function to handle player's choice
function playRound(playerChoice) {
    // Add shake animation
    playerHand.classList.add('shake');
    computerHand.classList.add('shake');
    playerHand.src = imagePaths['default']; // Show default during shake
    computerHand.src = imagePaths['default'];
    resultText.textContent = "Rock... Paper... Scissors...";
    resultText.style.color = '#fff';

    // Disable buttons during animation
    choiceButtons.forEach(button => button.disabled = true);
    resetButton.disabled = true;

    // Simulate thinking time with a delay
    setTimeout(() => {
        const computerChoice = getComputerChoice();
        const winner = determineWinner(playerChoice, computerChoice);
        updateGame(playerChoice, computerChoice, winner);

        // Re-enable buttons after result is shown
        choiceButtons.forEach(button => button.disabled = false);
        resetButton.disabled = false;
    }, 1500); // Adjust delay as needed
}

// Function to reset the game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;
    resultText.textContent = "Make your move!";
    resultText.style.color = '#fff';
    playerHand.src = imagePaths.default;
    computerHand.src = imagePaths.default;
}

// Event Listeners
choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.dataset.choice;
        playRound(playerChoice);
    });
});

resetButton.addEventListener('click', resetGame);

// Initial setup (optional, but good for clarity)
document.addEventListener('DOMContentLoaded', () => {
    resetGame(); // Ensure initial state is clean
});