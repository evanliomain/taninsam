---
name: api-stability
description: Change an existing taninsam function without breaking its users — what may and may not be edited, the overload pattern for extending a signature, deprecating instead of removing, and how to audit a diff for breaking changes. Use when modifying, extending, fixing, renaming or deleting an already-published function, or when reviewing whether a change is safe to release.
---

# Never break a user

Taninsam is stable and must stay stable: any user must be able to bump to the latest version
without reading a migration guide. Since semantic-release publishes straight from `master`, a
breaking change ships silently as a minor or patch bump — there is no review step that catches it
for you. This constraint outranks elegance, consistency and personal taste.

The published API is everything reachable from `src/taninsam.ts`: the exported functions, their
type signatures, the types re-exported from `src/@types/`, and the observable behaviour of each
function on every input it accepts today.

## Safe

- Adding a new function, folder and barrel entry.
- Adding an **overload** ahead of the existing signature (`reduce` is the precedent in this repo).
- Adding an optional parameter at the end, whose absence preserves today's behaviour exactly.
- Accepting an input type that previously threw or was rejected by the compiler — `take` handling
  strings as well as arrays is that pattern.
- Making a return type *more* specific when every previously-returned value still satisfies it
  (adding a type guard `value is T`, removing `| undefined` that could never occur).
- Fixing a genuine bug: an input whose documented behaviour and actual behaviour disagree. Say so
  in the commit body, and keep the documented behaviour.
- Internal refactoring, performance work, added `@example` blocks, new tests.

## Breaking — do not

- Rename or remove an exported function, or drop a line from `src/taninsam.ts`.
- Rename a parameter that callers pass by object destructuring, reorder parameters, or change
  arity in a way that shifts what an existing call means.
- Narrow an accepted input type, or make an optional parameter required.
- Widen a return type (adding `| undefined`, `| null`, or a union member) — every consumer's
  exhaustive handling breaks.
- Change what an existing input returns, including: the order of a returned collection, whether a
  new array or the same reference comes back, `undefined` versus a thrown error on an edge case,
  the exact string produced by `hash`.
- Start throwing where the function used to return, or stop throwing where a user may rely on the
  error.
- Change a shared type in `src/@types/` in a way that invalidates existing implementations of it
  (`Iteratee`, `Links`, `Chain`, `ChainFn`, `Result`).
- Raise the `engines.node` floor, or add a runtime dependency.

## Extending a signature

Overload; never edit the signature in place. Keep the existing form as one of the overloads, add
the new form, and give the implementation an untyped signature that serves both:

```typescript
export function reduce<T, U>(
  iteratee: (previousValue: U, currentValue: T, currentIndex: number, array: ReadonlyArray<T>) => U,
  initialValue: U,
): (array: ReadonlyArray<T>) => U;

export function reduce<T>(
  iteratee: (previousValue: T, currentValue: T, currentIndex: number, array: ReadonlyArray<T>) => T,
): (array: ReadonlyArray<T>) => T;

export function reduce(iteratee, initialValue?) {
  if (undefined !== initialValue) {
    return array => array.reduce(iteratee, initialValue);
  }

  return array => array.reduce(iteratee);
}
```

The existing spec must keep passing untouched, and the new overload needs its own tests plus its
own `@example` block. If the two behaviours cannot coexist in one function, add a new function
with a new name instead.

## Retiring something

There is no removal. Mark it and keep it working:

```typescript
/**
 * @deprecated since v3.4 — use {@link takeLast} instead, which handles strings too.
 */
```

Keep the implementation, keep the tests, keep the barrel entry. The `@deprecated` tag surfaces in
the generated documentation and in editors, which is the whole mechanism.

## Auditing a diff

```bash
git diff master -- src/taninsam.ts     # any removed line is breaking
git diff master -- 'src/**/__snapshots__/*.snap'
yarn vitest run --coverage
yarn build:compiled                    # the emitted dist/types are the contract users compile against
```

- **A modified or deleted snapshot in an existing spec is the strongest signal of a breaking
  change.** Behaviour was pinned, and the pin moved. Either the change is wrong, or it is a
  documented bug fix — decide explicitly, never regenerate snapshots to make the suite pass.
- Likewise, an existing test you had to edit is a red flag. New behaviour goes in new tests.
- Compare the emitted `dist/types/**` declarations before and after for the function you touched:
  the diff is exactly what a user's compiler will see.

## Committing

Never write `BREAKING CHANGE:` in a footer and never use `feat!:` — that triggers a major release
and, in this repo, means something went wrong upstream of the commit. If you believe a change
genuinely requires breaking the API, do not commit it: describe the trade-off and let the user
decide. See the `commit-message` skill.
