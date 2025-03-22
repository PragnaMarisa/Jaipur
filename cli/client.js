import { View } from "./view.js";
import _ from "lodash";

class Client {
  constructor(portNo, name) {
    this.portNo = portNo;
    this.name = name;
    this.decoder = new TextDecoder();
    this.encoder = new TextEncoder();
    this.stdin = Deno.stdin;
    this.reader = this.stdin.readable.getReader();
    this.decoder = new TextDecoder();
    this.view = new View();
  }

  async connect() {
    try {
      this.connection = await Deno.connect({ port: this.portNo });
      await this.connection.write(this.encoder.encode(this.name));
      console.log(`Connected as ${this.name}`);
      this.handleConnection();
    } catch (err) {
      console.error("Failed to connect:", err.message);
    }
  }

  async readData() {
    try {
      const buf = new Uint8Array(1024);
      const bytesCount = await this.connection.read(buf);
      const msg = this.decoder.decode(buf.slice(0, bytesCount));
      console.log(msg);

      const validResponse = _.pickBy(JSON.parse(msg));
      const returned = this.view.parse(validResponse);
      console.log(returned);
      if (returned) this.writeMsg(JSON.stringify({ input: [returned] }));

      this.readData();
    } catch (err) {
      console.error("Read error:", err.message);
    }
  }

  async writeMsg(data) {
    try {
      await this.connection.write(this.encoder.encode(data));
    } catch (err) {
      console.error("Write error:", err.message);
    }
  }

  handleConnection() {
    this.readData();
  }
}

const c1 = new Client(8000, Deno.args[0] || "user");
c1.connect();
