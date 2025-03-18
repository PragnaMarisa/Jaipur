class View {
  isSell = false;

  constructor(parents) {
    [this.goodCoins, this.deck, this.display] = parents;
  }

  displayCoins(good, coins, className = "coin") {
    const div = document.getElementById(good);
    coins.forEach((coin) => {
      const button = document.createElement("button");
      button.textContent = coin;
      button.className = className;
      div.appendChild(button);
    });
  }

  printTokens(tokens) {
    const goods = Array.from(this.goodCoins.children).map((node) => node.id);
    goods.forEach((good) => {
      this.displayCoins(good, tokens[good]);
    });
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

  addEventListenerTo(id) {
    const market = document.getElementById(id);
    market.addEventListener("click", (event) => {
      if (["sell-goods", "take-goods"].includes(event.target.id)) {
        this.tradeChoice();
      }
    });
  }

  printMarketCards(marketCards) {
    this.displayCoins("marketCards", marketCards, "market-card");
    this.addEventListenerTo("market");
  }

  displayCurrPlayerDetails(name, score, hands, camels) {
    const playerDetails = document.getElementById("player2");
    const scoreOfPlayer = document.getElementById("score2");

    const player = document.createElement("p");
    player.textContent = name;
    scoreOfPlayer.textContent = score;

    this.displayCoins("cards2", [...hands, ...camels], "pCards");

    playerDetails.appendChild(player);
  }

  displayOpponent(name, cardsCount) {
    const playerDetails = document.getElementById("player1");

    const player = document.createElement("p");
    player.textContent = name;

    this.displayCoins("cards1", Array(cardsCount).fill("Jaipur"));
    playerDetails.appendChild(player);
  }

  clearDisplay() {
    Array.from(this.goodCoins.children).forEach((ele) => (ele.innerHTML = ""));
    Array.from(document.getElementById("player1").children).forEach(
      (ele) => (ele.innerHTML = "")
    );
    document.getElementById("marketCards").innerHTML = "";
    Array.from(document.getElementById("player2").children).forEach(
      (ele) => (ele.innerHTML = "")
    );
    document.getElementById("deckCards").innerHTML = "";
    Array.from(document.getElementById("bonusCoins").children).forEach(
      (ele) => (ele.innerHTML = "")
    );
  }

  displayGame(details) {
    this.clearDisplay();

    const [
      tokens,
      marketCards,
      playerName,
      playerScore,
      playerHands,
      playerCamels,
      standByPlayerName,
      standByCardsCount,
      [bonus3, bonus4, bonus5],
      camelToken,
      coinsOfExcellence,
      deckLength,
    ] = details;

    this.printTokens(tokens);
    this.printMarketCards(marketCards);
    this.displayCurrPlayerDetails(
      playerName,
      playerScore,
      playerHands,
      playerCamels
    );
    this.displayOpponent(standByPlayerName, standByCardsCount);
    this.displayCoins("bonus3", Array(bonus3).fill(3));
    this.displayCoins("bonus4", Array(bonus4).fill(4));
    this.displayCoins("bonus5", Array(bonus5).fill(5));
    this.displayCoins("camelToken", [camelToken]);
    this.displayCoins("excellence", coinsOfExcellence);
    this.displayCoins("deck", Array(deckLength).fill("Jaipur"));
  }

  sellGoods() {
    console.log("sellGoods");
    const goods = [];
    const market = document.getElementById("market");
    createButton(market, "sell-now", "Sell Now");
    const display = document.getElementById("display");
    display.addEventListener("click", (event) => {
      if (event.target.id === "sell-now") {
        console.log(goods);
        return goods;
      }
      if (event.target.className === "pCards") {
        goods.push(event.target.textContent);
        event.target.remove();
      }
    });

    function createButton(parentId, id, text) {
      if (document.getElementById(id)) return;
      const div = document.createElement("button");
      div.id = id;
      div.textContent = text;
      parentId.appendChild(div);
    }
  }
}

export { View };
