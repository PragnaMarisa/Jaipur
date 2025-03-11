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

class leatherCard {
  toString = () => "leather";
}

class spiceCard {
  toString = () => "spice";
}

class CamelCard {
  toString = () => "camel";
}

const diamonds = Array.from({ length: 6 }, () => new DiamondCard());
const silvers = Array.from({ length: 6 }, () => new SilverCard());
const golds = Array.from({ length: 6 }, () => new GoldCard());
const clothes = Array.from({ length: 8 }, () => new ClothCard());
const spices = Array.from({ length: 8 }, () => new spiceCard());
const leathers = Array.from({ length: 10 }, () => new leatherCard());
const camels = Array.from({ length: 11 }, () => new CamelCard());

const allCards = [
  ...diamonds,
  ...silvers,
  ...golds,
  ...clothes,
  ...spices,
  ...leathers,
  ...camels,
];

class Deck {
  cards = [];
  constructor(cards) {
    this.cards = cards;
  }

  getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  shuffle = (array) => {
    const shuffledArray = [...array];
    const length = array.length;
    for (let index = length - 1; index > 0; index--) {
      const randomIndex = this.getRandom(0, index);
      const temp = shuffledArray[index];

      shuffledArray[index] = shuffledArray[randomIndex];
      shuffledArray[randomIndex] = temp;
    }

    return shuffledArray;
  };
}

export { Deck };
