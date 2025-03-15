import { assertEquals } from "jsr:@std/assert/";
import { describe, it } from "jsr:@std/testing/bdd";
import { TokenCollection } from "../src/Models/tokenCollection.js";

describe("TokenCollection Class", () => {
  describe("Constructor", () => {
    it("should initialize with given tokens", () => {
      const tokens = { spice: [5, 3], gold: [6, 4] };
      const collection = new TokenCollection(tokens);
      assertEquals(collection.tokens, tokens);
    });
  });

  describe("are3TokensDeprecated()", () => {
    it("should return true if at least two types of tokens are depleted", () => {
      const collection = new TokenCollection({
        spice: [],
        gold: [],
        cloth: [5],
      });
      assertEquals(collection.are3TokensDeprecated(), true);
    });

    it("should return false if less than two types are depleted", () => {
      const collection = new TokenCollection({
        spice: [],
        gold: [4],
        cloth: [5],
      });
      assertEquals(collection.are3TokensDeprecated(), false);
    });
  });

  describe("calculateCoinsEarned()", () => {
    it("should return earned coins and update token collection", () => {
      const collection = new TokenCollection({
        spice: [5, 3, 2],
        gold: [6, 4],
      });
      assertEquals(collection.calculateCoinsEarned("spice", 2), [5, 3]);
      assertEquals(collection.calculateCoinsEarned("spice", 1), [2]);
    });

    it("should return all available coins if count is greater than available", () => {
      const collection = new TokenCollection({ spice: [5] });
      assertEquals(collection.calculateCoinsEarned("spice", 3), [5]);
      assertEquals(collection.tokens["spice"], []);
    });

    it("should return an empty array if the requested type is missing", () => {
      const collection = new TokenCollection({ spice: [5], gold: [6, 4] });
      assertEquals(collection.calculateCoinsEarned("diamond", 2), []);
    });

    it("should return an empty array if the requested type has no tokens", () => {
      const collection = new TokenCollection({ spice: [], gold: [6, 4] });
      assertEquals(collection.calculateCoinsEarned("spice", 2), []);
    });
  });
});
