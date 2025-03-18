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

export { Camel };
