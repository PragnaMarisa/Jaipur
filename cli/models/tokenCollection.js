import { allGoodsTokens } from "./goodsTokens.js";

class TokenCollection {
  constructor(tokens) {
    this.tokens = tokens;
  }

  are3TokensDeprecated = () =>
    Object.values(this.tokens).filter((arr) => arr.length === 0).length >= 2;

  calculateCoinsEarned(typeOfGood, count) {
    const tokens = this.tokens[typeOfGood];
    if (!tokens) return [];
    count = count > tokens.length ? tokens.length : count;
    const earnedCoins = tokens.slice(0, count);
    this.tokens[typeOfGood] = tokens.toSpliced(0, count);
    return earnedCoins;
  }
}

export { allGoodsTokens, TokenCollection };
