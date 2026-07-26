# `@lucid-softworks/array-sort-by`

Return a stable sorted copy using a derived string, number, or bigint key.

```ts
import { sortBy } from "@lucid-softworks/array-sort-by";

const users = [
  { lastName: "Lovelace", score: 10 },
  { lastName: "Hopper", score: 9 },
];
sortBy(users, (user) => user.lastName);
sortBy(users, (user) => user.score, "descending");
```

Keys are evaluated exactly once using the value, original index, and readonly
input. Equal keys preserve input order, and the input is never mutated.
