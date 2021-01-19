export const genRandString = () => {
  const length = 5;
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const genRandNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min) + min);
}

let spritePositions = [];

export const genRandPositions = (numOfSquares, middlePosition) => {
  // console.log(numOfSquares);
  const max = numOfSquares - 1;
  const _set = new Set(spritePositions);

  for (let i = 0; i < numOfSquares; i++) {
    let x = genRandNumber(max);
    let y = genRandNumber(max);
    let newPosition = `${x}${y}`;

    _set.add(newPosition)
  }

  if (_set.has(middlePosition))
    _set.delete(middlePosition);

  spritePositions = Array.from(_set)

  if (spritePositions.length >= numOfSquares) {
    return spritePositions.slice(0, numOfSquares)
  }

  return genRandPositions(numOfSquares, middlePosition)
}