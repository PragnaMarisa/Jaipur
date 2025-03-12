import { Deck, allCards } from "./deck.js";
import { allTokens, allBonusTokens, TokenCollection } from "./tokens.js";
import { Market } from "./market.js";
import { Player } from "./player.js";
import { View } from "./view.js";
import { shuffle, removeCards } from "./lib.js";

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

  createInstances() {
    this.deck = new Deck(allCards);
    this.deckCards = this.deck.shuffle();
    this.market = new Market(this.deck.getCards(5));
    this.tokenCollection = new TokenCollection({ ...allTokens });
  }

  setUpGame() {
    this.createInstances();
    this.tokens = { ...allTokens };
    this.marketCards = this.market.marketCards;
    this.tokens = this.tokenCollection.tokens;
    this.bonusTokens = { ...allBonusTokens };
    this.initialisePlayerCards();
    this.currentPlayer = this.players[this.currentPlayerNo];
  }

  displayGame() {
    return [
      this.tokens,
      this.marketCards,
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

  takeSingleGood(good) {
    this.currentPlayer.addGoods([...good]);
    this.market.removeCards(1, good);
    this.market.refillMarket(this.deck);
  }

  exchangeGoods(goodsToBeGiven, goodsToBeTaken) {
    for (let i = 0; i < goodsToBeGiven.length; i++) {
      const indexM = this.market.indexOf(goodsToBeTaken[i]);
      const indexH = this.fetchPlayerData("hand").indexOf(goodsToBeGiven[i]);
      [this.market[indexM], this.fetchPlayerData("hand")[indexH]] = [
        this.fetchPlayerData("hand")[indexH],
        this.market[indexM],
      ];
    }

    // if they both arrays are not of same length then ask again.
  }

  takeSeveralGoods() {
    let goodsToBeTaken = prompt(this.prompts.severalGoods[0]);
    goodsToBeTaken = goodsToBeTaken.split(" ");
    let goodsToBeGiven = prompt(this.prompts.severalGoods[1]);
    goodsToBeGiven = goodsToBeGiven.split(" ");
    this.exchangeGoods(goodsToBeGiven, goodsToBeTaken);
  }

  takeAllCamels() {
    const camels = [...this.market].filter((ele) => ele === "camels");
    this.removeCards(this.market, camels.length, "camels");
    this.fetchPlayerData("hand").push(...camels);
    this.refillMarket();
  }

  sellGoods = (typeOfGood, count) => {
    const tokensEarned = this.tokenCollection.calculateCoinsEarned(
      typeOfGood,
      count
    );

    this.currentPlayer.addTokens(tokensEarned);
    removeCards(this.currentPlayer.hands(), count, typeOfGood);
    if (count > 2)
      this.currentPlayer.addTokens([this.bonusTokens[count].shift()]);
  };
}

export { Game };
