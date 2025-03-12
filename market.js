class Market {
  marketCards = [];
  constructor(market) {
    this.marketCards = market;
  }

  refillMarket(deck) {
    while (this.marketCards.length < 5) {
      this.marketCards.push(deck.shift());
    }
  }

  removeCards(count, typeOfGood) {
    for (let i = 0; i < count; i++) {
      const index = this.marketCards.indexOf(typeOfGood);
      array.splice(index, 1);
    }
  }
}

export { Market };
