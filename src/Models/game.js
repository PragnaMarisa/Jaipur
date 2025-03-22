import { Deck } from "./deck.js";
import { allCards } from "./cards.js";
import { allGoodsTokens, TokenCollection } from "./tokenCollection.js";
import { Market } from "./market.js";
import { Player } from "./player.js";
import { allBonusTokens } from "./bonusTokens.js";
import _ from "lodash";

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
    this.currentPlayerNo = 0;
    this.roundNo = 0;
  }

  changePlayer = () => {
    this.currentPlayerNo = (this.currentPlayerNo + 1) % 2;
    this.currentPlayer = this.players[this.currentPlayerNo];
    this.anotherPlayer = this.players[(this.currentPlayerNo + 1) % 2];
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
    this.validateResults(noOfCamels, "camelToken", 5);
    return this.detailsOfPlayers(this.validateResults(scores, "excellence", 1));
  }

  isAWinner() {
    return (
      this.players.map((player) => player.excellence).includes(2) &&
      this.roundNo <= 3
    );
  }

  isHandInLimit(extra = 0) {
    return this.currentPlayer.hand.cards.length + extra < 8;
  }

  validateIfPremium(good, count) {
    const premium = new Set(["gold", "diamond", "silver"]);
    return premium.has(good) ? count > 1 : true;
  }

  areExchangingSameGoods(goodsToBeGiven, goodsToBeTaken) {
    return _.intersection(goodsToBeGiven, goodsToBeTaken).length === 0;
  }

  validateCountOfGoodsInHands(goodsToBeGiven) {
    const camels = goodsToBeGiven.filter((ele) => ele === "camel");
    return this.isHandInLimit(camels.length);
  }

  validateCountOfGoodsInExchange(goodsToBeGiven, goodsToBeTaken) {
    const occurencesOfGiven = _.countBy(goodsToBeGiven);
    const occurencesOfTaken = _.countBy(goodsToBeTaken);

    const areValidHand = Object.keys(occurencesOfGiven).every(
      (good) => this.currentPlayer.countOf(good) >= occurencesOfGiven[good]
    );
    const areValidMarket = Object.keys(occurencesOfTaken).every(
      (good) => this.market.countOf(good) >= occurencesOfTaken[good]
    );

    return areValidHand && areValidMarket;
  }

  isAValidExchange(goodsToBeGiven, goodsToBeTaken) {
    const isValidExchange = _.every([
      this.areValidGoods(goodsToBeTaken),
      this.areGoodsPresentInMarket(goodsToBeTaken),
      this.areGoodsPresentInPlayer(goodsToBeGiven),
      this.areExchangingSameGoods(goodsToBeGiven, goodsToBeTaken),
      goodsToBeGiven.length === goodsToBeTaken.length,
      goodsToBeGiven.length > 1,
      this.validateCountOfGoodsInHands(goodsToBeGiven),
      this.validateCountOfGoodsInExchange(goodsToBeGiven, goodsToBeTaken),
    ]);
    return isValidExchange;
  }

  createInstances() {
    this.deck = new Deck(allCards);
    this.deck.shuffle();
    this.market = new Market([
      "camel",
      "camel",
      "camel",
      ...this.deck.getCards(2),
    ]);

    this.tokenCollection = new TokenCollection({ ...allGoodsTokens });
  }

  setUpGame() {
    this.roundNo += 1;
    this.reset();
    this.createInstances();
    this.tokens = { ...allGoodsTokens };
    this.marketCards = this.market.marketCards;
    this.tokens = this.tokenCollection.tokens;
    this.bonusTokens = { ...allBonusTokens() };
    this.initialisePlayerCards();
    this.camelToken = "camelToken";
    this.currentPlayer = this.players[this.currentPlayerNo];
    this.anotherPlayer = this.players[(this.currentPlayerNo + 1) % 2];
  }

  reset() {
    this.deck = [];
    this.market = [];
    this.tokens = [];
    this.bonusTokens = [];
    this.players.map((player) => player.reset());
  }

  displayGame() {
    const coinsPart = {
      goods: this.tokens,
      bonus: [3, 4, 5].map((index) => this.bonusTokens[index].length),
      market: this.marketCards,
    };

    const currentPlayer = {
      name: this.currentPlayer.name,
      score: this.currentPlayer.score(),
      hands: this.currentPlayer.hands(),
      camels: this.currentPlayer.camels(),
    };

    const anotherPlayer = {
      name: this.anotherPlayer.name,
      score: this.anotherPlayer.score(),
      hands: this.anotherPlayer.hands(),
      camels: this.anotherPlayer.camels(),
    };

    return { coinsPart, currentPlayer, anotherPlayer };
  }

  enrollPlayers(p1, p2) {
    this.players = [new Player(p1), new Player(p2)];
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
    this.currentPlayer.addCards(good);
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
      this.currentPlayer.countOf(good) >= count &&
      this.isValidGood(good) &&
      this.validateIfPremium(good, count)
    );
  }

  sellGoods = (typeOfGood, count) => {
    const tokensEarned = this.tokenCollection.calculateCoinsEarned(
      typeOfGood,
      count
    );

    this.currentPlayer.addTokens(tokensEarned);
    this.currentPlayer.removeCards(count, typeOfGood);
    if (count > 2) {
      const bonus = [this.bonusTokens[count].shift()];
      if (bonus) this.currentPlayer.addBonus(bonus);
    }
  };

  detailsOfPlayers(players) {
    return players.map((player, index) => {
      if (index < 2) return this.players[0].detailsOfPlayer(player);
      return player;
    });
  }

  validateTie(player1, player2) {
    const bonusCoinsCount = [player1.countBonus(), player2.countBonus()];
    console.log(bonusCoinsCount, "bonusCount");

    const [_, __, tie] = this.validateResults(bonusCoinsCount, "excellence", 1);
    if (tie) return [_, __, tie];

    const tokenCount = [player1.countTokens(), player2.countTokens()];
    console.log(tokenCount, "tokenCount");
    const result = this.validateResults(tokenCount, "excellence", 1);
    if (result[2]) return result;
    console.log("Hoping to be tie");

    return [player1, player2, "tie"];
  }

  validateResults([score1, score2], field, value) {
    const [palyer1, player2] = this.players;

    if (score1 === score2) {
      return field === "camelToken"
        ? this.players
        : this.validateTie(palyer1, player2);
    }

    const [winner, _] =
      score1 > score2 ? [palyer1, player2] : [player2, palyer1];

    winner[field] += value;
    return [winner, _];
  }

  fetchPlayersSummary() {
    const excellecnce = this.players.map((player) => player.excellence);
    return this.detailsOfPlayers(this.validateResults(excellecnce));
  }
}
export { Game };
