class Hand {
  constructor(cards) {
    this.cards = cards;
  }

  addCards(cards) {
    this.cards.push(...cards);
  }
}

export { Hand };
