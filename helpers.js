export const compareArrays = (a, b) => {
  // console.log(a, b);
  // console.log(a.toString() === b.toString());
  return a.toString() === b.toString();
};

export const TOKENS = {
  empty: 'o',
  ship: 's',
  hit: 'x',
  miss: 'm'
};
