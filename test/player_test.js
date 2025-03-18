import { assertEquals } from "jsr:@std/assert/";
import { describe, it } from "jsr:@std/testing/bdd";
import { Player } from "../src/models/player.js";

describe("Player Class", () => {
  describe("Constructor", () => {
    it("should initialize with a name and default values", () => {
      const player = new Player("Alice");
      assertEquals(player.name, "Alice");
      assertEquals(player.excellence, 0);
      assertEquals(player.playerToken, 0);
    });
  });

  describe("categorizeCards()", () => {
    it("should separate camels from other goods", () => {
      const player = new Player("Alice");
      const result = player.categorizeCards([
        "spice",
        "camel",
        "gold",
        "camel",
      ]);
      assertEquals(result.hand, ["spice", "gold"]);
      assertEquals(result.camels, ["camel", "camel"]);
    });
  });

  describe("initializeHand()", () => {
    it("should correctly initialize hand and camel", () => {
      const player = new Player("Alice");
      player.initializeHand(["spice", "camel", "gold", "camel"]);
      assertEquals(player.hands(), ["spice", "gold"]);
      assertEquals(player.camels(), ["camel", "camel"]);
    });
  });

  // describe("score()", () => {
  //   it("should return total token score", () => {
  //     const player = new Player("Alice");
  //     player.initializeHand([]);
  //     player.addTokens([5, 3, 2]);
  //     assertEquals(player.score(), 10);
  //   });
  // });

  describe("addCards()", () => {
    it("should add goods and camels separately", () => {
      const player = new Player("Alice");
      player.initializeHand(["spice"]);
      player.addCards(["gold", "camel", "camel"]);
      assertEquals(player.hands(), ["spice", "gold"]);
      assertEquals(player.camels(), ["camel", "camel"]);
    });
  });

  describe("isPresent()", () => {
    it("should return true if good is present", () => {
      const player = new Player("Alice");
      player.initializeHand(["spice", "gold"]);
      assertEquals(player.isPresent("gold"), true);
    });

    it("should return false if good is not present", () => {
      const player = new Player("Alice");
      player.initializeHand(["spice", "gold"]);
      assertEquals(player.isPresent("diamond"), false);
    });
  });

  describe("countOf()", () => {
    it("should return the count of a specified good in hand", () => {
      const player = new Player("Alice");
      player.initializeHand(["spice", "gold", "gold"]);
      assertEquals(player.countOf("gold"), 2);
    });
  });

  describe("removeCards()", () => {
    it("should remove specified number of goods from hand", () => {
      const player = new Player("Alice");
      player.initializeHand(["spice", "gold", "gold"]);
      player.removeCards(1, "gold");
      assertEquals(player.hands(), ["spice", "gold"]);
    });

    it("should remove camels separately", () => {
      const player = new Player("Alice");
      player.initializeHand(["camel", "camel", "gold"]);
      player.removeCards(1, "camel");
      assertEquals(player.camels(), ["camel"]);
    });
  });
});
