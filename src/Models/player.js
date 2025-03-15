import { Hand } from "./hand.js";
import { Camel } from "./camel.js";
import { Token } from "./token.js";

class Player {
  constructor(name) {
    this.hand;
    this.camel;
    this.name = name;
    this.excellence = 0;
    this.playerToken = 0;
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

  score() {
    return this.token.calculateTotal();
  }

  addTokens(tokens) {
    this.token.addToken(tokens);
  }

  addCards(goods) {
    const { hand, camels } = this.categorizeCards(goods);
    this.camel.addCards(camels);
    this.hand.addCards(hand);
  }

  isPresent(good) {
    const hand = new Set([...this.hand.cards, ...this.camel.cards]);
    return hand.has(good);
  }

  countOf(good) {
    return [...this.hand.cards, ...this.camel.cards].filter((e) => e === good)
      .length;
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
