import { View } from "./view.js";
import { Game } from "./game.js";

class Controller {
  beginGame() {
    this.game = new Game();
    this.view = new View();
    this.game.enrollPlayers();
    this.executeRound();
  }

  processGoodsChoice(choice) {
    switch (choice) {
      case 1: {
        const goodName = view.takeSingleGood();
        game.takeSingleGood([goodName]);
        break;
      }
      case 2: {
        const data = view.takeSeveralGoods();
        game.takeSeveralGoods(...data);
        break;
      }
      case 3: {
        game.takeAllCamels();
      }
    }
  }

  processTradeDecision(choice) {
    if (choice === 1) {
      const choice = view.takeGoods(game.goods);
      this.processGoodsChoice(choice);
    } else {
      const data = view.sellGoods(game.goods);
      game.sellGoods(...data);
    }
  }

  executeRound() {
    while (!this.game.isEndOfRound()) {
      game.setUpGame();
      const displayData = game.displayGame();
      view.displayGame(...displayData);
      const choice = view.tradeChoice();
      this.processTradeDecision(choice);
    }
  }
}

const controller = new Controller();

controller.beginGame();
