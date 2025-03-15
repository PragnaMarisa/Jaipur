class Token {
  constructor(tokens) {
    this.tokens = tokens;
  }
  calculateTotal = () => this.tokens.reduce((sum, ele) => sum + ele, 0);

  addToken = (tokens) => this.tokens.push(...tokens);
}

export { Token };
