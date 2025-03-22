import { Game } from "./models/game.js";

class Controller {
  constructor() {
    this.RoundNo = 1;
  }
  beginGame(p1, p2) {
    this.game = new Game();
    return this.game.enrollPlayers(p1, p2);
  }

  startGame() {
    if (this.game.isAWinner()) {
      const [winner, runner] = this.game.fetchPlayersSummary();
      this.view.playerSummary(winner, runner);
    }
    this.game.setUpGame();
  }

  processSingleGood(good) {
    if (this.game.validateSingleGood(good)) {
      this.game.takeSingleGood([good]);
      return { sucess: "sucess" };
    }

    return { error: "invalid good" };
  }

  processExchangeGoods([goodsToBeGiven, goodsToBeTaken]) {
    console.log(
      "exchanginnggg",
      goodsToBeTaken,
      goodsToBeGiven,
      this.game.isAValidExchange(goodsToBeGiven, goodsToBeTaken)
    );

    if (this.game.isAValidExchange(goodsToBeGiven, goodsToBeTaken)) {
      this.game.takeSeveralGoods(goodsToBeGiven, goodsToBeTaken);
      return { sucess: "sucess" };
    }
    return { error: "not valid input" };
  }

  processAllCamels() {
    this.game.takeAllCamels();
    return { sucess: "sucess" };
  }

  processGoodsChoice(choice, data) {
    console.log("Hurray", data);

    if (choice < 3 && !data) {
      console.log("insideeeee", data);
      return choice === 2
        ? { task: "takeSeveralGoods" }
        : { task: "takeSingleGood" };
    }

    const choices = {
      1: this.processSingleGood.bind(this),
      2: this.processExchangeGoods.bind(this),
      3: this.processAllCamels.bind(this),
    };

    return choices[choice](data);
  }

  sellGoods(goodNo, count) {
    const good = this.game.goods[goodNo];
    if (this.game.validateSellingGoods(good, count)) {
      console.log("selling", good, count, "times");
      this.game.sellGoods(good, count);
      return { sucess: "sucess" };
    }

    return { error: "Invalid Option" };
  }

  processTradeDecision(choice, subchoice, data) {
    if (!(choice === 1 || choice === 2)) return { error: "Invalid Option" };

    if (choice === 1) {
      console.log("taking goods");
      if ([1, 2, 3].includes(subchoice))
        return this.processGoodsChoice(subchoice, data);
      return { task: "takeGoods" };
    } else {
      if (subchoice) return this.sellGoods(...subchoice);
      return { task: "sellGoods" };
    }
  }

  displayGame() {
    const displayData = this.game.displayGame();
    return displayData;
  }

  changePlayer() {
    this.game.changePlayer();
  }

  executeRound() {
    if (this.game.isEndOfRound()) {
      const [winner, runner] = this.game.updatePlayersScore();
      this.view.roundSummary(winner, runner);
    }
  }
}

export { Controller };
