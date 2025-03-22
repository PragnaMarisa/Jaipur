import { View } from "./view.js";

class Client {
  constructor(portNo, name) {
    this.portNo = portNo;
    this.name = name;
    this.decoder = new TextDecoder();
    this.encoder = new TextEncoder();
    this.stdin = Deno.stdin;
    this.reader = this.stdin.readable.getReader();
    this.decoder = new TextDecoder();
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
      if (bytesCount === null) return;
      const msg = this.decoder.decode(buf.slice(0, bytesCount));
      const { content, isCurrPlaying } = JSON.parse(msg);
      console.log({ content, isCurrPlaying });
      this.read();
    } catch (err) {
      console.error("Read error:", err.message);
    }
  }

  async write() {
    try {
      const { value, _ } = await this.reader.read();
      const msgToBeGiven = this.decoder.decode(value);
      console.log(msgToBeGiven);

      if (msgToBeGiven === null) return;
      await this.connection.write(this.encoder.encode(msgToBeGiven));
      this.write();
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
