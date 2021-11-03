const game = ((doc) => {
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

  const hasDocumentObj = () => {
    return !!doc && querySelector in doc;
  };

  const canAddToPosition = (position) => {
    return gameboard[position - 1] === null;
  };

  const addMarkerAtPosition = (marker, position) => {
    if (!hasDocumentObj || !canAddToPosition(position)) {
      return _cannotAddMarkerToGameboard;
    }

    gameboard[position - 1] = marker;
    return _addedMarterToGameboard;
  };

  const updateBoard = () => {
    if (!hasDocumentObj) return;

    gameboard.forEach((marker, position) => {
      doc.querySelector(`#position-${position + 1}`).innerHTML =
        marker === null ? "" : marker;
    });
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
    addMarkerAtPosition,
    updateBoard,
    isGameOver,
  };
})(document);

const Player = (marker) => {
  const playerName = `Player ${marker}`;
  const playerMarker = marker;
  return {
    playerMarker,
    playerName,
  };
};

const boardPositions = document.querySelectorAll(".file");
boardPositions.forEach((boardPosition) => {
  boardPosition.addEventListener("click", (e) => {
    const positionNumber = parseInt(e.target.id.slice(-1));
    // console.log(positionNumber);
    game.addMarkerAtPosition("P", positionNumber);
    game.updateBoard();
    if (game.isGameOver()) {
      console.log("GAME OVER");
    }
  });
});
