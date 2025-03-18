import { assertEquals } from "jsr:@std/assert/";
import { describe, it } from "jsr:@std/testing/bdd";
import { Deck } from "../src/models/deck.js";

describe("Deck Class", () => {
  describe("Constructor", () => {
    it("should initialize with given cards", () => {
      const deck = new Deck(["gold", "silver", "spice"]);
      assertEquals(deck.cards, ["gold", "silver", "spice"]);
    });
  });
  describe("shuffle()", () => {
    it("should shuffle the deck randomly", () => {
      const deck = new Deck(["gold", "silver", "spice", "cloth"]);
      const originalOrder = [...deck.cards];
      deck.shuffle();
      assertEquals(deck.cards.length, originalOrder.length);
    });
  });

  describe("getCards()", () => {
    it("should return the requested number of cards", () => {
      const deck = new Deck(["gold", "silver", "spice"]);
      const drawnCards = deck.getCards(2);
      assertEquals(drawnCards, ["gold", "silver"]);
      assertEquals(deck.cards, ["spice"]);
    });

    it("should return all cards if count exceeds deck size", () => {
      const deck = new Deck(["gold", "silver"]);
      const drawnCards = deck.getCards(5);
      assertEquals(drawnCards, ["gold", "silver"]);
      assertEquals(deck.cards, []);
    });
  });

  describe("isEmpty()", () => {
    it("should return true if deck is empty", () => {
      const deck = new Deck([]);
      assertEquals(deck.isEmpty(), true);
    });

    it("should return false if deck has cards", () => {
      const deck = new Deck(["gold"]);
      assertEquals(deck.isEmpty(), false);
    });
  });
});
