export type SortKey = string | number | bigint;
export type SortDirection = "ascending" | "descending";

export type SortKeySelector<TValue, TKey extends SortKey> = (
  value: TValue,
  index: number,
  values: readonly TValue[],
) => TKey;

/**
 * Returns a stable sorted copy, evaluating each key exactly once.
 */
export function sortBy<TValue, TKey extends SortKey>(
  values: readonly TValue[],
  selectKey: SortKeySelector<TValue, TKey>,
  direction: SortDirection = "ascending",
): TValue[] {
  const multiplier = direction === "ascending" ? 1 : -1;
  return (
    values
      .map((value, index) => ({
        value,
        index,
        key: selectKey(value, index, values),
      }))
      // Sorting this newly-created decorated array cannot mutate the input.
      // eslint-disable-next-line unicorn/no-array-sort
      .sort((left, right) => {
        if (left.key < right.key) {
          return -1 * multiplier;
        }
        if (left.key > right.key) {
          return multiplier;
        }
        return left.index - right.index;
      })
      .map(({ value }) => value)
  );
}
