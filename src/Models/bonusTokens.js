import _ from "lodash";

class Bonus3Coins {
  retrieveCoins() {
    return _.shuffle([1, 1, 2, 3, 3, 2, 2]);
  }
}
class Bonus4Coins {
  retrieveCoins() {
    return _.shuffle([5, 6, 6, 4, 5, 4]);
  }
}
class Bonus5Coins {
  retrieveCoins() {
    return _.shuffle([8, 10, 8, 10, 9]);
  }
}

const allBonusTokens = () => ({
  3: new Bonus3Coins().retrieveCoins(),
  4: new Bonus4Coins().retrieveCoins(),
  5: new Bonus5Coins().retrieveCoins(),
});

export { allBonusTokens };
