const game = ((doc) => {
  const gameboard = [null, null, null, null, null, null, null, null, null];
  const _addedMarterToGameboard = true;
  const _cannotAddMarkerToGameboard = false;

  const hasDocumentObj = () => {
    return !!doc && querySelector in doc;
  };

  // const isPositionEmpty = (position) => {
  //   return gameboard[position-1] === null
  // };

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

  return {
    gameboard,
    addMarkerAtPosition,
    updateBoard,
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
    console.log(positionNumber);
    game.addMarkerAtPosition("P", positionNumber);
    // console.log(game.gameboard);
    game.updateBoard();
  });
});

console.log(game.gameboard);
