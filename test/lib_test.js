import { assertEquals, assertNotEquals } from "jsr:@std/assert/";
import { describe, it } from "jsr:@std/testing/bdd";
import { shuffle } from "../src/lib.js";

describe("Shuffle Function", () => {
  it("should return an array of the same length", () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = shuffle(array);
    assertEquals(shuffled.length, array.length);
  });

  it("should not return the array in the same order", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const shuffled = shuffle(array);
    assertNotEquals(shuffled, array);
  });

  it("should contain the same elements after shuffling", () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = shuffle(array);
    assertEquals(shuffled.sort(), array.sort());
  });
});
