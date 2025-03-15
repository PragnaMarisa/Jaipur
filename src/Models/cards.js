class DiamondCard {
  toString = () => "diamond";
}

class SilverCard {
  toString = () => "silver";
}

class GoldCard {
  toString = () => "gold";
}

class ClothCard {
  toString = () => "cloth";
}

class LeatherCard {
  toString = () => "leather";
}

class SpiceCard {
  toString = () => "spice";
}

class CamelCard {
  toString = () => "camel";
}

const diamonds = Array.from({ length: 6 }, () => new DiamondCard());
const silvers = Array.from({ length: 6 }, () => new SilverCard());
const golds = Array.from({ length: 6 }, () => new GoldCard());
const clothes = Array.from({ length: 8 }, () => new ClothCard());
const spices = Array.from({ length: 8 }, () => new SpiceCard());
const leathers = Array.from({ length: 10 }, () => new LeatherCard());
const camels = Array.from({ length: 8 }, () => new CamelCard());

const allCards = [
  ...diamonds,
  ...silvers,
  ...golds,
  ...clothes,
  ...spices,
  ...leathers,
  ...camels,
].map((ele) => ele.toString());

export { allCards };
