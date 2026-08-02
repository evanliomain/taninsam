# Roadmap

Every entry below is **additive** — a new folder under `src/`, a new line in `src/taninsam.ts`.
Nothing here touches a published signature, so the whole roadmap sits in the *Safe* column of the
`api-stability` skill. What is **not** reversible is the name and the edge-case behaviour of a
function once it ships: see [Freeze before shipping](#freeze-before-shipping).

Tiers are ordered by implementation effort, not by priority.

Inspiration drawn from [aoc-2022/tools](https://github.com/evanliomain/aoc-2022/tree/main/tools)
(*AoC*) and [ramda](https://github.com/ramda/ramda) (*R*).

## Shipped

- [x] arrayFromValue
- [x] castTo
- [x] chain
- [x] chainFn
- [x] countCharacter
- [x] entries
- [x] every
- [x] filter
- [x] filterUntil
- [x] find
- [x] flat
- [x] fromEntries
- [x] hash
- [x] head
- [x] ifElse
- [x] isArray
- [x] isBoolean
- [x] isEmpty
- [x] isEqualObjectOn
- [x] isNil
- [x] isNull
- [x] isNumber
- [x] isObject
- [x] isString
- [x] isUndefined
- [x] join
- [x] keys
- [x] lag
- [x] lagCircular
- [x] last
- [x] length
- [x] loopDoWhile
- [x] loopFor
- [x] loopUntil
- [x] loopWhile
- [x] map
- [x] mapMatrix
- [x] max
- [x] maxBy
- [x] min
- [x] minBy
- [x] not
- [x] partition
- [x] patternMatchingBy
- [x] patternMatchingWith
- [x] pop
- [x] preventNil
- [x] push
- [x] pushOrReplace
- [x] reduce
- [x] reverse
- [x] shift
- [x] some
- [x] sort
- [x] sortBy
- [x] split
- [x] sum
- [x] sumBy
- [x] tail
- [x] take
- [x] toObject
- [x] triangular
- [x] typeOf
- [x] uniq
- [x] unless
- [x] unshift
- [x] values

## Tier 1 — ready to port

A working implementation already exists in *AoC*; the work is the TSDoc contract, the types and
the spec.

| Function              | What it does                                                                                                 | From          |
| --------------------- | ------------------------------------------------------------------------------------------------------------ | ------------- |
| `patternMatching`     | Match the input by strict equality against `[value, rule]` tuples; a one-element tuple is the default rule.    | AoC, R `cond` |
| `chunk`               | Split an array into consecutive slices of `n` elements.                                                        | AoC `pack`, R `splitEvery` |

## Tier 2 — one-liners

### Combinators

| Function                | What it does                                                                                     | From              |
| ----------------------- | ------------------------------------------------------------------------------------------------ | ----------------- |
| `identity`              | Return the input unchanged.                                                                        | AoC, R            |
| `constant`              | Return a function that always returns the same value, whatever it is fed.                          | AoC, R `always`   |
| `when`                  | Apply `transform` when the predicate holds — the mirror of the shipped `unless`.                   | R                 |
| `defaultTo`             | Return the input, or a fallback value when it is `null` or `undefined`.                            | R                 |
| `allPass` / `anyPass`   | Combine predicates into one that requires all of them / any of them.                               | R                 |
| `forDefined`            | Run `f` only when the input is neither `null` nor `undefined`; same mould as the shipped `preventNil`. | —             |
| `forArray`              | Run `f` only when the input is an array, return `undefined` otherwise.                             | —                 |
| `forString`             | Run `f` only when the input is a string, return `undefined` otherwise.                             | —                 |
| `forObject`             | Run `f` only when the input is an object, return `undefined` otherwise.                            | —                 |
| `spread`                | Merge `f(obj)` into a copy of `obj`.                                                               | AoC               |
| `uncurry`               | Turn a function taking one array into a variadic one: `f([a, b])` becomes `f(a, b)`.               | AoC               |

### Numbers

| Function                                                       | What it does                                                            | From |
| -------------------------------------------------------------- | ------------------------------------------------------------------------ | ---- |
| `add`, `subtract`, `multiply`, `divide`, `modulo`, `inc`, `dec`, `negate` | Curried arithmetic, so the chain can compute without a lambda. | R    |
| `clamp`                                                        | Constrain a number between a minimum and a maximum.                       | R    |
| `mean`, `median`, `product`                                    | Companions to the shipped `sum` over an array of numbers.                 | R    |
| `gcd`                                                          | Greatest common divisor of two numbers.                                   | AoC `hcf` |
| `lcm`                                                          | Lowest common multiple, `a * b / gcd(a, b)`.                              | AoC  |
| `euclideanDivision`                                            | Return `{ q, m }`, the quotient and the remainder of `a / b`.             | AoC  |

### Strings and conversions

| Function                       | What it does                                                                | From                  |
| ------------------------------ | ----------------------------------------------------------------------------- | --------------------- |
| `toUpper`, `toLower`, `trim`   | The `String` methods, curried.                                                  | R                     |
| `startsWith` / `endsWith`      | True when the string — or the array — begins / ends with the given prefix.      | R                     |
| `replace`                      | `String.replace` curried on the pattern and the replacement.                    | AoC, R                |
| `test`                         | True when a regexp matches the string.                                          | AoC `matchRegexp`, R  |
| `match`                        | Return every match of a regexp, `[]` when there is none.                        | R                     |
| `parseNumber`                  | Parse a string into a number in a given base, 10 by default.                    | AoC                   |
| `toBinary` / `fromBinary`      | Number → base-2 string, and back.                                               | AoC                   |
| `stringToAscii` / `asciiToString` | String → array of char codes, and back.                                      | AoC                   |

## Tier 3 — list operations

### Sets

| Function              | What it does                                              | From |
| --------------------- | ----------------------------------------------------------- | ---- |
| `union`               | Every distinct element of both arrays.                        | R    |
| `intersection`        | The elements present in both arrays.                          | R    |
| `difference`          | The elements of the first array absent from the second.       | R    |
| `symmetricDifference` | The elements in one array or the other, but not in both.      | R    |
| `without`             | Drop from the array every element of a given list.            | R    |
| `includes`            | True when the array contains the value.                       | R    |

### Access and positional edits

| Function     | What it does                                                                       | From          |
| ------------ | ------------------------------------------------------------------------------------ | ------------- |
| `at`         | The element at an index, `undefined` out of bounds; a negative index counts from the end. | AoC, R `nth`  |
| `pickByIndex`| The elements at the given indexes, in the order the indexes are given.                 | AoC           |
| `replaceAt`  | A copy of the array with the element at an index replaced.                             | AoC, R `update` |
| `adjust`     | A copy of the array with `f` applied to the element at an index.                       | R             |
| `insert`     | A copy of the array with a value inserted at an index.                                 | R             |
| `remove`     | A copy of the array without `count` elements starting at an index.                     | R             |
| `move`       | A copy of the array with the element at one index moved to another.                    | R             |
| `slice`      | A copy of the array between two indexes.                                               | R             |

### Slicing and splitting

| Function                 | What it does                                                          | From |
| ------------------------ | ----------------------------------------------------------------------- | ---- |
| `drop`                   | Drop the `n` first elements — the mirror of the shipped `take`.           | R    |
| `takeLast` / `dropLast`  | The same two, counted from the end.                                       | R    |
| `takeWhile` / `dropWhile`| Take or drop the leading elements while a predicate holds.                | R    |
| `init`                   | Everything but the last element — the mirror of the shipped `tail`.       | R    |
| `splitAt`                | Split into `[before, after]` at an index.                                 | R    |
| `splitWhen`              | Split at the first element matching a predicate.                          | R    |
| `aperture`               | Every sliding window of `n` consecutive elements.                         | R    |
| `groupWith`              | Split into runs of consecutive elements satisfying a pairwise predicate.  | R    |

### Traversal and building

| Function                    | What it does                                                                     | From              |
| --------------------------- | ---------------------------------------------------------------------------------- | ----------------- |
| `none`                      | True when no element matches — the third of `every` / `some`.                        | R                 |
| `reject`                    | Keep the elements the predicate rejects — the inverse of the shipped `filter`.       | R                 |
| `findIndex`                 | The index of the first matching element, `-1` when there is none.                    | R                 |
| `findLast` / `findLastIndex`| The same two, searching from the end.                                                | R                 |
| `uniqBy`                    | `uniq` compared on the value an iteratee returns.                                    | R                 |
| `countBy`                   | Count the elements by the key an iteratee returns.                                   | R                 |
| `pluck`                     | Extract one property from every object of the array.                                 | R                 |
| `zip` / `zipWith`           | Pair two arrays element by element, raw or through an iteratee.                      | R                 |
| `zipObj`                    | Build an object from an array of keys and an array of values.                        | R                 |
| `intersperse`               | Insert a separator between every pair of elements.                                   | R                 |
| `flatten`                   | Flatten nested arrays at any depth — the shipped `flat` only goes one level down.     | R                 |
| `transpose`                 | Swap the rows and the columns of an array of arrays.                                 | R                 |
| `scan`                      | Like `reduce`, but returns every intermediate accumulator.                           | R                 |
| `range`                     | The integers from `from` included to `to` excluded.                                  | R                 |
| `times`                     | An array of size `n` filled by `f(index)`.                                           | AoC `makeArray`, R |
| `unfold`                    | Build an array by applying a function to a seed until it returns `false`.            | R                 |

## Tier 4 — object operations

| Function                | What it does                                                                 | From              |
| ----------------------- | ------------------------------------------------------------------------------ | ----------------- |
| `prop`                  | Read one property.                                                               | R                 |
| `props`                 | Read several properties as an array, in the order asked.                         | R                 |
| `path`                  | Read a nested property through a key path, `undefined` as soon as the path breaks. | R               |
| `propOr` / `pathOr`     | The same two, with a fallback instead of `undefined`.                            | R                 |
| `has`                   | True when the object owns the key.                                               | R                 |
| `assoc`                 | A copy of the object with one key set.                                           | R                 |
| `assocPath`             | A copy of the object with a nested key set, creating the missing levels.         | R                 |
| `dissoc`                | A copy of the object without one key.                                            | R                 |
| `objOf`                 | Build a one-key object from a value.                                             | R                 |
| `mapValues`             | Apply an iteratee to every value of the object.                                  | R `mapObjIndexed` |
| `mapKeys`               | Apply an iteratee to every key of the object.                                    | R                 |
| `renameKeys`            | Rename the keys listed in a mapping, leave the others alone.                     | R                 |
| `invertObj`             | Swap the keys and the values.                                                    | R                 |
| `evolve`                | A copy of the object with a transformation applied to each listed key.           | R                 |
| `merge`                 | Shallow-merge two objects.                                                       | R `mergeRight`    |
| `mergeWith`             | Same, resolving each conflicting key through a function.                         | R                 |
| `mergeDeep`             | Recursive merge, descending into the nested objects.                             | R `mergeDeepRight`|
| `propEq` / `whereEq`    | Predicate on one property / on a set of properties of an object.                 | R                 |
| `equals`                | Deep structural equality, built on the shipped `hash`.                           | AoC `equal`, R    |

## Tier 5 — the matrix family

One coherent batch. The only design work is a shared `Matrix<T>` and `Coordinate` in
`src/@types/`; `mapMatrix` (tier 1) belongs here too.

| Function                     | What it does                                                            | From |
| ---------------------------- | ------------------------------------------------------------------------- | ---- |
| `makeMatrix`                 | Build a `sizeX × sizeY` matrix, each cell filled by `f(x, y)`.              | AoC  |
| `atMatrix`                   | The cell at `{ x, y }`, `undefined` outside the matrix.                     | AoC  |
| `inMatrix`                   | True when `{ x, y }` falls inside the matrix.                               | AoC  |
| `findMatrix`                 | The `{ x, y }` of the first matching cell, `undefined` when there is none.  | AoC  |
| `findAllMatrix`              | Every `{ x, y }` whose cell matches.                                        | AoC  |
| `everyMatrix` / `someMatrix` | The matrix counterparts of `every` and `some`.                              | AoC  |
| `reduceMatrix`               | Reduce over every cell, in row-major order.                                 | AoC  |
| `printMatrix`                | Render the matrix as a string, one line per row.                            | AoC  |

## Tier 6 — output structure to define first

These are not hard to write; they are hard to *name a return shape for*, and that shape is frozen
on the first release.

| Function               | What it does                                                          | To decide                                             |
| ---------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------- |
| `group`                | Group the elements of an array by the key an iteratee returns.            | Plain object, `Map`, or an array of `{ key, values }`? |
| `topFlop`              | Return the `n` best and the `n` worst elements of an array.               | The shape of the pair, and how ties break.             |
| `mergeOn`              | Merge two arrays of objects on a shared key.                              | What becomes of the rows unmatched on either side.     |
| `tree`                 | Build a tree from a flat list, given parent and child accessors.          | The node shape, and where orphans go.                  |
| `treeFlat`             | Flatten a tree back into a flat list.                                     | Depth-first or breadth-first, and whether depth is carried. |
| `treeMap`              | Apply an iteratee to every node, preserving the structure.                | Whether the iteratee sees the path down to the node.   |
| `treeWalkBottomToTop`  | Walk from the leaves up, folding each node's children results into it.    | The accumulator signature.                             |

## Freeze before shipping

Four choices that cannot be revisited once published:

1. **`chunk` on a partial last slice.** *AoC*'s `pack` pads with `undefined`
   (`chunk(3)([1,2,3,4])` → `[[1,2,3],[4,undefined,undefined]]`); the idiomatic answer is
   `[[1,2,3],[4]]`.
2. **`filterUntil`'s name.** It is a *drop-while*, and the name says otherwise. A later rename is
   forbidden — at best a `@deprecated` tag and a duplicate.
3. **Out-of-bounds and wrong-type inputs.** `undefined` or `throw`. Pick one and hold it across
   `at`, `atMatrix`, `pickByIndex` and the whole tier 3.
4. **`patternMatching` with no match.** *AoC* returns the input untouched. Whatever the choice, it
   goes in the TSDoc.
