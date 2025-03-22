import _ from "lodash";
class Deck {
  cards = [];

  constructor(cards) {
    this.cards = cards;
  }

  shuffle = () => {
    this.cards = _.shuffle(this.cards);
  };

  getCards(count) {
    const cards = _.chunk(this.cards, count)[0];
    this.cards = _.drop(this.cards, cards.length);
    return cards;
  }

  isEmpty() {
    return _.isEmpty(this.cards);
  }

  length() {
    return this.cards.length;
  }
}

export { Deck };
