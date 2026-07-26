import { describe, expect, expectTypeOf, it, vi } from "vitest";

import { sortBy } from "../src/index.js";

describe("sortBy", () => {
  const values = [
    { name: "first two", rank: 2 },
    { name: "one", rank: 1 },
    { name: "second two", rank: 2 },
  ] as const;

  it("sorts ascending by default and keeps equal keys stable", () => {
    expect(sortBy(values, (value) => value.rank)).toEqual([
      values[1],
      values[0],
      values[2],
    ]);
  });

  it("sorts descending", () => {
    expect(sortBy(values, (value) => value.rank, "descending")).toEqual([
      values[0],
      values[2],
      values[1],
    ]);
  });

  it("supports string and bigint keys", () => {
    expect(sortBy(["b", "a"], (value) => value)).toEqual(["a", "b"]);
    expect(sortBy([2n, 1n], (value) => value)).toEqual([1n, 2n]);
  });

  it("evaluates each key once with original-array context", () => {
    const selectKey = vi.fn<
      (
        value: (typeof values)[number],
        index: number,
        input: readonly (typeof values)[number][],
      ) => number
    >((value) => value.rank);

    const result = sortBy(values, selectKey);

    expect(selectKey).toHaveBeenCalledTimes(values.length);
    expect(selectKey).toHaveBeenNthCalledWith(1, values[0], 0, values);
    expect(values[0].name).toBe("first two");
    expectTypeOf(result).toEqualTypeOf<(typeof values)[number][]>();
  });

  it("handles empty input", () => {
    expect(sortBy([], String)).toEqual([]);
  });
});
