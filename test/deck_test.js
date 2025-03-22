import { assertEquals } from "jsr:@std/assert/";
import { describe, it } from "jsr:@std/testing/bdd";
import { Deck } from "../src/models/deck.js";

describe("Deck Class", () => {
  describe("Constructor", () => {
    it("should initialize with given cards", () => {
      const deck = new Deck(["gold", "silver", "spice"]);
      assertEquals(deck.cards, ["gold", "silver", "spice"]);
    });

    it("should initialize with an empty array if no cards are provided", () => {
      const deck = new Deck([]);
      assertEquals(deck.cards, []);
    });
  });

  describe("shuffle()", () => {
    it("should shuffle the deck randomly", () => {
      const deck = new Deck(["gold", "silver", "spice", "cloth"]);
      const originalOrder = [...deck.cards];
      deck.shuffle();
      assertEquals(deck.cards.length, originalOrder.length);
      assertEquals(deck.cards.sort(), originalOrder.sort());
    });

    it("should not modify an empty deck", () => {
      const deck = new Deck([]);
      deck.shuffle();
      assertEquals(deck.cards, []);
    });

    it("should not remove or add cards during shuffle", () => {
      const deck = new Deck(["gold", "silver", "spice"]);
      deck.shuffle();
      assertEquals(deck.cards.length, 3);
      assertEquals(deck.cards.sort(), ["gold", "silver", "spice"]);
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

    it("should return an empty array if count is zero", () => {
      const deck = new Deck(["gold", "silver"]);
      const drawnCards = deck.getCards(0);
      assertEquals(drawnCards, []);
      assertEquals(deck.cards, ["gold", "silver"]);
    });

    it("should return an empty array if count is negative", () => {
      const deck = new Deck(["gold", "silver"]);
      const drawnCards = deck.getCards(-1);
      assertEquals(drawnCards, []);
      assertEquals(deck.cards, ["gold", "silver"]);
    });

    it("should work correctly when exactly enough cards are available", () => {
      const deck = new Deck(["gold", "silver"]);
      const drawnCards = deck.getCards(2);
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

    it("should update isEmpty correctly after removing all cards", () => {
      const deck = new Deck(["gold", "silver"]);
      deck.getCards(2);
      assertEquals(deck.isEmpty(), true);
    });
  });

  describe("length()", () => {
    it("should reflect the number of cards in the deck", () => {
      const deck = new Deck(["gold", "silver", "spice"]);
      assertEquals(deck.length(), 3);
    });

    it("should update after drawing cards", () => {
      const deck = new Deck(["gold", "silver", "spice"]);
      deck.getCards(2);
      assertEquals(deck.length(), 1);
    });

    it("should reflect zero when deck is empty", () => {
      const deck = new Deck([]);
      assertEquals(deck.length(), 0);
    });
  });
});
