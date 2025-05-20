import chalk from "chalk";

class View {
  prompts = {
    tradeChoice: [
      `${chalk.blue("trade center")}${chalk.magenta(
        "\n1️⃣ Take Goods\n2️⃣ Sell Goods\nenter your choice:"
      )}`,
    ],
    sell: [
      `${chalk.gray("-".repeat(100))}\n${chalk.red(
        "1.Diamond\n2.Gold\n3.Silver\n4.Clothes\n5.Spices\n6.Leather"
      )}\n${chalk.green("Enter no of goods you want to sell:")}`,
    ],

    takeCards: [
      `${chalk.gray("-".repeat(100))}\n${chalk.green(
        "1️⃣ Take single good\n2️⃣ Take several goods\n3️⃣ Take All Camels\nenter your choice:"
      )}`,
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

  displayAllGoods(tokens, marketCards, hands, camels) {
    const tokenEntries = Object.entries(tokens);
    const marketText = marketCards.join("  ");
    const playerText = hands.join("  ");
    const camelsText = camels.length > 0 ? camels.join("  ") : "";

    tokenEntries.forEach(([type, count], index) => {
      const tokenLine = `${chalk.green(type)}: ${count}`.padEnd(45);
      const marketLine = index === 0 ? marketText.padEnd(40) : "";
      const playerLine = index === 0 ? playerText : "";
      console.log(`${tokenLine}${chalk.green(marketLine)}${playerLine}`);
      if (index === 0 && camelsText)
        console.log(" ".repeat(30 + 50) + camelsText);
    });
  }

  displayGame(tokens, marketCards, name, score, hands, camels) {
    console.log(
      `${chalk.yellow.bold("PLAYER:")} ${name} ${chalk.yellow.bold(
        `(Score: ${score})`
      )}`
    );
    console.log(chalk.gray("-".repeat(100)));
    console.log(
      chalk.red.bold("TOKENS").padEnd(60) +
        chalk.red.bold("MARKET").padEnd(60) +
        chalk.red.bold("PLAYER'S CARDS")
    );
    console.log(chalk.gray("-".repeat(100)));

    this.displayAllGoods(tokens, marketCards, hands, camels);
    console.log(chalk.gray("-".repeat(100)));
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
