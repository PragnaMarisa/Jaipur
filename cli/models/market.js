class Market {
  marketCards = [];
  constructor(market) {
    this.marketCards = market;
  }

  refillMarket(deck) {
    while (this.marketCards.length < 5) {
      this.marketCards.push(...deck.getCards(1));
    }
  }

  removeCards(count, typeOfGood) {
    for (let i = 0; i < count; i++) {
      const index = this.marketCards.indexOf(typeOfGood);
      this.marketCards.splice(index, 1);
    }
  }

  filterCamels() {
    return [...this.marketCards].filter((ele) => ele === "camel");
  }

  filterGoods() {
    return [...this.marketCards].filter((ele) => ele !== "camel");
  }

  isPresent(good) {
    const market = new Set(this.marketCards);
    return market.has(good);
  }

  addCards(goods) {
    this.marketCards.push(...goods);
  }

  countOf(good) {
    return [...this.marketCards].filter((e) => e === good).length;
  }
}

export { Market };
