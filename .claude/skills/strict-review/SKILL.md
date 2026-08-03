---
name: strict-review
description: Review with a hostile eye everything a session produced in taninsam — the three invariants, the conventions, the spirit of the library, the commit messages — then fix every confirmed finding and fold each fix into the commit it belongs to with `git commit --fixup` and `git rebase --autosquash`. Use at the end of a session, when asked to re-read, critique or proofread the code and the commits just produced, or when the end-of-session review gate fires.
---

# The last reader before the release

`master` is published by semantic-release with nobody in between: whatever this review lets
through reaches users, and cannot be taken back — invariant 1 forbids the fix that would break
them. This review *is* the quality gate. Act accordingly.

## Posture

- **The default verdict is rejected.** "Clean" is something you demonstrate command by command;
  it is never the starting assumption.
- Judge the code, not the story told about it. `git diff` and the files on disk are the only
  admissible evidence. What the session claimed it did counts for nothing here.
- Every finding carries three things: `file:line`, the rule it breaks, and the fix. A finding with
  no rule behind it is taste — label it `taste`, report it, and leave the code alone.
- No praise, no summary of what works, no "otherwise the code is good". Only what is wrong.
- Reporting a finding that turns out to be wrong costs one discussion. Missing one ships forever.
  When the two are in balance, report.
- **Never lower a bar to make the diff pass**: not a coverage threshold, not a snapshot, not an
  existing test, not a `@module` tag, not an eslint rule, not a `// eslint-disable`.
- You are reviewing this session's work, not the repository. Pre-existing debt on `master` is out
  of scope: at most one closing line mentioning it, never a fix — it would pollute the fixups.

## 1. Establish the review surface

```bash
git rev-parse --abbrev-ref HEAD              # never rewrite master; on master, review only
git rev-parse HEAD                           # note this sha: the undo point for step 10
git status --porcelain                        # uncommitted work is part of the surface
git log --oneline master..HEAD                 # the commits under review
git log --oneline @{upstream}..HEAD           # ...of which only these may be rewritten
git diff master...HEAD                         # read all of it, top to bottom
```

Read the whole diff before running a single check. A reviewer who checks rules without having
understood the code finds typos and misses the wrong algorithm.

If `master..HEAD` is empty and the working tree is clean, there is nothing to review: say so and
stop. Do not invent work.

## 2. Gates — before reading anything, prove the diff stands up

| Command | Demands |
| --- | --- |
| `yarn vitest run --coverage` | green, and **100%** on branches, functions, lines, statements |
| `yarn lint` | zero error, zero warning |
| `yarn build:compiled` | compiles; the emitted `dist/types` is the users' contract |
| `npx stryker run --mutate 'src/<name>/*.ts,!src/**/*.spec.ts'` | every surviving mutant killed, for each function touched |

Never `yarn test:ci` — outside CI it is watch mode and hangs.

`--mutate` **replaces** the `mutate` array of `stryker.config.mjs`, it does not extend it, so the
`!src/**/*.spec.ts` of the config has to be repeated on the command line. Drop it and Stryker
mutates the spec files too: it then reports survivors that live in the tests and cannot be killed,
and a function whose implementation scores 100% comes back at 65%. Two more traps of that flag:
repeated `--mutate` do not accumulate, only the last one applies, and a brace glob `{a,b}` matches
nothing at all — several functions go in one comma-separated value:

```bash
npx stryker run --mutate 'src/lag/*.ts,src/chunk/*.ts,!src/**/*.spec.ts'
```

A failing gate is a blocker: fix it before continuing, because a diff that does not build or does
not pass cannot be reviewed. Stryker is slow; scope it to the functions in the diff, and run it —
"tests are green" is not evidence that the tests test anything. See the `kill-mutants` skill.

A diff that touches no file under `src/` — tooling, documentation, CI — still owes the suite and
`yarn lint`, since it must not have broken them; `build:compiled` and Stryker have nothing to
measure and are skipped. Say in the report which gates you skipped and why. Silence about a
skipped gate reads as a gate that passed.

Then check nobody moved the goalposts:

```bash
git diff master...HEAD -- vitest.config.ts stryker.config.mjs stryker.config.ci.mjs .eslintrc.js
git diff master...HEAD | grep -nE '^\+.*(eslint-disable|@ts-ignore|@ts-expect-error|istanbul ignore|Stryker disable)'
```

Any hit is a blocker until justified out loud. `thresholds.autoUpdate` is on: a diff that touches
`vitest.config.ts` is a diff that let coverage slip. The second command looks at added lines only
— `src/` carries a few old, legitimate `no-explicit-any` disables, and they are not this
session's business.

## 3. Invariants — each violation is a blocker

```bash
git diff master...HEAD -- src/taninsam.ts | grep '^-[^-]'   # a removed export is breaking
git diff master...HEAD -- package.json yarn.lock            # dependencies must stay {}
grep -rn "from '[^.]" src/ --include='*.ts' | grep -v '\.spec\.ts:'   # relative imports only
git diff master...HEAD -- 'src/**/__snapshots__/*.snap'
git diff master...HEAD -- 'src/**/*.spec.ts' | grep '^-[^-]'
```

The third command excludes the specs on purpose: `import … from 'vitest'` is a devDependency and
allowed there, nowhere else.

1. **No breaking change.** Renamed or removed export, reordered or narrowed parameter, widened
   return type, changed behaviour on an input that already worked, a `throw` where there used to
   be a value. A **modified or deleted snapshot of an existing function**, or an **existing test
   that had to be edited**, is the strongest signal there is: behaviour was pinned and the pin
   moved. Do not accept "the old value was wrong" without the documented contract to prove it.
   Audit against the `api-stability` skill; extensions go through overloads, never in place.
2. **Zero runtime dependencies.** A new entry under `dependencies`, an import of a Node built-in,
   a polyfill: blocker. devDependencies are fine.
3. **100% coverage, highest possible mutation score.** Not the threshold being met by accident —
   the tests actually forbidding the wrong behaviour.

## 4. The contract: signature and TSDoc

Documentation is the specification (`new-function` skill), so it is reviewed as the specification.

- Curried shape `f(config)(input)`, `ReadonlyArray<T>` and never `T[]`, type parameters explicit
  enough that no caller needs `any`, no `any` in the signature.
- `@module` tag present and **taken from the existing list** — never a new variant:
  `grep -h "@module" src/*/*.ts | sort -u`. That listing includes `TBD_A=>TBD_B`, which is the
  plop placeholder and never a valid tag: leaving one behind is a blocker.
- One `@param` per parameter. `@return` describes *the returned function* ("the function to apply
  on the array to …"), not the value.
- Both `@example` blocks: the bare call, then `Using the chain`. **Every documented value must be
  the value the code actually returns** — run the example if you are not certain. A wrong example
  is a wrong specification, which is worse than a wrong implementation.
- Edge cases named in prose: empty input, out-of-range parameter, what is *not* done (no padding,
  no mutation). If the prose is silent on an edge case the tests cover, the documentation is
  incomplete; if the tests are silent on an edge case the prose promises, the tests are.
- `links?: Links` on the returned function only when the function forwards them to a user
  callback.
- Private helpers carry `/** @ignore */`.
- English, spell-checked, wrapped around 72 columns. Any other language is a blocker.

## 5. Tests

```bash
grep -n "\bit(" src/<name>/*.spec.ts                    # must be empty: `test`, never `it`
grep -n "describe(" src/<name>/*.spec.ts                # 'camelCaseName function'
grep -n "toMatchSnapshot\|MatchingSnapshot" src/<name>/*.spec.ts
```

- The purity test comes **first** in every spec, and asserts the input is unchanged after the
  call. Missing purity test: must-fix.
- Test names in pipe notation, `'<input> |> <call> === <output>'`, so the spec reads as a truth
  table. A test named `'works'` or `'should return the right thing'` is a must-fix.
- One test per documented `@example`, with the documented values.
- Boundaries, all of them: empty array or string, single element, `n - 1` / `n` / `n + 1`, `0`,
  negative, and `undefined`/`null` wherever the signature admits them. Name each missing one.
- Predicates assert `toBe(true)` / `toBe(false)`, not truthiness. Errors use
  `toThrowErrorMatchingSnapshot()`.
- A callback-taking function must assert what its callback receives (value, index, whole array,
  `links`) — not merely the result.
- **A `toMatchSnapshot()` written during this session is guilty until proven innocent**: written
  before the implementation, it records the stub and passes forever. Open the `.snap` and read
  every recorded value against the documented `@example`. An unread snapshot is not a test.
- Tests must fail if the implementation is wrong. Mentally mutate the body — swap `<` for `<=`,
  drop the guard, return the input — and find the test that dies. None? That is the finding, and
  Stryker will confirm it.

## 6. Implementation style

- **Yoda conditions**, everywhere a literal is compared — every hit is a must-fix
  (`0 === x % 2`, not `x % 2 === 0`):

  ```bash
  grep -rEn '[!=]==[[:space:]]*(-?[0-9]+|true|false|null|undefined)' src/<name>/*.ts |
    grep -vE ':[0-9]+:[[:space:]]*\*'
  ```

  The second grep drops TSDoc lines, where the existing examples do not follow the rule. Compared
  string literals need the same treatment; the eye catches those.
- Purity: no mutation of any input. `slice().sort()`, spreads, `filter`, `map`. A `push`, a
  `sort()` on a parameter, an assignment to a field of an argument: blocker.
- `no-magic-numbers` allows `0`, `1`, `-1` only. Anything else must be a named constant — eslint
  catches it, but so should you, since a named constant is also documentation.
- Blank line before a `return` that follows other statements:
  `grep -EnB1 '^[[:space:]]+return ' src/<name>/*.ts`. Most hits are a `return` opening its block,
  which needs nothing; you are looking for the one preceded by a statement.
- **Reuse before reinvention.** A hand-rolled loop where `loopFor`, `reduce`, `chunk`, `partition`,
  `entries`, `castTo`… would read better is a must-fix: composing existing functions is the spirit
  of the library, and `chunk`, `cast-to`, `partition`, `hash` and `entries` are the precedents.
  Before accepting any helper, grep `src/` for a function that already does it.
- Dead code, defensive branches no input can reach (they cost you the 100%), a parameter never
  used, an exported thing nobody exports: findings.
- One folder per function, kebab-case, exposing the camelCase function; the file, the folder and
  the exported name agree.

## 7. Wiring

```bash
grep -n "group-by" src/taninsam.ts                       # must print nothing
grep -o "'\./[^']*'" src/taninsam.ts | sort -c && echo "barrel sorted"
cat src/<name>/index.ts                                   # export * from './<name>';
git diff master...HEAD -- ROADMAP.md
```

The `group-by` line re-added by plop breaks the build. The barrel is alphabetical. A function
listed in `ROADMAP.md` is ticked in the same commit that adds it, under the name the roadmap
chose.

## 8. Commit messages

The message format *is* the release process (`commit-message` skill), so a malformed message is a
release bug, not cosmetics.

```bash
git log --format='%h %s' master..HEAD
git log --format='%s' master..HEAD | grep -vE '^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)\([a-zA-Z0-9./-]+\): [a-z].*[^.]$'
git log --format='%s' master..HEAD | grep -E '.{73,}'                    # subjects over 72 chars
git log --format='%B' master..HEAD | grep -n 'BREAKING CHANGE\|!:'
```

The second command prints every offender: wrong or missing type, missing scope, capital first
letter, trailing period, past tense. The last must print nothing — a breaking-change marker in
this repo means something went wrong upstream of the commit; stop and hand the decision to the
user.

Then, for each commit, the part no regex catches:

```bash
git show --stat <sha>
```

- **Does the type match what the diff does?** A `feat` must add capability; a `docs` must not
  touch a line of logic; a behaviour correction is `fix` with the old behaviour spelled out in the
  body; identical behaviour, faster, is `perf`; identical behaviour, rewritten, is `refactor`;
  new tests are `test`. A `feat` smuggled into a `chore` publishes nothing — the function ships
  invisibly, or not at all.
- **Scope** — the camelCase function name for library work, otherwise the thing touched
  (`package`, `README`, `documentation`, `CI/CD`), consistent with the existing history.
- **One concern per commit.** Two unrelated functions in one commit, or a function plus an
  unrelated formatting sweep, is a finding. Note that splitting a commit is *not* a fixup: report
  it and ask the user before rewriting that far.
- A body is worth writing for every `fix` — it lands in the release notes. Missing motivation on a
  fix is a must-fix.
- English, imperative present tense, no trailing period.

## 9. Verdict

Report before touching anything, most severe first:

```
Verdict: REJECTED — 2 blockers, 3 must-fix, 1 taste

| # | severity  | where                          | rule                        | finding |
|---|-----------|--------------------------------|-----------------------------|---------|
| 1 | blocker   | src/chunk/chunk.ts:31          | invariant 1 / api-stability | …       |
| 2 | must-fix  | src/chunk/chunk.spec.ts:8      | purity test first           | …       |
| 3 | taste     | src/chunk/chunk.ts:36          | —                           | …       |

Fix plan
  1, 2 → fixup 33fdce2 (feat(chunk): add chunk function)
  4    → reword 5751711 (type should be fix, not feat)
  3    → left alone: taste
```

`ACCEPTED` is allowed only with the gate output to back it: which commands ran, what they
returned. Fix `blocker` and `must-fix`; never touch `taste`.

## 10. Fold each fix into the commit it belongs to

Only after the verdict is reported. Rules first, they are what makes this safe:

- **Never rewrite a commit that is already pushed** without asking: it forces a force-push on a
  shared branch. Test it, one commit at a time:
  `git merge-base --is-ancestor <sha> @{upstream} && echo "PUSHED — ask first"`.
  Commits listed by `git log @{upstream}..HEAD` are yours to rewrite. No upstream at all: all of
  `master..HEAD` is local. On `master`: never.
- **Never fold into a commit you did not review**, and never past `master`.
- Keep the pre-rebase sha from step 1. `git reset --hard <sha>` is the undo.
- A dirty working tree that predates the session is not yours: stash nothing, commit nothing you
  did not write, and never `git add -A` — the pre-commit hook reformats files without re-staging
  them, so a blanket add drags unrelated changes into the wrong commit.

```bash
# 1. Fix the code, then keep the pre-commit hook from surprising you later: it rewrites files
#    in the working tree without re-staging them.
yarn format:pre-commit && yarn lint:pre-commit
git status                                   # know exactly what moved

# 2. One fixup per target commit, staging explicit paths only
git add src/chunk/chunk.ts src/chunk/chunk.spec.ts
git commit --fixup <sha>

# 3. Message-only corrections. `--fixup=reword:`/`--fixup=amend:` refuse both -m and -F and
#    insist on an editor, so write the `amend!` commit yourself: subject = `amend! ` plus the
#    original subject copied exactly (`git log -1 --format='%s' <sha>`), body = the new message.
#    Nothing may be staged when you do this, or it gets swept into the commit.
git commit --allow-empty \
  -m "amend! feat(chunk): add chunk fonction" \
  -m "feat(chunk): add chunk function"

# 4. Replay, without an editor — plain `git rebase -i` hangs a non-interactive session
GIT_SEQUENCE_EDITOR=true GIT_EDITOR=true git rebase -i --autosquash master

# 5. Prove the history is what you meant
git log --oneline master..HEAD                # no `fixup!`/`amend!` left, commit count unchanged
git range-diff master...<pre-rebase-sha> master...HEAD
yarn vitest run --coverage && yarn lint       # the gates, again, on the rewritten history
```

`fixup!` and `amend!` are matched by the subject line they carry, not by the sha you passed. Two
commits sharing a subject cannot be disambiguated: fold them in separate rebases, one at a time.
The pre-commit hook runs on each `git commit --fixup` (whole suite, so expect the wait) and not
during the replay.

`git range-diff` is the check that matters: it shows, commit by commit, exactly what the rebase
changed. Read it — a fixup that landed on the wrong commit looks fine in `git log` and is a lie
in the history.

If the rebase stops on a conflict, do not improvise: `git rebase --abort`, then apply the fixes
as one ordinary follow-up commit and say so in the report. A correct history is worth less than an
intact one.

Close with what changed: findings fixed, findings left as taste, commits rewritten, gates re-run.

## Never

- Rewrite a pushed commit, or any commit on `master`, without being asked.
- Relax a threshold, regenerate a snapshot to make the suite pass, edit an existing test, or add
  `eslint-disable` — the bar is the deliverable.
- Fix pre-existing problems outside the session's diff while folding fixups.
- Commit the review's own findings as a new commit when they belong to an existing one.
- Report `ACCEPTED` without having run the gates.
- Soften a finding because the session that produced it was yours.
