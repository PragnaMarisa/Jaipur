class View {
  prompts = {
    tradeChoice: ["sell or take cards? \n 1.take cards\n 2.sell cards.\n"],
    sell: [
      "1.Diamond\n2.Gold\n3.Silver\n4.Clothes\n5.Spices\n6.Leather",
      "Enter no of goods you want to sell\n",
    ],
    takeCards: [
      "1. Take single good\n2. Take several goods\n3. Take all the camels.\n",
    ],
    singleGood: ["Which good you want to take: "],
    severalGoods: [
      "Enter goods you want to take: ",
      "Enter goods you wanted to exchange: ",
    ],
  };
  tradeChoice() {
    const choice = parseInt(prompt(this.prompts.tradeChoice[0]).trim());

    return choice;
  }

  displayGame(tokens, marketCards, name, score, hands, camels) {
    console.log(`TOKENS : `, tokens);
    console.log(`MARKET : `, marketCards);
    console.log(`PLAYER NAME : `, name);
    console.log(`CURRENT SCORE : `, score);
    console.log(`HAND : `, hands);
    console.log(`CAMELS : `, camels);
  }

  getTypeOfGood = () => {
    const codeOfGood = parseInt(prompt(this.prompts.sell[0]).trim());
    return codeOfGood;
  };

  getNoOfGoodsSold = () => parseInt(prompt(this.prompts.sell[1]).trim());

  sellGoods(goods) {
    const typeOfGood = this.getTypeOfGood(goods);
    const count = this.getNoOfGoodsSold();

    return [typeOfGood, count];
  }

  takeGoods() {
    const choice = parseInt(prompt(this.prompts.takeCards[0]).trim());
    return choice;
  }

  takeSingleGood() {
    const good = prompt(this.prompts.singleGood[0]).trim();
    return good;
  }

  takeSeveralGoods() {
    let goodsToBeTaken = prompt(this.prompts.severalGoods[0]).trim();
    goodsToBeTaken = goodsToBeTaken.split(" ");
    let goodsToBeGiven = prompt(this.prompts.severalGoods[1]).trim();
    goodsToBeGiven = goodsToBeGiven.split(" ");
    return [goodsToBeGiven, goodsToBeTaken];
  }

  displayPlayer(position, name, score, excellence) {
    console.log(
      `${position}\nName: ${name}\nScore: ${score}\nExcellence: ${excellence}\n\n`
    );
  }

  roundSummary(
    [wName, wScore, wExcellence, wCToken],
    [rName, rScore, rExcellence, rCToken],
    tie
  ) {
    if (tie === "tie") {
      console.log("Its Tie!");
      this.displayPlayer("", wName, wScore, wExcellence, wCToken);
      this.displayPlayer("", rName, rScore, rExcellence, rCToken);
    }
    this.displayPlayer("Winner 🏆", wName, wScore, wExcellence, wCToken);
    this.displayPlayer("Runner 🥈", rName, rScore, rExcellence, rCToken);
  }

  playerSummary(winner, runner, tie) {
    if (tie) {
      console.log(`${winner[0]} with ${winner[2]} coins`);
      console.log(`${runner[0]} with ${runner[2]} coins`);
      return;
    }

    console.log(`Final winner is ${winner[0]} with ${winner[2]} coins`);
    console.log(`Runner up is ${runner[0]} with ${runner[2]} coins`);
  }
}

export { View };
