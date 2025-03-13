import { Deck, allCards } from "./deck.js";
import { allTokens, allBonusTokens, TokenCollection } from "./tokens.js";
import { Market } from "./market.js";
import { Player } from "./player.js";
import { shuffle, removeCards } from "../lib.js";

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
  areGoodsPresentInHand(goods) {
    return goods.every((good) => this.currentPlayer.isPresent(good));
  }

  isAValidExchange(goodsToBeGiven, goodsToBeTaken) {
    return (
      this.areValidGoods(goodsToBeTaken) &&
      this.areGoodsPresentInMarket(goodsToBeTaken) &&
      this.areGoodsPresentInHand(goodsToBeGiven) &&
      goodsToBeGiven.length === goodsToBeTaken.length
    );
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
    this.currentPlayer.addCards([...good]);
    this.market.removeCards(1, good);
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
    this.market.removeCards(camelsInMarket.length, "camels");
    this.currentPlayer.addCards(camelsInMarket);
    this.market.refillMarket(this.deck);
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

// const game = new Game();
// const view = new View();

// game.enrollPlayers();
// game.setUpGame();
// while (!game.isEndOfRound()) {
//   const displayData = game.displayGame();
//   view.displayGame(...displayData);

//   const choice = view.tradeChoice();

//   if (choice === 1) {
//     const choice = view.takeGoods(game.goods);
//     switch (choice) {
//       case 1: {
//         const goodName = view.takeSingleGood();
//         game.takeSingleGood([goodName]);
//         break;
//       }
//       case 2: {
//         const data = view.takeSeveralGoods();
//         game.takeSeveralGoods(...data);
//         break;
//       }
//       case 3: {
//         game.takeAllCamels();
//       }
//     }
//   } else {
//     const data = view.sellGoods(game.goods);
//     game.sellGoods(...data);
//   }
// }

export { Game };
