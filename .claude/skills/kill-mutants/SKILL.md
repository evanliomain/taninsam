---
name: kill-mutants
description: Raise the Stryker mutation score of taninsam — run mutation testing, read the surviving mutants, and add the unit tests that kill them. Use when asked about mutation testing, Stryker, mutation score, surviving mutants, or to harden the tests of a function beyond line coverage.
---

# Kill the surviving mutants

100% line coverage only proves the code ran. The mutation score proves the tests would notice if
it behaved differently. Maximising it is a goal of this library, so a survivor is a real defect in
the specification — never something to configure away.

## Run it

```bash
yarn stryker                 # clear-text + progress in the terminal, html in dist/stryker-reports/
yarn stryker:debug           # add trace logging when Stryker itself misbehaves
```

Full runs take a while (every `src/**/*.ts` except specs). To iterate on one function:

```bash
npx stryker run --mutate "src/take-last/*.ts"
```

Read the clear-text output: each survivor prints the file, the line, and the mutation applied
(`-` original, `+` mutant). `dist/stryker-reports/report.html` shows the same annotated in source.
`coverageAnalysis: 'perTest'` is on, so a mutant reported as *survived* really was covered by
tests that all still passed — as opposed to *no coverage*, which means the coverage report and the
mutation report disagree and the line is simply untested.

## Diagnose

For each survivor, ask what input distinguishes the mutant from the original, then write the test
that uses it. The mutant is a question the documentation already answers; the tests just failed to
ask it.

Frequent survivors in this codebase:

| Mutation | The test that kills it |
| --- | --- |
| `<` → `<=`, `>=` → `>` (`take`, `max-by`, boundary guards) | Assert exactly at the boundary: `n`, `n - 1`, `n + 1`, `0`, and the equality case where both sides match |
| `0 === array.length` → `1 === …` / `true` / `false` | Test the empty collection *and* a one-element collection, both with explicit expected values |
| Early-return guard block removed | Provide the input that only that guard handles (`[]`, `undefined`, single element) and assert the exact returned value |
| Arithmetic flipped (`+` → `-`, `**` → `/`) | Use operands where both results differ — never `0`, `1`, or two equal numbers |
| String literal → `""` (error messages, `hash` prefixes like `` `b(${…})` ``) | `toThrowErrorMatchingSnapshot()` for errors; for `hash`, assert two values of different types do **not** collide |
| Array literal `[]` → `["Stryker was here"]` (accumulator seeds) | Assert the result of reducing an empty collection, not just a populated one |
| Conditional expression forced to `true`/`false` | Cover both branches with distinct observable outputs, not with two inputs that happen to produce the same value |
| Comparison of a sort/compare result (`sort-by`, `ComparaisonResultChoice`) | Sort data that needs the second and third key to break a tie, plus an already-sorted and a reverse-sorted input |
| Logical operator swapped (`\|\|` → `&&` in `is-empty`, `is-nil`) | One test per disjunct, each true in isolation, plus one input where all are false |

## Strengthen, don't loosen

- Prefer `toEqual`/`toBe` with the literal expected value over `toBeTruthy`/`toBeFalsy`:
  `expect(isEmpty(0)).toBe(false)` kills mutants that `toBeFalsy()` lets through.
- A `toMatchSnapshot()` whose `.snap` was generated from mutated or stubbed output pins the wrong
  behaviour and survives everything. Read the `.snap` values against the `@example` blocks in the
  TSDoc; regenerate the folder if they disagree.
- If a survivor is genuinely equivalent — a mutation that cannot change any observable output for
  any admissible input — the code is saying something it does not need to say. Simplify the code
  so the mutation point disappears, rather than adding a `// Stryker disable` comment. Reach for a
  disable comment only when the simplification would itself be a breaking change, and explain why
  in the comment.
- New tests must keep coverage at 100% and the suite deterministic: no `Date.now()`, no
  `Math.random()`, no ordering assumption beyond what the function guarantees.

## Finish

```bash
yarn vitest run --coverage   # still 100% everywhere
yarn stryker                 # score went up, no new survivor
yarn lint
```

Tests-only work is a `test` commit, and it releases nothing:

```
test(takeLast): cover boundary of n to kill surviving mutants
```

If killing a mutant required changing the function's behaviour, stop — that is a breaking change.
Read the `api-stability` skill first.
