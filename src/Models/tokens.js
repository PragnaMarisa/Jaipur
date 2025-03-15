import { allGoodsTokens } from "./goodsTokens.js";

class TokenCollection {
  constructor(tokens) {
    this.tokens = tokens;
  }

  are3TokensDeprecated = () =>
    Object.values(this.tokens).filter((arr) => arr.length === 0).length >= 2;

  calculateCoinsEarned(typeOfGood, count) {
    const earnedCoins = this.tokens[typeOfGood].slice(0, count);
    this.tokens[typeOfGood] = this.tokens[typeOfGood].toSpliced(0, count);
    return earnedCoins;
  }
}

export { allGoodsTokens, TokenCollection };
