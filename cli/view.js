import chalk from "chalk";

class View {
  prompts = {
    tradeChoice: [
      `${chalk.gray("-".repeat(127))}\n${chalk.blue(
        "trade center"
      )}${chalk.magenta("\n1️⃣ Take Goods\n2️⃣ Sell Goods\nenter your choice:")}`,
    ],
    sell: [
      `${chalk.gray("-".repeat(127))}\n${chalk.red(
        "1.Diamond\n2.Gold\n3.Silver\n4.Clothes\n5.Spices\n6.Leather"
      )}\n${chalk.blue("enter your choice:")}`,
      `${chalk.green("Enter no of goods you want to sell:")}`,
      `\n${chalk.gray("-".repeat(127))}`,
    ],

    takeCards: [
      `${chalk.gray("-".repeat(127))}\n${chalk.green(
        "1️⃣ Take single good\n2️⃣ Take several goods\n3️⃣ Take All Camels\nenter your choice:"
      )}`,
    ],
    singleGood: [`${chalk.green("Which good you want to take: ")}`],
    severalGoods: [
      `${chalk.magenta("Enter goods you want to take: ")}`,
      `${chalk.magenta("Enter goods you wanted to exchange: ")}`,
    ],
  };

  tradeChoice() {
    const choice = parseInt(prompt(this.prompts.tradeChoice[0]).trim());

    return choice;
  }

  displayGoodTokens(tokens, bonusCount) {
    console.log(
      chalk.red.bold("GOODS TOKENS").padEnd(75) + chalk.red.bold("Bonus Tokens")
    );
    console.log(chalk.gray("-".repeat(127)));

    let bonusTokens = 3;
    const tokenEntries = Object.entries(tokens);

    tokenEntries.forEach(([type, count], index) => {
      const countTokens = count.join(" ");
      const tokenLine = `${chalk.green(type)}: ${countTokens}`.padEnd(70);
      const bonusCoins =
        index < 3 ? `${chalk.green(bonusTokens++)}:${bonusCount[index]}` : "";
      console.log(tokenLine, bonusCoins);
    });
  }

  displayPlayerCards(hands, camels) {
    console.log(chalk.red.bold("PLAYER CARDS").padStart(80) + "\n");
    console.log(hands.join(" ").padEnd(80), camels.join(" "));
  }

  displayMarket(marketCards) {
    const marketText = marketCards.join("  ");
    console.log(chalk.red.bold("MARKET").padStart(80) + "\n");
    console.log(marketText.padStart(75));
  }

  displayGame(
    tokens,
    marketCards,
    name,
    score,
    hands,
    camels,
    _,
    __,
    bonusCount
  ) {
    const line = chalk.gray("-".repeat(127));
    console.log(
      `${chalk.yellow.bold("PLAYER:")} ${name} ${chalk.yellow.bold(
        `(Score: ${score})`
      )}`
    );
    console.log(line);
    this.displayGoodTokens(tokens, bonusCount);
    console.log(line);
    this.displayMarket(marketCards);
    console.log(line);
    this.displayPlayerCards(hands, camels);
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
