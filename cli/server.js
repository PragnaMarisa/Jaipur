import { Controller } from "./dummycontroller.js";

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
      const name = (await this.read(connection)).trim();
      this.connections.push({ [name]: connection });

      if (this.connections.length === 2) {
        this.names = this.connections.map((obj) => Object.keys(obj)[0]);
        this.sendMsgToConnections(null, "server", "Begining the game..");
        this.controller.beginGame(...this.names);
        return;
      }

      if (this.connections.length === 1) {
        const waitMsg = `Hey! ${name}. Wait for another player to join...`;
        await this.write(waitMsg, connection);
      }
    }
  }

  async write(msg, connection) {
    const encoder = new TextEncoder();
    await connection.write(encoder.encode(msg));
  }

  sendMsgToConnections(connection, name, msg) {
    const remainingConnections = this.connections.filter(
      (obj) => Object.values(obj)[0] !== connection
    );

    remainingConnections.map(async (obj) => {
      const [_, connection] = Object.entries(obj)[0];
      const encoder = new TextEncoder();
      await connection.write(encoder.encode(`Client ${name} Text you: ${msg}`));
    });
  }

  async read(connection) {
    const buf = new Uint8Array(100);
    const bytesCount = await connection.read(buf);
    const decoder = new TextDecoder();
    const msg = decoder.decode(buf.slice(0, bytesCount));
    console.log(msg, "--->");

    return msg;
  }

  async handleConnection(connection, name) {
    try {
      while (true) {
        const msg = await this.read(connection);
        this.sendMsgToConnections(connection, name, msg);
      }
    } catch {
      console.log("closed");
    }
  }
}

const server = new Server(8000);
server.listen();
