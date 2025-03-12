class DiamondTokens {
  retrieveTokens() {
    return [7, 7, 5, 5, 5];
  }
}
class SilverTokens {
  retrieveTokens() {
    return [5, 5, 5, 5, 5];
  }
}
class GoldTokens {
  retrieveTokens() {
    return [6, 6, 5, 5, 5];
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

const allTokens = {
  diamond: new DiamondTokens().retrieveTokens(),
  gold: new GoldTokens().retrieveTokens(),
  silver: new SilverTokens().retrieveTokens(),
  cloth: new ClothTokens().retrieveTokens(),
  spice: new SpiceTokens().retrieveTokens(),
  leather: new LeatherTokens().retrieveTokens(),
};

class TokenCollection {
  constructor(tokens) {
    this.tokens = tokens;
  }

  are3TokensDeprecated = () =>
    Object.values(this.tokens).filter((arr) => arr.length === 0).length >= 1;

  // tokensOf(key) {
  //   return this.tokens[key];
  // }

  calculateCoinsEarned(typeOfGood, count) {
    const earnedCoins = this.tokens[typeOfGood].slice(0, count);
    this.tokens[typeOfGood] = this.tokens[typeOfGood].toSpliced(0, count);
    return earnedCoins;
  }
}

class Bonus3Coins {
  retrieveCoins() {
    return [1, 1, 2, 3, 3, 2, 2];
  }
}
class Bonus4Coins {
  retrieveCoins() {
    return [5, 6, 6, 4, 5, 4];
  }
}
class Bonus5Coins {
  retrieveCoins() {
    return [8, 10, 8, 10, 9];
  }
}

const allBonusTokens = {
  3: new Bonus3Coins().retrieveCoins(),
  4: new Bonus4Coins().retrieveCoins(),
  5: new Bonus5Coins().retrieveCoins(),
};

export { allTokens, allBonusTokens, TokenCollection };
