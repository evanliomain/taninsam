---
name: commit-message
description: Write a taninsam commit message that semantic-release can act on — the conventional-commit type/scope/description rules used in this repo, which type produces which version bump, and the ban on breaking-change markers. Use before committing anything here, or when asked what type or scope a change should use.
---

# Commit messages are the release process

`master` is released automatically by semantic-release: it reads the commits, decides the version,
publishes to npm, tags GitHub and writes the release notes. Nobody edits a version number by hand.
A malformed message either releases nothing or releases the wrong thing, so treat the format as
production code.

`yarn commit` (commitizen) is interactive and unusable from a non-interactive session — write the
message yourself with `git commit -m`, following exactly the same format.

## Format

```
<type>(<scope>): <short description>

<optional long description>
```

- **type** — one of `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`,
  `chore`, `revert`. Nothing else.
- **scope** — the function name in camelCase for library work (`takeLast`, `sortBy`, `chainFn`).
  For everything else, the thing you touched: `package`, `README`, `documentation`, `CI/CD`,
  as in the existing history.
- **short description** — imperative present tense ("add", not "added" or "adds"), no capital
  first letter, no trailing period, ideally under 72 characters.
- **long description** — same imperative present tense; explain the motivation and contrast it
  with the previous behaviour. Worth writing for any bug fix, since it lands in the release notes.
- English only.

## What each type releases

| Type | Version bump |
| --- | --- |
| `feat` | **minor** |
| `fix`, `perf`, `revert` | **patch** |
| `docs`, `style`, `refactor`, `test`, `build`, `ci`, `chore` | none |

So: a new function is `feat`. Making an existing one faster with identical behaviour is `perf`.
Correcting behaviour that contradicted its documentation is `fix` — and the long description
should state what used to happen. Adding tests or killing mutants is `test`. Improving TSDoc is
`docs`. Internal rewrite with identical behaviour is `refactor`.

When a single change spans several concerns, split it into several commits, one type each. Do not
smuggle a `feat` into a `chore`.

## Never mark a breaking change

Do not write a `BREAKING CHANGE:` footer, and do not use the `feat!:` / `fix!:` form. Either
triggers a major release, and this library does not ship breaking changes — see the
`api-stability` skill. If a change appears to require one, stop before committing, explain the
trade-off, and let the user decide.

## Examples from this repo's history

```
feat(takeLast): add takeLast function
fix(hash): distinguish a numeric key from its string form
perf(flat): concat once instead of spreading on each element
test(sortBy): cover tie-breaking on the third key
docs(map): document the links parameter passed to the iteratee
chore(package): update vitest, @vitest/coverage-v8
ci(mutation-testing): cache the stryker run
```

## Before committing

```bash
yarn vitest run --coverage    # 100% everywhere
yarn lint
```

The pre-commit hook runs prettier, `eslint --fix` and the test suite, so a commit that fails the
suite will not land. Note that its `git add` line has no pathspec and is a no-op: the hook rewrites
files in the working tree but does **not** re-stage them, so formatting fixes land as uncommitted
changes after the commit. Run `yarn format:pre-commit && yarn lint:pre-commit` yourself and stage
the result before committing, and check `git status` afterwards.

Commit only when the user asked for it, and never to `master` directly: branch as
`feature/<name>` and open a PR, as `CONTRIBUTING.md` describes.
