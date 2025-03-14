const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const shuffle = (array) => {
  const shuffledArray = [...array];
  const length = array.length;
  for (let index = length - 1; index > 0; index--) {
    const randomIndex = getRandom(0, index);
    const temp = shuffledArray[index];

    shuffledArray[index] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = temp;
  }

  return shuffledArray;
};
function removeCards(array, count, typeOfGood) {
  for (let i = 0; i < count; i++) {
    const index = array.indexOf(typeOfGood);
    array.splice(index, 1);
  }
}
export { removeCards, shuffle };
