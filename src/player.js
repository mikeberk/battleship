import Gameboard from "./gameboard";

const Player = () => {
  const playerBoard = Gameboard();

  // this should help ensure AI doesn't attack the same spot twice
  const attackHistory = [];

  const attack = (board, coords) => {
    board.receiveAttack(coords);
    attackHistory.push(coords);
  };

  const randomAttack = (board) => {
    const randomX = Math.floor(Math.random() * 10);
    const randomY = Math.floor(Math.random() * 10);

    board.receiveAttack([randomX, randomY]);
    attackHistory.push([randomX, randomY]);
  };

  return { playerBoard, attack, randomAttack, attackHistory };
};

export default Player;
