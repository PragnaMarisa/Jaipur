class Hand {
  constructor(cards) {
    this.cards = cards;
  }
}

class Camel {
  constructor(cards) {
    this.cards = cards;
  }

  removeCards() {
    this.cards.pop();
  }

  addCards(cards) {
    this.cards.push(...cards);
  }
}
class Token {
  constructor(tokens) {
    this.tokens = tokens;
  }
}

class Player {
  constructor(name) {
    this.hand;
    this.camel;
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

  addCards(goods) {
    const { hand, camels } = this.categorizeCards(goods);
    console.log(camels, hand);
    this.hand.cards.push(...hand);
    this.camel.addCards(camels);
  }

  isPresent(good) {
    const hand = new Set([...this.hand.cards, ...this.camel.cards]);
    return hand.has(good);
  }

  countOf(good) {
    return [...this.hand.cards].filter((e) => e === good).length;
  }

  removeCards(count, good) {
    for (let i = 0; i < count; i++) {
      if (good === "camel") {
        this.camel.removeCards();
        continue;
      }
      const index = this.hand.cards.indexOf(good);
      this.hand.cards.splice(index, 1);
    }
  }
}

export { Player };
