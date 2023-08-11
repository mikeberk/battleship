import Ship from "../src/ship";

test("ship length is returned", () => {
  expect(Ship(4).getLength()).toBe(4);
});

test("hitting ship returns the correct modified number of hits", () => {
  const newShip = Ship(2);
  newShip.hit();
  expect(newShip.getHits()).toBe(1);
});

test("ship should be sunk when number of hits equals length", () => {
  const newShip = Ship(1);
  newShip.hit();
  expect(newShip.isSunk()).toBe(true);
});

test("ship should be sunk only when number of hits equals length", () => {
  const newShip = Ship(2);
  newShip.hit();
  expect(newShip.isSunk()).toBe(false);
  newShip.hit();
  expect(newShip.isSunk()).toBe(true);
});
