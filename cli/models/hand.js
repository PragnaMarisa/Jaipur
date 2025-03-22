class Hand {
  constructor(cards) {
    this.cards = cards;
  }

  addCards(cards) {
    this.cards.push(...cards);
  }

  removeCards(index) {
    this.cards.splice(index, 1);
  }

  indexOf(good) {
    return this.cards.indexOf(good);
  }
}

export { Hand };
