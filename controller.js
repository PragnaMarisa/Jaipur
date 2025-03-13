import { View } from "./view.js";
import { Game } from "./Models/game.js";

class Controller {
  beginGame() {
    this.game = new Game();
    this.view = new View();
    this.game.enrollPlayers();
    this.game.setUpGame();
    this.executeRound();
  }

  processSingleGood() {
    const good = this.view.takeSingleGood();

    if (this.game.isValidGood(good)) return this.game.takeSingleGood([good]);
    return this.processSingleGood();
  }

  processExchangeGoods() {
    const [goodsToBeGiven, goodsToBeTaken] = this.view.takeSeveralGoods();

    if (this.game.isAValidExchange(goodsToBeGiven, goodsToBeTaken)) {
      return this.game.takeSeveralGoods(goodsToBeGiven, goodsToBeTaken);
    }
    return this.processExchangeGoods();
  }
  processGoodsChoice(choice) {
    if (choice === 1) {
      return this.processSingleGood();
    } else if (choice === 2) {
      return this.processExchangeGoods();
    } else {
      this.game.takeAllCamels();
    }
  }

  processTradeDecision(choice) {
    if (choice === 1) {
      const choice = this.view.takeGoods(this.game.goods);
      if (!(choice > 0 && choice < 4)) return this.takeGoods();
      return this.processGoodsChoice(choice);
    } else {
      const [goodNo, count] = this.view.sellGoods();
      const good = this.game.goods[goodNo];
      if (this.game.isValidGood(good)) return this.game.sellGoods(good, count);
      return this.view.takeGoods();
    }
  }

  executeRound() {
    while (!this.game.isEndOfRound()) {
      const displayData = this.game.displayGame();
      this.view.displayGame(...displayData);
      const choice = this.view.tradeChoice();
      this.processTradeDecision(choice);
    }
  }
}

const controller = new Controller();

controller.beginGame();
