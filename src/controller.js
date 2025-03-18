import { View } from "../html/htmlView.js";
import { Game } from "./models/game.js";
import node from "lodash";

class Controller {
  #roundNo;
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.#roundNo = 1;
  }
  beginGame() {
    this.game.enrollPlayers();

    // while (this.roundNo <= 3 && !this.game.isAWinner()) {
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

  createTakingChoices() {
    const div = document.createElement("div");
    div.id = "take-choice";
    ["one-good", "mul-good", "all-camels"].forEach((id) => {
      const button = document.createElement("button");
      button.textContent = id;
      div.appendChild(button);
    });

    document.getElementById("market").appendChild(div);
  }

  processGoodsChoice() {
    console.log("loading..................");

    const choices = {
      "one-good": this.processSingleGood.bind(this),
      "mul-good": this.processExchangeGoods.bind(this),
      "all-camels": this.game.takeAllCamels.bind(this.game),
    };
    const market = document.getElementById("market");
    market.addEventListener("click", (event) => {
      if (event.target.id in choices) {
        if (event.target.id === "all-camels") {
          console.log("all camels");

          choices[event.target.id]();
          this.processNextPlayer();
        }
        choices[event.target.id]();
      }
    });
  }

  processSelling(goods) {
    if (node.uniq(goods).length === 1) {
      const good = goods[0];
      const count = goods.length;
      if (this.game.validateSellingGoods(good, count)) {
        console.log("hurray");
        this.game.sellGoods(good, count);
        this.processNextPlayer();
      }
    }
    this.displayGame();
    this.tradeChoice();
  }

  sellGoods() {
    const goods = [];
    const market = document.getElementById("market");
    this.view.createButton(market, "sell-now", "Sell Now");
    const display = document.getElementById("display");
    display.addEventListener("click", (event) => {
      if (event.target.id === "sell-now") {
        this.processSelling(goods);
      }
      if (event.target.className === "pCards") {
        goods.push(event.target.textContent);
        event.target.remove();
      }
    });
  }

  tradeChoice() {
    const market = document.getElementById("market");
    market.addEventListener("click", (event) => {
      if (event.target.id === "take-goods") {
        this.view.createTakingChoices();
        console.log("process goods choice");

        this.processGoodsChoice();
      }
      if (event.target.id === "sell-goods") {
        this.sellGoods();
      }
    });
  }

  processNextPlayer() {
    this.game.changePlayer();
    this.executeRound();
  }

  displayGame() {
    const displayData = this.game.displayGame();
    this.view.displayGame(displayData);
  }

  executeRound() {
    this.displayGame();
    this.tradeChoice();

    if (this.game.isEndOfRound()) {
      console.log("end of round");
      const [winner, runner] = this.game.updatePlayersScore();
      console.log(winner, runner);
      // this.view.roundSummary(winner, runner);
      // this.#roundNo += 1;
    }
  }
}

const parents = ["goodsCoins", "deck", "display"].map((id) =>
  document.getElementById(id)
);

const controller = new Controller(new Game(), new View(parents));
controller.beginGame();
