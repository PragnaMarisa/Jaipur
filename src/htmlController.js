import { View } from "../html/htmlView.js";
import { Game } from "../cli/models/game.js";
import ll from "lodash";

class Controller {
  #roundNo;
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.#roundNo = 1;
    this.game.enrollPlayers();
  }

  beginGame() {
    this.game.setUpGame();
    this.executeRound();

    if (this.#roundNo <= 3 && this.game.isAWinner()) {
      const [winner, runner] = this.game.fetchPlayersSummary();
      console.log(winner, runner);
    }
  }

  handleMarketClick = (event) => {
    const actions = {
      "take-goods": () => {
        this.clearEventListeners();
        document.getElementById("nav").innerHTML = "";
        this.view.createTakingChoices();
        this.processGoodsChoice();
      },
      "sell-goods": () => {
        this.clearEventListeners();
        this.sellGoods();
      },
    };
    if (actions[event.target.id]) actions[event.target.id]();
  };

  handleSingleGoodClick = (event) => {
    if (event.target.className === "market-card") {
      const good = event.target.textContent;

      if (this.game.validateSingleGood(good)) {
        event.target.remove();
        this.game.takeSingleGood([good]);
        document.getElementById("nav").innerHTML = "";
        this.processNextPlayer();
      }
      this.executeRound();
    }
  };

  processSingleGood() {
    const market = document.getElementById("market");
    // market.removeEventListener("click", this.handleSingleGoodClick);
    market.addEventListener("click", this.handleSingleGoodClick);
  }

  exchangeGoodsHandler = (event, goodsToBeGiven, goodsToBeTaken) => {
    if (event.target.className === "pCards") {
      goodsToBeGiven.push(event.target.textContent);
      event.target.remove();
    }
    if (event.target.className === "market-card") {
      goodsToBeTaken.push(event.target.textContent);
      event.target.remove();
    }
    if (event.target.id === "trade") {
      if (this.game.isAValidExchange(goodsToBeGiven, goodsToBeTaken)) {
        this.game.takeSeveralGoods(goodsToBeGiven, goodsToBeTaken);
        document.getElementById("nav").innerHTML = "";
        this.processNextPlayer();
      }
      this.executeRound();
    }
  };

  processExchangeGoods() {
    const goodsToBeGiven = [];
    const goodsToBeTaken = [];
    const nav = document.getElementById("nav");
    nav.innerHTML = "";
    this.view.createButton(nav, "trade", "Trade");
    const display = document.getElementById("display");

    this.boundExchangeGoodsHandler = (event) =>
      this.exchangeGoodsHandler(event, goodsToBeGiven, goodsToBeTaken);
    display.addEventListener("click", this.boundExchangeGoodsHandler);
  }

  processGoodsChoice() {
    const choices = {
      "one-good": this.processSingleGood.bind(this),
      "mul-good": this.processExchangeGoods.bind(this),
      "all-camels": () => {
        this.game.takeAllCamels();
        document.getElementById("nav").innerHTML = "";
        this.processNextPlayer();
      },
    };
    const market = document.getElementById("market");
    this.boundMarketHandler = (event) => {
      if (choices[event.target.id]) choices[event.target.id]();
    };
    market.addEventListener("click", this.boundMarketHandler);
  }

  processSelling(goods) {
    if (ll.uniq(goods).length === 1) {
      const good = goods[0];
      const count = goods.length;
      if (this.game.validateSellingGoods(good, count)) {
        this.game.sellGoods(good, count);
        document.getElementById("nav").innerHTML = "";
        this.processNextPlayer();
      }
    }
    this.executeRound();
  }

  sellHandler = (event, goods) => {
    if (event.target.id === "sell-now") {
      event.target.remove();
      this.clearEventListeners();
      this.processSelling(goods);
    }
    if (event.target.className === "pCards") {
      goods.push(event.target.textContent);
      event.target.remove();
    }
  };

  sellGoods() {
    const goods = [];
    const nav = document.getElementById("nav");
    nav.innerHTML = "";
    this.view.createButton(nav, "sell-now", "Sell Now");
    const display = document.getElementById("display");
    this.boundSellHandler = (event) => this.sellHandler(event, goods);
    display.addEventListener("click", this.boundSellHandler);
  }

  tradeChoice() {
    const market = document.getElementById("market");
    market.removeEventListener("click", this.handleMarketClick);
    market.addEventListener("click", this.handleMarketClick);
  }

  processNextPlayer() {
    this.clearEventListeners();
    this.game.changePlayer();
    this.executeRound();
  }

  clearEventListeners() {
    const market = document.getElementById("market");
    const display = document.getElementById("display");

    market.removeEventListener("click", this.handleMarketClick);
    market.removeEventListener("click", this.boundSingleGoodHandler);
    market.removeEventListener("click", this.boundMarketHandler);
    display.removeEventListener("click", this.boundSellHandler);
    display.removeEventListener("click", this.boundExchangeGoodsHandler);
  }

  displayGame() {
    this.view.displayGame(this.game.displayGame());
  }

  executeRound() {
    this.clearEventListeners();
    this.displayGame();
    this.tradeChoice();

    if (this.game.isEndOfRound()) {
      const [winner, runner] = this.game.updatePlayersScore();
      console.log(winner, runner);
      this.beginGame();
    }
  }
}

const parents = ["goodsCoins", "deck", "display"].map((id) =>
  document.getElementById(id)
);

const controller = new Controller(new Game(), new View(parents));
controller.beginGame();
