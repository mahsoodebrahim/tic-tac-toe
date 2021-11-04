const game = (() => {
  const gameboard = [null, null, null, null, null, null, null, null, null];
  const _addedMarterToGameboard = true;
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
    return _addedMarterToGameboard;
  };

  const _isTie = () => {
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
    return _isTie() || _isThreeInARowPresent();
  };

  return {
    gameboard,
    addMarkerAtPosition,
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

const Player = (marker) => {
  const playerName = `Player ${marker}`;
  const playerMarker = marker;
  return {
    playerMarker,
    playerName,
  };
};

// const endGame() => {

// }
// const playTurn = (event) => {
//   const positionNumber = parseInt(event.target.id.slice(-1));

//   game.addMarkerAtPosition(currentPlayerMarker, positionNumber); // TODO: this returns weathher or not the marker was placed

//   displayController.updateBoard();

//   if (game.isGameOver()) {
//     console.log("GAME OVER");
//   }
// };

const playerOne = Player("X");
const playerTwo = Player("O");
let currentPlayer = playerOne;

const commentary = document.getElementById("commentary");
commentary.innerHTML = `${currentPlayer.playerName}, Let's Start!`;

const boardPositions = document.querySelectorAll(".file");

boardPositions.forEach((boardPosition) => {
  boardPosition.addEventListener("click", (e) => {
    // commentary.innerHTML = `${currentPlayer.playerName}'s Turn'`;

    const positionNumber = parseInt(e.target.id.slice(-1));

    const addedMarker = game.addMarkerAtPosition(
      currentPlayer.playerMarker,
      positionNumber
    );

    if (addedMarker) {
      // Change marker for next turn
      currentPlayer =
        currentPlayer.playerMarker === playerOne.playerMarker
          ? playerTwo
          : playerOne;

      displayController.updateBoard();
      commentary.innerHTML = `${currentPlayer.playerName}'s Turn`;
      if (game.isGameOver()) {
        console.log("GAME OVER"); // TODO: Need to determine if game is tied or won
      }
    } else {
      console.log("cant pick that spot");
    }
  });
});
