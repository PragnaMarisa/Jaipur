class Deck {
  cards = [];

  constructor(cards) {
    this.cards = cards;
  }

  #getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  shuffle = () => {
    const shuffledArray = [...this.cards];
    const length = shuffledArray.length;
    for (let index = length - 1; index > 0; index--) {
      const randomIndex = this.#getRandom(0, index);
      const temp = shuffledArray[index];

      shuffledArray[index] = shuffledArray[randomIndex];
      shuffledArray[randomIndex] = temp;
    }
    this.cards = shuffledArray;
    return shuffledArray;
  };

  getCards(count) {
    const cards = [];

    while (count > 0) {
      cards.push(this.cards.shift());
      count--;
    }

    return cards;
  }

  isEmpty() {
    return this.cards.length === 0;
  }
}

export { Deck };
