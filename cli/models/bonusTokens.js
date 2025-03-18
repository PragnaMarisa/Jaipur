import { shuffle } from "../../cli/lib.js";

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

const allBonusTokens = () => ({
  3: shuffle(new Bonus3Coins().retrieveCoins()),
  4: shuffle(new Bonus4Coins().retrieveCoins()),
  5: shuffle(new Bonus5Coins().retrieveCoins()),
});

export { allBonusTokens };
