import { View } from "../html/htmlView.js";
import { Game } from "./models/game.js";
import ll from "lodash";

class Controller {
  #roundNo;
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.#roundNo = 1;
  }

  beginGame() {
    this.game.enrollPlayers();
    this.game.setUpGame();
    this.executeRound();
  }

  handleMarketClick = (event) => {
    const actions = {
      "take-goods": () => {
        this.view.createTakingChoices();
        this.processGoodsChoice();
      },
      "sell-goods": this.sellGoods.bind(this),
    };
    if (actions[event.target.id]) actions[event.target.id]();
  };

  handleSingleGoodClick(event) {
    if (event.target.className === "market-card") {
      const good = event.target.textContent;

      if (this.game.validateSingleGood(good)) {
        event.target.remove();
        this.game.takeSingleGood([good]);
        document.getElementById("take-choice").remove();
        this.processNextPlayer();
      }
    }
  }

  processSingleGood() {
    const market = document.getElementById("market");
    market.removeEventListener("click", this.handleSingleGoodClick.bind(this));
    market.addEventListener("click", this.handleSingleGoodClick.bind(this));
  }

  processExchangeGoods() {
    const [goodsToBeGiven, goodsToBeTaken] = this.view.takeSeveralGoods();

    if (this.game.isAValidExchange(goodsToBeGiven, goodsToBeTaken)) {
      this.game.takeSeveralGoods(goodsToBeGiven, goodsToBeTaken);
    } else {
      this.processTradeDecision();
    }
  }

  processGoodsChoice() {
    const choices = {
      "one-good": this.processSingleGood.bind(this),
      "mul-good": this.processExchangeGoods.bind(this),
      "all-camels": () => {
        this.game.takeAllCamels();
        this.processNextPlayer();
        document.getElementById("take-choice").remove();
      },
    };

    const market = document.getElementById("market");
    market.addEventListener("click", (event) => {
      if (choices[event.target.id]) choices[event.target.id]();
    });
  }

  processSelling(goods) {
    if (ll.uniq(goods).length === 1) {
      const good = goods[0];
      const count = goods.length;
      if (this.game.validateSellingGoods(good, count)) {
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

    document.getElementById("display").addEventListener("click", (event) => {
      if (event.target.id === "sell-now") {
        event.target.remove();
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
    market.removeEventListener("click", this.handleMarketClick);
    market.addEventListener("click", this.handleMarketClick);
  }

  processNextPlayer() {
    this.game.changePlayer();
    this.executeRound();
  }

  displayGame() {
    this.view.displayGame(this.game.displayGame());
  }

  executeRound() {
    this.displayGame();
    this.tradeChoice();

    if (this.game.isEndOfRound()) {
      const [winner, runner] = this.game.updatePlayersScore();
      console.log(winner, runner);
    }
  }
}

const parents = ["goodsCoins", "deck", "display"].map((id) =>
  document.getElementById(id)
);

const controller = new Controller(new Game(), new View(parents));
controller.beginGame();
