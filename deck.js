class DiamondCard {
  toString = () => "diamond";
}

class SilverCard {
  toString = () => "silver";
}

class GoldCard {
  toString = () => "gold";
}

class ClothCard {
  toString = () => "cloth";
}

class LeatherCard {
  toString = () => "leather";
}

class SpiceCard {
  toString = () => "spice";
}

class CamelCard {
  toString = () => "camel";
}

const diamonds = Array.from({ length: 6 }, () => new DiamondCard());
const silvers = Array.from({ length: 6 }, () => new SilverCard());
const golds = Array.from({ length: 6 }, () => new GoldCard());
const clothes = Array.from({ length: 8 }, () => new ClothCard());
const spices = Array.from({ length: 8 }, () => new SpiceCard());
const leathers = Array.from({ length: 10 }, () => new LeatherCard());
const camels = Array.from({ length: 11 }, () => new CamelCard());

const allCards = [
  ...diamonds,
  ...silvers,
  ...golds,
  ...clothes,
  ...spices,
  ...leathers,
  ...camels,
].map((ele) => ele.toString());

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
}

export { Deck, allCards };
