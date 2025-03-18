class DiamondTokens {
  retrieveTokens() {
    return [7, 7, 5, 5, 5];
  }
}
class SilverTokens {
  retrieveTokens() {
    return [5, 5];
    // return [5, 5, 5, 5, 5];
  }
}
class GoldTokens {
  retrieveTokens() {
    return [6, 6];
    // return [6, 6, 5, 5, 5];
  }
}
class ClothTokens {
  retrieveTokens() {
    return [5, 3, 3, 2, 2, 1, 1];
  }
}
class SpiceTokens {
  retrieveTokens() {
    return [5, 3, 3, 2, 2, 1, 1];
  }
}
class LeatherTokens {
  retrieveTokens() {
    return [4, 3, 2, 1, 1, 1, 1, 1, 1];
  }
}

const allGoodsTokens = {
  diamond: new DiamondTokens().retrieveTokens(),
  gold: new GoldTokens().retrieveTokens(),
  silver: new SilverTokens().retrieveTokens(),
  cloth: new ClothTokens().retrieveTokens(),
  spice: new SpiceTokens().retrieveTokens(),
  leather: new LeatherTokens().retrieveTokens(),
};

export { allGoodsTokens };
