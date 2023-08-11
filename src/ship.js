const Ship = (length, type = "s") => {
  let hits = 0;
  const getLength = () => length;
  const getType = () => type;
  const getHits = () => hits;
  const hit = () => {
    hits += 1;
  };
  const isSunk = () => hits === length;

  return { getLength, isSunk, getHits, hit, getType };
};

export default Ship;
