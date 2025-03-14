import { View } from "./view.js";
import { Game } from "./Models/game.js";

class Controller {
  constructor() {
    this.RoundNo = 1;
  }
  beginGame() {
    this.game = new Game();
    this.view = new View();
    this.game.enrollPlayers();
    while (this.RoundNo <= 3 && !this.game.isAWinner) {
      this.game.setUpGame();
      this.executeRound();
    }
    // implement these functions in their classes
    const [winner, runner] = this.game.fetchPlayersSummary();
    this.view.playerSummary(winner, runner);
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
      console.clear();
      const displayData = this.game.displayGame();
      this.view.displayGame(...displayData);
      const choice = this.view.tradeChoice();
      this.processTradeDecision(choice);
      this.view.displayGame(...displayData);
      this.game.changePlayer();
    }

    // implement these functions
    const [winner, runner] = this.updatePlayersScore();
    this.view.roundSummary(winner, runner);
  }
}

const controller = new Controller();

controller.beginGame();
