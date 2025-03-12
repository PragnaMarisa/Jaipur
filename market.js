class Market {
  market = [];
  constructor(market) {
    this.market = market;
  }

  refillMarket(deck) {
    while (this.market.length < 5) {
      this.market.push(deck.shift());
    }
  }

  removeCards(count, typeOfGood) {
    for (let i = 0; i < count; i++) {
      const index = this.market.indexOf(typeOfGood);
      array.splice(index, 1);
    }
  }
}
