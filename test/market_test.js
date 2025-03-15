import { assertEquals, assertArrayIncludes } from "jsr:@std/assert/";
import { describe, it } from "jsr:@std/testing/bdd";
import { Market } from "../src/Models/market.js";

describe("Market Class", () => {
  describe("Constructor", () => {
    it("should initialize with given market cards", () => {
      const market = new Market(["spice", "cloth", "camel"]);
      assertEquals(market.marketCards, ["spice", "cloth", "camel"]);
    });
  });

  describe("refillMarket()", () => {
    it("should refill market up to 5 cards", () => {
      const market = new Market(["spice", "cloth"]);
      const mockDeck = {
        getCards: (num) => Array(num).fill("gold"),
      };

      market.refillMarket(mockDeck);
      assertEquals(market.marketCards.length, 5);
      assertArrayIncludes(market.marketCards, ["gold"]);
    });
  });

  describe("removeCards()", () => {
    it("should remove specified type of good from the market", () => {
      const market = new Market(["spice", "cloth", "gold", "gold", "spice"]);
      market.removeCards(2, "spice");
      assertEquals(market.marketCards, ["cloth", "gold", "gold"]);
    });
  });

  describe("filterCamels()", () => {
    it("should return only camels", () => {
      const market = new Market(["spice", "camel", "gold", "camel"]);
      assertEquals(market.filterCamels(), ["camel", "camel"]);
    });
  });

  describe("filterGoods()", () => {
    it("should return only goods (excluding camels)", () => {
      const market = new Market(["spice", "camel", "gold", "camel"]);
      assertEquals(market.filterGoods(), ["spice", "gold"]);
    });
  });

  describe("isPresent()", () => {
    it("should return true if good is present", () => {
      const market = new Market(["spice", "gold", "cloth"]);
      assertEquals(market.isPresent("gold"), true);
    });
  });

  describe("addCards()", () => {
    it("should add new cards to the market", () => {
      const market = new Market(["spice", "cloth"]);
      market.addCards(["gold", "camel"]);
      assertEquals(market.marketCards, ["spice", "cloth", "gold", "camel"]);
    });
  });
});
