---
name: new-function
description: Add a function to the taninsam library with its Documentation Driven then Test Driven workflow — scaffold with plop, write the TSDoc contract first, then the vitest spec, then the implementation, then verify 100% coverage and mutation resistance. Use whenever asked to add, create, implement or finish a taninsam function.
---

# Add a function to taninsam

The order is the method. Documentation is the specification, tests encode it, code satisfies it.
Never write the implementation first — not even "just to see".

## 1. Scaffold

```bash
npx plop function "take last"        # non-interactive; `yarn gen` prompts instead
```

Creates `src/take-last/{index.ts,take-last.ts,take-last.spec.ts}` and rebuilds
`src/taninsam.ts`. Then **remove the `export * from './group-by';` line** plop re-adds to the
barrel (stale empty folder, breaks the build).

Check `ROADMAP.md` first: the function may already be planned there under a specific name, and
the entry gets ticked in the same commit.

## 2. Documentation — write the whole contract, then stop

Fill `src/<name>/<name>.ts` with the signature and its TSDoc. No body logic yet: leave the
generated stub, or `throw new Error('not implemented')`.

```typescript
/**
 * @module array=>array
 */
import { Iteratee, Links } from '../@types';
/**
 * One sentence saying what the function does, then any precision
 * about edge cases, wrapped around 72 columns.
 * See the [native map](https://developer.mozilla.org/…) for more informations.
 * @param iteratee The iteratee invoked per element.
 * @return the function to apply on the array to transform
 * @example
 * ```
 * map<number, number>(x => 1 + x)([1, 2, 3, 4, 5]) // [2, 3, 4, 5, 6]
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 3, 4, 5])
 *   .chain(map<number, number>(x => 1 + x))
 *   .value() // [2, 3, 4, 5, 6]
 * ```
 */
```

Rules:

- Replace the template's `@module TBD_A=>TBD_B`. Reuse an existing tag, do not invent a variant —
  it groups the function in the generated docs. In use today: `array=>array`, `any=>boolean`,
  `array=>any`, `array=>number`, `any=>any`, `object=>array`, `array=>object`, `array=>boolean`,
  `any=>string`, `string|array=>string|array`, `string=>number`, `string=>array`, `array=>string`,
  `object=>object`, `object=>boolean`, `T=>array`, `chain`.
- One `@param` per parameter, `@return` describing *the returned function*, not the value —
  "the function to apply on the array to …".
- Both `@example` blocks: bare call, then `Using the chain`. Every documented example becomes a
  test in step 3, so write the exact values you intend to guarantee.
- Curried shape: `export function f<T>(config): (input: X) => Y`.
- `ReadonlyArray<T>`, never `T[]`. Type parameters explicit enough that callers never need `any`.
- Accept `links?: Links` as a second parameter of the returned function only if the function
  forwards them to a user callback (see `map`, `filter`).
- Private helpers in the same file get their own `/** @ignore */` block.
- English, and check the spelling of the prose you write.

## 3. Tests — encode the behaviour, watch them fail

```typescript
import { describe, expect, test, vi } from 'vitest';
import { takeLast } from './take-last';

describe('takeLast function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    takeLast(2)(input);
    expect(input).toEqual([1, 2, 3, 4, 5]);
  });

  test('[1, 2, 3, 4, 5] |> takeLast(2) === [4, 5]', () => {
    expect(takeLast(2)(input)).toEqual([4, 5]);
  });

  test('[] |> takeLast(2) === []', () => {
    expect(takeLast(2)([])).toEqual([]);
  });
});
```

- `describe('<camelCaseName> function', …)`, and `test` (never `it`).
- The purity test comes first in every spec: call the function, then assert the input is
  unchanged.
- Name each test in pipe notation — `'<input> |> <call> === <output>'` — so the spec reads as the
  truth table of the function.
- Cover every documented `@example`, plus: empty array or string, single element, the boundaries
  of any numeric parameter (`n`, `n - 1`, `n + 1`, `0`, negative), and `undefined`/`null` when the
  signature admits them.
- Predicates assert `toBe(true)` / `toBe(false)`. Thrown errors use
  `toThrowErrorMatchingSnapshot()`.
- When the function takes a callback, assert the contract it is called with:

```typescript
test('call the iteree callback with correct inputs', () => {
  const cb = vi.fn((x: number) => 1 + x);
  const link = { fake: 'fake' };
  map<number, number>(cb)(input, link);
  input.forEach((i, index) => {
    expect(cb.mock.calls[index][0]).toBe(i);
    expect(cb.mock.calls[index][1]).toBe(index);
    expect(cb.mock.calls[index][2]).toEqual(input);
    expect(cb.mock.calls[index][3]).toBe(link);
  });
});
```

**On snapshots.** Most existing specs use `toMatchSnapshot()`, and it is fine for a settled
function, but it is a trap in this workflow: written before the implementation, it records
whatever the stub returns and then passes forever. So while the function is being written, assert
values explicitly with `toEqual`/`toBe`. If you do use snapshots, delete
`src/<name>/__snapshots__/` once the implementation is correct, regenerate, and read every
recorded value against the documented `@example` before committing — the `.snap` file is part of
the specification.

Run `yarn test:watch` and confirm the new tests fail for the right reason.

## 4. Implementation

Write the smallest body that turns the suite green, then look at it again for style:

- Yoda conditions: `0 === array.length`, `undefined !== initialValue`.
- Never mutate the input — `array.slice().sort(…)`, spreads, `filter`, `map`.
- Only `0`, `1`, `-1` may appear as bare numbers; name anything else.
- Blank line before a `return` preceded by other statements.
- Compose existing taninsam functions when it reads better than raw JavaScript —
  `cast-to`, `partition` and `hash` are built that way. Import them by relative path.
- No dependency, no Node built-in, no polyfill.

## 5. Verify

```bash
yarn vitest run --coverage   # 100% on branches, functions, lines, statements — no exception
yarn lint
yarn stryker                 # then kill every survivor: see the kill-mutants skill
```

Coverage below 100% fails the thresholds in `vitest.config.ts`. A surviving mutant means the
tests accept a behaviour the documentation forbids: fix the tests, not the threshold.

## 6. Wire it up and commit

- `src/<name>/index.ts` re-exports the function; `src/taninsam.ts` exports the folder,
  alphabetically; `group-by` is not in the barrel.
- Tick the function in `ROADMAP.md` if it is listed.
- A new function is a `feat` — it releases a minor version. See the `commit-message` skill.

```
feat(takeLast): add takeLast function
```

Adding a function is never a breaking change; changing one usually is. Before touching an
existing function, read the `api-stability` skill.
