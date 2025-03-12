class Hand {
  constructor(cards) {
    this.cards = cards;
  }
}

class Camel {
  constructor(cards) {
    this.cards = cards;
  }
}
class Token {
  constructor(tokens) {
    this.tokens = tokens;
  }
}

class Player {
  constructor() {
    this.hand;
    this.camel;
    this.name;
  }
  enroll(name) {
    this.name = name;
  }

  categorizeCards(array) {
    const hand = [...array].filter((ele) => ele !== "camel");
    const camels = [...array].filter((ele) => ele === "camel");
    return { hand, camels };
  }

  initializeHand(array) {
    const { hand, camels } = this.categorizeCards(array);
    this.hand = new Hand(hand);
    this.camel = new Camel(camels);
    this.token = new Token([]);
  }
  hands() {
    return this.hand.cards;
  }
  camels() {
    return this.camel.cards;
  }

  calculateTotal = (score) => score.reduce((sum, ele) => sum + ele, 0);

  score() {
    return this.calculateTotal(this.token.tokens);
  }

  addTokens(tokens) {
    this.token.tokens.push(...tokens);
  }

  addGoods(good) {
    this.hand.cards.push(...good);
  }
}

export { Player };
