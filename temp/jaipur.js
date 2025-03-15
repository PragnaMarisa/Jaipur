import { shuffle } from "../lib.js";

const cards = {
  diamond: ["diamond", "diamond", "diamond", "diamond", "diamond", "diamond"],
  gold: ["gold", "gold", "gold", "gold", "gold", "gold"],
  silver: ["silver", "silver", "silver", "silver", "silver", "silver"],
  clothes: [
    "clothes",
    "clothes",
    "clothes",
    "clothes",
    "clothes",
    "clothes",
    "clothes",
    "clothes",
  ],
  spices: [
    "spices",
    "spices",
    "spices",
    "spices",
    "spices",
    "spices",
    "spices",
    "spices",
  ],
  leather: [
    "leather",
    "leather",
    "leather",
    "leather",
    "leather",
    "leather",
    "leather",
    "leather",
    "leather",
    "leather",
  ],
  camels: [
    "camels",
    "camels",
    "camels",
    "camels",
    "camels",
    "camels",
    "camels",
    "camels",
    "camels",
    "camels",
    "camels",
  ],
};

class Game {
  camelToken = 5;

  goods = {
    1: "diamond",
    2: "gold",
    3: "silver",
    4: "clothes",
    5: "spices",
    6: "leather",
  };

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

  deck = [];
  market = [];
  players = [
    {
      name: "Player 1",
      hand: [],
      tokens: [],
      excellence: 0,
    },
    { name: "Player 2", hand: [], tokens: [], excellence: 0 },
  ];

  constructor(cards) {
    this.cards = cards;
    this.currentNo = 0;
    this.roundNo = 1;
    this.enrollPlayers();
    this.start();
  }

  gameSetup() {
    const allCards = [...Object.values(cards)].flat();
    this.deck = shuffle(allCards);
    this.market = this.deck.slice(0, 5);
    this.deck = this.deck.slice(5);

    this.tokens = {
      // diamond: [7, 7, 5, 5, 5],
      diamond: [7, 7],
      // gold: [6, 6, 5, 5, 5],
      gold: [6, 6],
      silver: [5, 5, 5, 5, 5],
      clothes: [5, 3, 3, 2, 2, 1, 1],
      // spices: [5, 3, 3, 2, 2, 1, 1],
      spices: [5, 3],
      leather: [4, 3],
      // leather: [4, 3, 2, 1, 1, 1, 1, 1, 1],
    };

    this.bonusTokens = {
      3: [1, 1, 2, 3, 3, 2, 2],
      4: [5, 6, 6, 4, 5, 4],
      5: [8, 10, 8, 10, 9],
    };

    this.players.forEach((player) => {
      player.hand = [];
      player.camels = [];
      player.tokens = [];
    });
  }

  addExcellenceToken = (player) => (player.excellence += 1);

  displayScore([player, score], position) {
    console.log(position);
    console.log("Player Name: ", player.name);
    console.log("Score: ", score);
  }

  calculateTotal = (score) => score.reduce((sum, ele) => sum + ele, 0);

  announceScore([score1, player1], [score2, player2]) {
    if (score1 > score2) {
      this.displayScore([player1, score1], "Winner");
      this.displayScore([player2, score2], "Runner");
      this.addExcellenceToken(player1);
    } else if (score2 > score1) {
      this.displayScore([player2, score2], "Winner");
      this.displayScore([player1, score1], "Runner");
      this.addExcellenceToken(player2);
    } else {
      console.log("It's a tie!");
    }
  }

  calculateCamelsScore() {
    const P1Camels = this.players[0].hand.filter(
      (ele) => ele === "camels"
    ).length;
    const P2Camels = this.players[1].hand.filter(
      (ele) => ele === "camels"
    ).length;

    if (P1Camels > P2Camels) {
      this.players[0].tokens.push(this.camelToken);
    } else if (P2Camels > P1Camels) {
      this.players[1].tokens.push(this.camelToken);
    }
  }

  calculateScores() {
    this.calculateCamelsScore();

    const [score1, score2] = [
      this.calculateTotal(this.players[0].tokens),
      this.calculateTotal(this.players[1].tokens),
    ];

    this.announceScore([score1, this.players[0]], [score2, this.players[1]]);
  }

  displayGame() {
    console.log("Player name: ", this.fetchPlayerData("name"));
    console.log("Score: ", this.calculateTotal(this.fetchPlayerData("tokens")));
    console.log("Market: ", this.market);
    console.log("cards in your hand: ", this.fetchPlayerData("hand"));
    console.log(this.deck.length, "deck");
    console.log(this.tokens);
  }

  endGame() {
    // change 1 to 3
    const areAny3Deprecated =
      Object.values(this.tokens).filter((arr) => arr.length === 0).length >= 1;

    return areAny3Deprecated || this.deck.length === 0;
  }

  fetchPlayerData = (field) => this.players[this.currentNo][field];

  enrollPlayers() {
    console.log("players enrolled");
  }

  changePlayer = () => (this.currentNo = (this.currentNo + 1) % 2);

  refillMarket() {
    while (this.market.length < 5) {
      this.market.push(this.deck.shift());
    }
  }

  takeSingleGood() {
    const good = prompt(this.prompts.singleGood[0]);
    this.fetchPlayerData("hand").push(good);
    this.removeCards(this.market, 1, good);
    this.refillMarket();
  }

  exchangeGoods(goodsToBeGiven, goodsToBeTaken) {
    for (let i = 0; i < goodsToBeGiven.length; i++) {
      const indexM = this.market.indexOf(goodsToBeTaken[i]);
      const indexH = this.fetchPlayerData("hand").indexOf(goodsToBeGiven[i]);
      [this.market[indexM], this.fetchPlayerData("hand")[indexH]] = [
        this.fetchPlayerData("hand")[indexH],
        this.market[indexM],
      ];
    }

    // if they both arrays are not of same length then ask again.
  }

  takeSeveralGoods() {
    let goodsToBeTaken = prompt(this.prompts.severalGoods[0]);
    goodsToBeTaken = goodsToBeTaken.split(" ");
    let goodsToBeGiven = prompt(this.prompts.severalGoods[1]);
    goodsToBeGiven = goodsToBeGiven.split(" ");
    this.exchangeGoods(goodsToBeGiven, goodsToBeTaken);
  }

  takeAllCamels() {
    const camels = [...this.market].filter((ele) => ele === "camels");
    this.removeCards(this.market, camels.length, "camels");
    this.fetchPlayerData("hand").push(...camels);
    this.refillMarket();
  }

  takeCards() {
    const choice = parseInt(prompt(this.prompts.takeCards[0]));

    const options = {
      1: this.takeSingleGood,
      2: this.takeSeveralGoods,
      3: this.takeAllCamels,
    };
    options[choice]?.call(this);
  }

  removeCards(array, count, typeOfGood) {
    for (let i = 0; i < count; i++) {
      const index = array.indexOf(typeOfGood);
      array.splice(index, 1);
    }
  }

  getTypeOfGood = () => {
    const codeOfGood = parseInt(prompt(this.prompts.sell[0]));
    const typeOfGood = this.goods[codeOfGood];
    return typeOfGood;
  };

  getNoOfGoodsSold = () => parseInt(prompt(this.prompts.sell[1]));

  sellCards = () => {
    const typeOfGood = this.getTypeOfGood();

    const count = this.getNoOfGoodsSold();

    this.fetchPlayerData("tokens").push(
      ...this.tokens[typeOfGood].slice(0, count)
    );

    this.tokens[typeOfGood] = this.tokens[typeOfGood].toSpliced(0, count);
    this.removeCards(this.fetchPlayerData("hand"), count, typeOfGood);

    if (count > 2)
      this.fetchPlayerData("tokens").push(this.bonusTokens[count].shift());
  };

  tradeChoice = () => {
    const choice = parseInt(prompt(this.prompts.tradeChoice[0]));
    return choice == 1 ? this.takeCards() : this.sellCards();
  };

  initializeCardsForPlayers() {
    for (let i = 0; i < 5; i++) {
      this.players[0].hand.push(this.deck.shift());
      this.players[1].hand.push(this.deck.shift());
    }
  }

  annouceGameWinner() {
    const p1 = this.players[0].excellence;
    const p2 = this.players[1].excellence;
    if (p1 > p2) {
      console.log("winner is player 1");
    } else {
      console.log("winner is player 2");
    }
  }
  start() {
    console.log(`---------ROUND ${this.roundNo}----------`);
    this.gameSetup();
    this.initializeCardsForPlayers();
    while (!this.endGame()) {
      this.displayGame();
      this.tradeChoice();
      this.changePlayer();
      console.clear();
    }
    this.calculateScores();

    this.roundNo += 1;
    if (this.roundNo > 3) this.annouceGameWinner();
    this.start();
  }
}

const game = new Game(cards);
