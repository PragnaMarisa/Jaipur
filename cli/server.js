import { Controller } from "./dummycontroller.js";
import _ from "lodash";

class Server {
  constructor(portNo) {
    this.portNo = portNo;
    this.listener = Deno.listen({ port: this.portNo });
    this.connections = [];
    this.connectionId = 0;
    this.controller = new Controller();
  }

  async listen() {
    for await (const connection of this.listener) {
      const name = (await this.readMsg(connection)).trim();
      this.connections.push({ [name]: connection });

      if (this.connections.length === 2) {
        this.names = this.connections.map((obj) => Object.keys(obj)[0]);
        this.sendMsgToAll({ message: "Begining the game.." });
        this.controller.beginGame(...this.names);
        this.controller.startGame();
        this.executeRound();
        return;
      }

      if (this.connections.length === 1) {
        const waitMsg = {
          message: `Hey! ${name}. Wait for another player to join...`,
        };
        await this.writeMsg(waitMsg, connection);
      }
    }
  }

  async writeMsg(msg, connection) {
    const encoder = new TextEncoder();
    await connection.write(encoder.encode(JSON.stringify(msg)));
  }

  getConn(name) {
    return Object.values(_.find(this.connections, (o) => name in o))[0];
  }

  sendGameState() {
    const { coinsPart, currentPlayer, anotherPlayer } =
      this.controller.displayGame();

    this.curCon = this.getConn(currentPlayer.name);
    this.anoCon = this.getConn(anotherPlayer.name);

    this.writeMsg({ coinsPart, currentPlayer }, this.curCon);
    this.writeMsg({ coinsPart, anotherPlayer }, this.anoCon);
  }

  async processTrade(choice) {
    while (true) {
      console.log(choice);
      const tradeResult = this.controller.processTradeDecision(...choice);
      console.log(tradeResult);

      if ("error" in tradeResult || !("task" in tradeResult))
        return tradeResult;

      this.writeMsg(tradeResult, this.curCon);
      const subchoice = await this.getPlayerInput(this.curCon);
      choice.push(subchoice.input[0]);
    }
  }

  async executeRound() {
    this.sendGameState();
    let choice = await this.getPlayerInput(this.curCon);
    choice = choice.input;
    const x = await this.processTrade(choice);
    console.log(x);
    if ("sucess" in x) {
      this.controller.changePlayer();
    }
    if (this.controller.game.isEndOfRound()) {
      console.log("sent");
      this.sendMsgToAll(this.controller.roundSummary());
      await new Promise((resolve) => setTimeout(resolve, 5000));
      this.controller.startGame();
    }
    await this.executeRound();
  }

  async getPlayerInput(conn) {
    const rawInput = await this.readMsg(conn);
    return JSON.parse(rawInput);
  }

  sendMsgToAll(msg) {
    const connections = this.connections.map((obj) => Object.values(obj)[0]);
    connections.map(async (conn) => {
      const encoder = new TextEncoder();
      await conn.write(encoder.encode(JSON.stringify(msg)));
    });
  }

  async readMsg(connection) {
    const buf = new Uint8Array(100);
    const bytesCount = await connection.read(buf);
    const decoder = new TextDecoder();
    const msg = decoder.decode(buf.slice(0, bytesCount));
    console.log(msg, "--->");

    return msg;
  }
}

const server = new Server(8000);
server.listen();
