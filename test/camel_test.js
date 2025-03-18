import { assertEquals } from "jsr:@std/assert/";
import { describe, it } from "jsr:@std/testing/bdd";
import { Camel } from "../src/models/camel.js";

describe("Camel Class", () => {
  describe("Constructor", () => {
    it("should initialize with given cards", () => {
      const camel = new Camel(["camel1", "camel2"]);
      assertEquals(camel.cards, ["camel1", "camel2"]);
    });

    it("should initialize with an empty array if no cards are provided", () => {
      const camel = new Camel([]);
      assertEquals(camel.cards, []);
    });
  });

  describe("removeCards()", () => {
    it("should remove the last card from the array", () => {
      const camel = new Camel(["camel1", "camel2", "camel3"]);
      camel.removeCards();
      assertEquals(camel.cards, ["camel1", "camel2"]);
    });

    it("should do nothing if the array is already empty", () => {
      const camel = new Camel([]);
      camel.removeCards();
      assertEquals(camel.cards, []);
    });
  });

  describe("addCards()", () => {
    it("should add new cards to the collection", () => {
      const camel = new Camel(["camel1"]);
      camel.addCards(["camel2", "camel3"]);
      assertEquals(camel.cards, ["camel1", "camel2", "camel3"]);
    });

    it("should handle adding an empty array", () => {
      const camel = new Camel(["camel1"]);
      camel.addCards([]);
      assertEquals(camel.cards, ["camel1"]);
    });
  });
});
