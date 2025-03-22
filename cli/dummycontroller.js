// import { View } from "./view.js";
import { Game } from "./models/game.js";

class Controller {
  constructor() {
    this.RoundNo = 1;
  }
  beginGame(p1, p2) {
    this.game = new Game();
    // this.view = new View();
    this.game.enrollPlayers(p1, p2);

    while (!this.game.isAWinner()) {
      this.game.setUpGame();
      this.executeRound();
    }

    const [winner, runner] = this.game.fetchPlayersSummary();
    this.view.playerSummary(winner, runner);
  }

  processSingleGood() {
    const good = this.view.takeSingleGood();

    if (this.game.validateSingleGood(good)) {
      return this.game.takeSingleGood([good]);
    }

    return this.processTradeDecision();
  }

  processExchangeGoods() {
    const [goodsToBeGiven, goodsToBeTaken] = this.view.takeSeveralGoods();

    if (this.game.isAValidExchange(goodsToBeGiven, goodsToBeTaken)) {
      return this.game.takeSeveralGoods(goodsToBeGiven, goodsToBeTaken);
    }
    return this.processTradeDecision();
  }

  processGoodsChoice(choice) {
    const choices = {
      1: this.processSingleGood.bind(this),
      2: this.processExchangeGoods.bind(this),
      3: this.game.takeAllCamels.bind(this.game),
    };

    return choices[choice]();
  }

  sellGoods() {
    const [goodNo, count] = this.view.sellGoods();
    const good = this.game.goods[goodNo];
    if (this.game.validateSellingGoods(good, count)) {
      return this.game.sellGoods(good, count);
    }

    return this.processTradeDecision();
  }

  processTradeDecision() {
    const choice = this.view.tradeChoice();

    if (!(choice === 1 || choice === 2)) return this.processTradeDecision();

    if (choice === 1) {
      const choice = this.view.takeGoods(this.game.goods);
      if ([1, 2, 3].includes(choice)) return this.processGoodsChoice(choice);
      return this.processTradeDecision(choice);
    } else {
      return this.sellGoods();
    }
  }

  executeRound() {
    while (!this.game.isEndOfRound()) {
      // console.clear();
      const displayData = this.game.displayGame();
      console.log(displayData);

      // this.view.displayGame(...displayData);
      this.processTradeDecision();
      // this.view.displayGame(...displayData);
      this.game.changePlayer();
    }

    const [winner, runner] = this.game.updatePlayersScore();
    this.view.roundSummary(winner, runner);
  }
}

export { Controller };

// const controller = new Controller();

// controller.beginGame();
