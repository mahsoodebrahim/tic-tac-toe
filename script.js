const game = (() => {
  const gameboard = [null, null, null, null, null, null, null, null, null];
  const _addedMarkerToGameboard = true;
  const _cannotAddMarkerToGameboard = false;
  const _winningConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const canAddToPosition = (position) => {
    return gameboard[position - 1] === null;
  };

  const addMarkerAtPosition = (marker, position) => {
    if (!canAddToPosition(position)) {
      return _cannotAddMarkerToGameboard;
    }

    gameboard[position - 1] = marker;
    return _addedMarkerToGameboard;
  };

  const blockRemainingPositions = () => {
    for (let position = 0; position < gameboard.length; position++) {
      if (gameboard[position] === null) {
        gameboard[position] = "";
      }
    }
  };

  const resetGameboard = () => {
    for (let position = 0; position < gameboard.length; position++) {
      gameboard[position] = null;
    }
  };

  const isTie = () => {
    return gameboard.every((position) => position !== null);
  };

  const _isThreeInARowPresent = () => {
    for (const winningCombination of _winningConditions) {
      const postitionI = winningCombination[0] - 1;
      const postitionII = winningCombination[1] - 1;
      const postitionIII = winningCombination[2] - 1;

      if (
        gameboard[postitionI] !== null &&
        gameboard[postitionII] !== null &&
        gameboard[postitionIII] !== null
      ) {
        if (
          gameboard[postitionI] === gameboard[postitionII] &&
          gameboard[postitionI] === gameboard[postitionIII]
        ) {
          return true; // TODO: return object with marker
        }
      }
    }
    return false; // TODO: return object with marker as null
  };

  const isGameOver = () => {
    return isTie() || _isThreeInARowPresent();
  };

  return {
    gameboard,
    blockRemainingPositions,
    resetGameboard,
    addMarkerAtPosition,
    isTie,
    isGameOver,
  };
})();

const displayController = ((doc, gameboard) => {
  const updateBoard = () => {
    gameboard.forEach((marker, position) => {
      doc.querySelector(`#position-${position + 1}`).innerHTML =
        marker === null ? "" : marker;
    });
  };

  return {
    updateBoard,
  };
})(document, game.gameboard);

const Player = (name, marker) => {
  const playerName = name;
  const playerMarker = marker;
  return {
    playerMarker,
    playerName,
  };
};

let currentPlayer;
let handledBoardClicks = false;

function startGame() {
  let playerOne = Player(
    document.getElementById("player1-name").value,
    document.getElementById("player1-marker").value
  );
  let playerTwo = Player(
    document.getElementById("player2-name").value,
    document.getElementById("player2-marker").value
  );
  currentPlayer = playerOne;

  const commentary = document.getElementById("commentary");
  commentary.innerHTML = `${currentPlayer.playerName}, Let's Start!`;

  if (!handledBoardClicks) {
    handleBoardClicks(playerOne, playerTwo);
    handledBoardClicks = true;
  }
}

function handleBoardClicks(playerOne, playerTwo) {
  const boardPositions = document.querySelectorAll(".file");
  boardPositions.forEach((boardPosition) => {
    boardPosition.addEventListener("click", (e) => {
      const positionNumber = parseInt(e.target.id.slice(-1));

      const addedMarker = game.addMarkerAtPosition(
        currentPlayer.playerMarker,
        positionNumber
      );

      if (addedMarker) {
        // Update the board
        displayController.updateBoard();

        // Check if there is a winner or if there was a tie
        if (game.isGameOver()) {
          endGame();
          return;
        }

        // Change marker for next turn
        currentPlayer =
          currentPlayer.playerMarker === playerOne.playerMarker
            ? playerTwo
            : playerOne;

        commentary.innerHTML = `${currentPlayer.playerName}'s Turn`;
      } else if (!game.isGameOver()) {
        commentary.innerHTML = `Can't pick that spot, try again!`;
      }
    });
  });
}

function endGame() {
  if (game.isTie()) {
    commentary.innerHTML = `Tie Game`;
  } else {
    commentary.innerHTML = `${currentPlayer.playerName} Wins!`;
  }

  // Prevent user from clicking empty positions
  game.blockRemainingPositions();

  // Show user options to play again or restart
  document.querySelector(".gameover").style.display = "flex";

  // const restart = document.getElementById("restart");
  const playAgain = document.getElementById("play-again");

  playAgain.addEventListener("click", () => {
    game.resetGameboard();
    displayController.updateBoard();
    startGame();

    // Hide user options to play again or restart
    document.querySelector(".gameover").style.display = "none";
  });
  // playAgain
}

function gameIntro() {
  const startBtn = document.getElementById("start-game");
  startBtn.addEventListener("click", () => {
    // Remove hidden elements
    document.querySelectorAll(".hide").forEach((element) => {
      element.classList.remove("hide");
    });

    // Hide intro
    document.getElementById("intro").classList.add("hide");

    startGame();
  });
}

gameIntro();
