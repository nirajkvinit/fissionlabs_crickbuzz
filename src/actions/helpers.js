export const getBowlingResult = (
  inputArr = [0, 1, 2, 3, 4, 5, 6, 'wd', 'nb', 'out']
) => inputArr[Math.floor(Math.random() * inputArr.length)];

export const coinToss = (inputArr) =>
  inputArr[Math.floor(Math.random() * inputArr.length)];

export const chooseGameAction = (inputArr) =>
  inputArr[Math.floor(Math.random() * inputArr.length)];

export const getBowlersList = (
  players = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
) => {
  let selectedPlayers = [];
  while (selectedPlayers.length < 5) {
    let foundPlayer = players[Math.floor(Math.random() * players.length)];
    if (!selectedPlayers.includes(foundPlayer)) {
      selectedPlayers = [...selectedPlayers, foundPlayer];
    }
  }
  return selectedPlayers;
};
