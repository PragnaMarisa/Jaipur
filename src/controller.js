import { View } from "../html/htmlView.js";
import { Game } from "./Models/game.js";
// import node from "lodash";

class Controller {
  constructor() {
    this.RoundNo = 1;
  }
  beginGame() {
    this.game = new Game();
    const parents = ["goodsCoins", "deck", "display"].map((id) =>
      document.getElementById(id)
    );
    this.view = new View(parents);
    this.game.enrollPlayers();

    // while (this.RoundNo <= 3 && !this.game.isAWinner()) {
    this.game.setUpGame();
    this.executeRound();
    // }

    // const [winner, runner] = this.game.fetchPlayersSummary();
    // this.view.playerSummary(winner, runner);
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

  sellGoods(goodNo, count) {
    const good = this.game.goods[goodNo];
    if (this.game.validateSellingGoods(good, count)) {
      return this.game.sellGoods(good, count);
    }
    console.log("nothing more");
  }

  processTradeDecision(tChoice, eChoice, data) {
    console.log("called processTradeDecision");

    if (tChoice === 1) {
      if ([1, 2, 3].includes(eChoice)) return this.processGoodsChoice(eChoice);
    } else {
      // const counts = node.countBy(data);
      console.log(data);

      return this.sellGoods(
        Object.keys(counts)[0],
        counts[Object.keys(counts)[0]]
      );
    }
  }

  tradeChoice() {
    const market = document.getElementById("market");
    console.log("tradeChoice");

    market.addEventListener("click", (event) => {
      if (event.target.id === "take-goods") {
        return this.createTakingChoices();
      }
      if (event.target.id === "sell-goods") {
        const x = this.view.sellGoods();
        console.log(x);

        return [2, 0, x];
      }
    });
  }

  displayGame() {
    const displayData = this.game.displayGame();
    this.view.displayGame(displayData);
  }

  executeRound() {
    // while (!this.game.isEndOfRound()) {
    // console.clear();
    this.displayGame();
    const market = document.getElementById("market");
    market.addEventListener("click", (event) => {
      if (["sell-goods"].includes(event.target.id)) {
        const [choice, option, data] = this.tradeChoice();
        console.log("readyy?");
        console.log(choice, option, data);
        console.log("the end");
      }
    });

    // this.processTradeDecision(choice, option, data);
    // this.game.changePlayer();
    // this.view.displayGame(displayData);
    // }

    // const [winner, runner] = this.game.updatePlayersScore();
    // this.view.roundSummary(winner, runner);
    // this.RoundNo += 1;
  }
}

const controller = new Controller();

controller.beginGame();
