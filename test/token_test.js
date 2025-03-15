import { assertEquals } from "jsr:@std/assert/";
import { describe, it } from "jsr:@std/testing/bdd";
import { Token } from "../src/Models/token.js";

describe("Token Class", () => {
  describe("Constructor", () => {
    it("should initialize with given tokens", () => {
      const token = new Token([5, 3, 2]);
      assertEquals(token.tokens, [5, 3, 2]);
    });
  });

  describe("calculateTotal()", () => {
    it("should return the total sum of all tokens", () => {
      const token = new Token([5, 3, 2]);
      assertEquals(token.calculateTotal(), 10);
    });

    it("should return 0 for an empty token collection", () => {
      const token = new Token([]);
      assertEquals(token.calculateTotal(), 0);
    });
  });

  describe("addToken()", () => {
    it("should add new tokens to the collection", () => {
      const token = new Token([5, 3]);
      token.addToken([2, 1]);
      assertEquals(token.tokens, [5, 3, 2, 1]);
    });

    it("should handle adding an empty array", () => {
      const token = new Token([5, 3]);
      token.addToken([]);
      assertEquals(token.tokens, [5, 3]);
    });
  });
});
