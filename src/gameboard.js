import Ship from "./ship";

const Gameboard = () => {
  const board = [];
  for (let i = 0; i < 10; i++) {
    board[i] = [];
    for (let j = 0; j < 10; j++) {
      board[i][j] = 0;
    }
  }

  const shipStorage = {
    //  Carrier (occupies 5 spaces), Battleship (4), Cruiser (3), Submarine (3), and Destroyer (2).
    // carrier: Ship(5, "carrier"),
    // battleship: Ship(4, "battleship"),
    // cruiser: Ship(3, "cruiser"),
    // submarine: Ship(3, "submarine"),
    // destroyer: Ship(2, "destroyer"),
  };

  const checkOverlap = (ship, coords, dir) => {
    const [x, y] = coords;
    const len = ship.getLength();
    let check = true;
    if (dir === "h") {
      for (let i = 0; i < len; i++) {
        if (board[y][x + i] !== 0) {
          check = false;
        }
      }
    } else {
      for (let i = 0; i < len; i++) {
        if (board[y + i][x] !== 0) {
          check = false;
        }
      }
    }
    return check;
  };

  const placeShip = (ship, coords, dir) => {
    const [x, y] = coords;
    const len = ship.getLength();
    if (dir === "h") {
      if (typeof board[y][x + len - 1] === "undefined") {
        throw new Error("Cannot place ship outside of the board");
      }
      if (!checkOverlap(ship, coords, dir)) {
        throw new Error("Cannot place overlapping ships");
      }
      for (let i = 0; i < len; i++) {
        board[y][x + i] = ship.getType();
      }
    } else {
      if (typeof board[y + len - 1] === "undefined") {
        throw new Error("Cannot place ship outside of the board");
      }
      if (!checkOverlap(ship, coords, dir)) {
        throw new Error("Cannot place overlapping ships");
      }
      for (let i = 0; i < len; i++) {
        board[y + i][x] = ship.getType();
      }
    }
    shipStorage[ship.getType()] = ship;
  };

  const receiveAttack = (coords) => {
    const [x, y] = coords;
    if (board[y][x] === 0) {
      board[y][x] = "m";
      return false;
    }
    const shipName = board[y][x];
    shipStorage[shipName].hit();
    board[y][x] = "x";
    return true;
  };

  const areAllSunk = () => {
    let allSunk = true;
    const shipArr = Object.values(shipStorage);
    shipArr.forEach((ship) => {
      if (!ship.isSunk()) {
        allSunk = false;
      }
    });
    return allSunk;
  };

  return { board, placeShip, receiveAttack, areAllSunk, shipStorage };
};

export default Gameboard;
