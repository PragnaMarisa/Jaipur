class Hand {
  constructor(hand) {
    this.hand = hand;
  }
}

class Camel {
  constructor(camels) {
    this.camels = camels;
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
  }
}

export { Player };
