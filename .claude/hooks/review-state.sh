#!/bin/sh
# End-of-session review gate. Installed by .claude/settings.json as two hooks:
#
#   review-state.sh baseline   on SessionStart — remember the state of the repository
#   review-state.sh gate       on Stop         — if that state moved, ask for the strict-review
#
# The gate blocks once per state. After the review has folded its fixups the state has moved
# again, so the next stop asks for one confirmation pass; the stop after that is silent.
# State lives in .git/strict-review/, so it is never committed and never shared.

set -u

mode=${1:-gate}
payload=$(cat 2>/dev/null || true)

json() {
  printf '%s' "$payload" |
    sed -nE "s/.*\"$1\"[[:space:]]*:[[:space:]]*\"?([^\",}]*)\"?.*/\1/p"
}

root=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
cd "$root" 2>/dev/null || exit 0

state="$(git rev-parse --git-dir)/strict-review"
mkdir -p "$state" 2>/dev/null || exit 0

session=$(json session_id)
[ -n "$session" ] || session=default

fingerprint="$(git rev-parse HEAD 2>/dev/null)|$(git status --porcelain 2>/dev/null | cksum)|$(git diff HEAD 2>/dev/null | cksum)"

if [ baseline = "$mode" ]; then
  # SessionStart fires again on resume and after a compaction: the first one wins, otherwise the
  # baseline would swallow the work already done in this session.
  [ -f "$state/$session.baseline" ] ||
    printf '%s\n' "$fingerprint" >"$state/$session.baseline"
  find "$state" -type f -mtime +7 -delete 2>/dev/null
  exit 0
fi

# The turn we asked for ourselves is allowed to end.
[ true = "$(json stop_hook_active)" ] && exit 0

baseline=$(cat "$state/$session.baseline" 2>/dev/null || true)
reviewed=$(cat "$state/$session.reviewed" 2>/dev/null || true)

# No baseline means the session predates this hook: adopt the current state rather than demand a
# review of work the gate never saw being written.
if [ -z "$baseline" ]; then
  printf '%s\n' "$fingerprint" >"$state/$session.baseline"
  exit 0
fi

# Nothing was produced, or this exact state has already been through the review.
[ "$fingerprint" = "$baseline" ] && exit 0
[ "$fingerprint" = "$reviewed" ] && exit 0

printf '%s\n' "$fingerprint" >"$state/$session.reviewed"

cat <<'JSON'
{"decision":"block","reason":"End-of-session review gate: this session moved the working tree or the branch history, and that work has not been through the strict-review skill yet. Invoke the `strict-review` skill now (Skill tool, skill: \"strict-review\"), review everything this session produced against it — the three invariants, the conventions, the spirit of the library, the commit messages — then fix every blocker and must-fix and fold each fix into the commit it belongs to with `git commit --fixup` plus `git rebase -i --autosquash`. Report the verdict together with the gate output that backs it. Do not skip the review, do not soften a finding because the code is your own, and leave whatever you judge to be taste alone.","systemMessage":"strict-review gate: this session's output has not been reviewed yet."}
JSON
exit 0
