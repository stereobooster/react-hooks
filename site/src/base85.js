// z85 alphabet - doesn't include ', ", \
const alphabet =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#";
const base = alphabet.length;
export const base85 = input => {
  const result = [];
  do {
    const remainder = input % base;
    input = ~~(input / base);
    result.push(alphabet[remainder]);
  } while (input !== 0);
  return result.reverse().join("");
};
