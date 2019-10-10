# Contributing

## Install the project

1.  Fork the project and clone your fork.

1.  Install devDependancies:

        $ yarn

## Create a feature

1.  Create a local feature branch:

        $ git checkout -b feature/<feature-name>

1.  If adding a function `funName`:

        $ yarn gen

    And answer with `funName`, or even `fun name` to the question.

1.  Before designing a new function:

    - please read our [ROADMAP](https://github.com/evanliomain/taninsam/blob/master/ROADMAP.md) to pick a plan function.

1.  Write the function documentation first.

1.  Write the unit tests

1.  Launch them:

        $ yarn test:watch

1.  Implement the function, don't forget to strongly type it.

    - use ReadonlyArray<T> and ban use of T[]

1.  Respect the tslint rules. Don't hesitate to verify by launching:

        $ yarn lint

1.  Once your function finished, wrap our code in a commit, see Commit Message Guidelines

1.  Push to your fork:

        $ git push origin <branch>

1.  Open a pull request to `taninsam:master`.

## Cleanup your environment

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

- Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

        $ git push origin --delete my-fix-branch

- Check out the master branch:

        $ git checkout master -f

- Delete the local branch:

        $ git branch -D my-fix-branch

- Update your master with the latest upstream version:

        $ git pull --ff upstream master

## Commit Message Guidelines

        $ yarn commit

### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

### Scope

`funName`

### Short description

The short description contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

### Long description

Just as in the **short description**, use the imperative, present tense: "change" not "changed" nor "changes".
The long description should include the motivation for the change and contrast this with previous behavior.
