const game = (() => {
  gameboard: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  return {
    gameboard,
  };
})();

const Player = (marker) => {
  const playerName = `Player ${marker}`;
  const marker = marker;
  return {
    marker,
    playerName,
  };
};
