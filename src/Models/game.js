import { Deck } from "./deck.js";
import { allCards } from "./cards.js";
import { allGoodsTokens, TokenCollection } from "./tokenCollection.js";
import { Market } from "./market.js";
import { Player } from "./player.js";
import { allBonusTokens } from "./bonusTokens.js";

class Game {
  goods = {
    1: "diamond",
    2: "gold",
    3: "silver",
    4: "cloth",
    5: "spice",
    6: "leather",
  };
  constructor() {
    this.deck = [];
    this.market = [];
    this.tokens = [];
    this.bonusTokens = [];
    this.currentPlayerNo = 0;
  }

  changePlayer = () => {
    this.currentPlayerNo = (this.currentPlayerNo + 1) % 2;
    this.currentPlayer = this.players[this.currentPlayerNo];
  };

  initialisePlayerCards() {
    this.players.map((player) => player.initializeHand(this.deck.getCards(5)));
  }

  isPresentInMarket(good) {
    return this.market.isPresent(good);
  }

  isValidGood(good) {
    const goods = new Set(Object.values(this.goods));
    return goods.has(good);
  }

  areValidGoods(goods) {
    return goods.every((good) => this.isValidGood(good));
  }

  areGoodsPresentInMarket(goods) {
    return goods.every((good) => this.market.isPresent(good));
  }
  areGoodsPresentInPlayer(goods) {
    return goods.every((good) => this.currentPlayer.isPresent(good));
  }

  updatePlayersScore() {
    const scores = this.players.map((player) => player.score());
    const noOfCamels = this.players.map((player) => player.camel.cards.length);
    const [winner, _, tie] = this.validateResults(noOfCamels);
    if (!tie) winner.camelToken = 5;
    return this.detailsOfPlayers(this.validateResults(scores));
  }

  isAWinner() {
    return this.players.map((player) => player.excellence).includes(2);
  }

  isHandInLimit(extra = 0) {
    return this.currentPlayer.hand.cards.length + extra < 8;
  }

  validateIfPremium(good, count) {
    if (["gold", "diamond", "silver"].includes(good)) {
      return count > 1;
    }
    return true;
  }

  areExchangingSameGoods(goodsToBeGiven, goodsToBeTaken) {
    const set1 = new Set(goodsToBeGiven);
    const set2 = new Set(goodsToBeTaken);
    return set1.intersection(set2).size === 0;
  }

  validateCountOfGoodsInHands(goodsToBeGiven) {
    const camels = goodsToBeGiven.filter((ele) => ele === "camel");
    return this.isHandInLimit(camels.length);
  }

  isAValidExchange(goodsToBeGiven, goodsToBeTaken) {
    return (
      this.areValidGoods(goodsToBeTaken) &&
      this.areGoodsPresentInMarket(goodsToBeTaken) &&
      this.areGoodsPresentInPlayer(goodsToBeGiven) &&
      this.areExchangingSameGoods(goodsToBeGiven, goodsToBeTaken) &&
      goodsToBeGiven.length === goodsToBeTaken.length &&
      goodsToBeGiven.length > 1 &&
      this.validateCountOfGoodsInHands(goodsToBeGiven)
    );
  }

  createInstances() {
    this.deck = new Deck(allCards);
    this.deckCards = this.deck.shuffle();
    this.market = new Market([
      "camel",
      "camel",
      "camel",
      ...this.deck.getCards(2),
    ]);

    this.tokenCollection = new TokenCollection({ ...allGoodsTokens });
  }

  setUpGame() {
    this.createInstances();
    this.tokens = { ...allGoodsTokens };
    this.marketCards = this.market.marketCards;
    this.tokens = this.tokenCollection.tokens;
    this.bonusTokens = { ...allBonusTokens() };
    this.initialisePlayerCards();
    this.currentPlayer = this.players[this.currentPlayerNo];
  }

  displayGame() {
    return [
      this.tokens,
      this.marketCards,
      this.currentPlayer.name,
      this.currentPlayer.score(),
      this.currentPlayer.hands(),
      this.currentPlayer.camels(),
    ];
  }

  enrollPlayers() {
    this.players = [new Player("player1"), new Player("player2")];
  }

  isEndOfRound() {
    return this.tokenCollection.are3TokensDeprecated() || this.deck.isEmpty();
  }

  validateSingleGood(good) {
    return (
      this.isValidGood(good) &&
      this.isPresentInMarket(good) &&
      this.isHandInLimit(1)
    );
  }

  takeSingleGood(good) {
    this.currentPlayer.addCards(...good);
    this.market.removeCards(1, ...good);
    this.market.refillMarket(this.deck);
  }

  takeSeveralGoods(goodsToBeGiven, goodsToBeTaken) {
    for (let index = 0; index < goodsToBeGiven.length; index++) {
      this.market.removeCards(1, goodsToBeTaken[index]);
      this.currentPlayer.removeCards(1, goodsToBeGiven[index]);
    }

    this.currentPlayer.addCards(goodsToBeTaken);
    this.market.addCards(goodsToBeGiven);
  }

  takeAllCamels() {
    const camelsInMarket = this.market.filterCamels();
    this.market.removeCards(camelsInMarket.length, "camel");
    this.currentPlayer.addCards(camelsInMarket);
    this.market.refillMarket(this.deck);
  }

  validateSellingGoods(good, count) {
    return (
      this.currentPlayer.countOf(good) === count &&
      this.isValidGood(good) &&
      this.validateIfPremium(good, count)
    );
  }

  sellGoods = (typeOfGood, count) => {
    const tokensEarned = this.tokenCollection.calculateCoinsEarned(
      typeOfGood,
      count
    );
    console.log(tokensEarned, "tokens earned");

    this.currentPlayer.addTokens(tokensEarned);
    this.currentPlayer.removeCards(count, typeOfGood);
    if (count > 2)
      this.currentPlayer.addTokens([this.bonusTokens[count].shift()]);
  };

  detailsOfPlayers(players) {
    return players.map((player, index) => {
      if (index < 2) return this.detailsOfPlayer(player);
      return player;
    });
  }

  detailsOfPlayer(player) {
    return [player.name, player.score, player.excellence, player.camelToken];
  }

  validateResults(result) {
    const [score1, score2] = result;
    const palyer1 = this.players[0];
    const player2 = this.players[1];

    if (score1 === score2) {
      return [palyer1, player2, "tie"];
    }

    const [winner, runner] =
      score1 > score2 ? [palyer1, player2] : [player2, palyer1];
    winner.excellence += 1;
    return [winner, runner];
  }

  fetchPlayersSummary() {
    const excellecnce = this.players.map((player) => player.excellence);
    return this.validateResults(excellecnce);
  }
}
export { Game };
