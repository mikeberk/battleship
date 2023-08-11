import Gameboard from "../src/gameboard";
import Ship from "../src/ship";

// Global Setup
// const testBoard = Gameboard();
// beforeEach(() => {
//   for (let i = 0; i < 10; i++) {
//     for (let j = 0; j < 10; j++) {
//       testBoard.board[i][j] = 0;
//     }
//   }
//   testBoard.shipStorage = {};
// });

test("When placeShip is called with horizontal then game board updates properly", () => {
  const testBoard = Gameboard();
  const testShip = Ship(3);
  testBoard.placeShip(testShip, [1, 1], "h");

  expect(testBoard.board[1][1]).toBe("s");
  expect(testBoard.board[1][2]).toBe("s");
  expect(testBoard.board[1][3]).toBe("s");
});

test("When placeShip is called with vertical then game board updates properly", () => {
  const testBoard = Gameboard();
  const testShip = Ship(3);
  testBoard.placeShip(testShip, [1, 1], "v");

  expect(testBoard.board[1][1]).toBe("s");
  expect(testBoard.board[2][1]).toBe("s");
  expect(testBoard.board[3][1]).toBe("s");
});

test("When placeShip would place a ship outside of game board then error is thrown", () => {
  const testBoard = Gameboard();
  const testShip = Ship(3);

  expect(() => testBoard.placeShip(testShip, [9, 9], "h")).toThrow(
    "Cannot place ship outside of the board"
  );
  expect(() => testBoard.placeShip(testShip, [9, 9], "v")).toThrow(
    "Cannot place ship outside of the board"
  );
});

test("When placeShip would place a ship overlapping existing ship then error is thrown", () => {
  const testBoard = Gameboard();
  const ship1 = Ship(4);
  const ship2 = Ship(3);

  testBoard.placeShip(ship1, [3, 3], "h");

  expect(() => testBoard.placeShip(ship2, [2, 3], "h")).toThrow(
    "Cannot place overlapping ships"
  );

  expect(() => testBoard.placeShip(ship2, [3, 1], "v")).toThrow(
    "Cannot place overlapping ships"
  );
});

test("When receiveAttack is called on a cell without a ship then a miss is recorded", () => {
  const testBoard = Gameboard();
  const testShip = Ship(3);
  testBoard.placeShip(testShip, [3, 3], "h");

  expect(testBoard.receiveAttack([2, 2])).toBe(false);
  expect(testBoard.board[2][2]).toBe("m");
});

test("When receiveAttack is called on a cell with a ship then hit is recorded", () => {
  const testBoard = Gameboard();
  const testShip = Ship(3, "destroyer");
  testBoard.placeShip(testShip, [3, 3], "h");

  expect(testBoard.receiveAttack([3, 3])).toBe(true);
  expect(testBoard.board[3][3]).toBe("x");
});

test("When all placed ships are sunk then areAllSunk returns true", () => {
  const testBoard = Gameboard();
  const testShip = Ship(3, "destroyer");
  testBoard.placeShip(testShip, [3, 3], "h");
  testBoard.receiveAttack([3, 3]);
  testBoard.receiveAttack([4, 3]);
  testBoard.receiveAttack([5, 3]);

  expect(testBoard.areAllSunk()).toBe(true);
});

test("When one placed ship is not sunk then areAllSunk returns false", () => {
  const testBoard = Gameboard();
  const testShip = Ship(3, "destroyer");
  testBoard.placeShip(testShip, [3, 3], "h");
  testBoard.receiveAttack([3, 3]);
  testBoard.receiveAttack([4, 3]);

  expect(testBoard.areAllSunk()).toBe(false);
});

test("When multiple ships are place and not all are sunk then areAllSunk returns false", () => {
  const testBoard = Gameboard();
  const testShip1 = Ship(3, "destroyer");
  const testShip2 = Ship(3, "submarine");

  testBoard.placeShip(testShip1, [3, 3], "h");
  testBoard.placeShip(testShip2, [5, 5], "h");

  testBoard.receiveAttack([3, 3]);
  testBoard.receiveAttack([4, 3]);
  testBoard.receiveAttack([5, 3]);

  expect(testBoard.areAllSunk()).toBe(false);
});
