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

  printMarketCards(marketCards) {
    this.displayCoins("marketCards", marketCards, "market-card");
    const nav = document.getElementById("nav");
    ["sell-goods", "take-goods"].forEach((id) => {
      this.createButton(nav, id, id.split("-").join(" "));
    });
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
    document.getElementById("deck").innerHTML = "";
    document.getElementById("nav").innerHTML = "";
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

  createButton(parentId, id, text) {
    if (document.getElementById(id)) return;
    const button = document.createElement("button");
    button.id = id;
    button.textContent = text;
    parentId.appendChild(button);
  }

  createTakingChoices() {
    const nav = document.getElementById("nav");
    ["one-good", "mul-good", "all-camels"].forEach((id) => {
      const button = document.createElement("button");
      button.textContent = id;
      button.id = id;
      nav.appendChild(button);
    });
  }
}

export { View };
