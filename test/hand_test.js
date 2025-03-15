import { assertEquals } from "jsr:@std/assert/";
import { describe, it } from "jsr:@std/testing/bdd";
import { Hand } from "../src/Models/hand.js";

describe("Hand Class", () => {
  describe("Constructor", () => {
    it("should initialize with given cards", () => {
      const hand = new Hand(["spice", "gold"]);
      assertEquals(hand.cards, ["spice", "gold"]);
    });

    it("should initialize with an empty hand if no cards are provided", () => {
      const hand = new Hand([]);
      assertEquals(hand.cards, []);
    });
  });

  describe("addCards()", () => {
    it("should add new cards to the hand", () => {
      const hand = new Hand(["spice", "gold"]);
      hand.addCards(["camel", "silver"]);
      assertEquals(hand.cards, ["spice", "gold", "camel", "silver"]);
    });

    it("should handle adding an empty array", () => {
      const hand = new Hand(["spice", "gold"]);
      hand.addCards([]);
      assertEquals(hand.cards, ["spice", "gold"]);
    });
  });
});
