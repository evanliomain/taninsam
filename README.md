# Taninsam
A functionnal library based on a powerfull chain mecanism.

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/evanliomain/taninsam.svg)](https://greenkeeper.io/)
[![Travis](https://img.shields.io/travis/evanliomain/taninsam.svg)](https://travis-ci.org/evanliomain/taninsam)
[![Coveralls](https://img.shields.io/coveralls/evanliomain/taninsam.svg)](https://coveralls.io/github/evanliomain/taninsam)
[![Dependencies](https://david-dm.org/evanliomain/taninsam/status.svg)](https://david-dm.org/evanliomain/taninsam)
[![Dev Dependencies](https://david-dm.org/evanliomain/taninsam/dev-status.svg)](https://david-dm.org/evanliomain/taninsam?type=dev)

# Why should I use Taninsam ?

Yes you could just use simple ESNext functions to do your transformation. If you enjoy with it, just keep it that way.

But sometime, the code don't feel linear, so you are tempted to use a library. So why this one, instead of another ?

Taninsam is:

* Write in Typescript to enforced the feature correctness
* Write in full TDD because is so easy to do it that way
* Offer a simple way for chain function
* Offer a constante way to code data transformation: no more function alias or 2 way to compose functions
* Easy to extend: just `chain` a function


### Contributing
#### Installation

`npm install`

#### Coding
 - Use vscode for coding (or any other good editor that suite you)
 - `npm t`: Run test suite
 - `npm start`: Runs `npm run build` in watch mode
 - `npm run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
 - `npm run test:prod`: Run linting and generate coverage
 - `npm run build`: Generate bundles and typings, create docs
 - `npm run lint`: Lints code
 - `npm run commit`: Commit using conventional commit style

Code source is automatically formatted and linted at each commit.

### Automatic releases

If you'd like to have automatic releases with Semantic Versioning, follow these simple steps.

_**Prerequisites**: you need to create/login accounts and add your project to:_
 - npm
 - Travis
 - Coveralls

Run the following command to prepare hooks and stuff:

```bash
npm run semantic-release-prepare
```

Follow the console instructions to install semantic release and run it (answer NO to "Generate travis.yml").

_Note: make sure you've setup `repository.url` in your `package.json` file_

```bash
npm install -g semantic-release-cli
semantic-release setup
# IMPORTANT!! Answer NO to "Generate travis.yml" question. It is already prepared for you :P
```

From now on, you'll need to use `npm run commit`, which is a convenient way to create conventional commits.

Automatic releases are possible thanks to [semantic release](https://github.com/semantic-release/semantic-release), which publishes your code automatically on Github and npm, plus generates a changelog automatically. This setup is highly influenced by [Kent C. Dodds course on egghead.io](https://egghead.io/courses/how-to-write-an-open-source-javascript-library)

### Git Hooks

There is already set a `precommit` hook for formatting your code with Prettier :nail_care:

By default, there are two disabled git hooks. They're set up when you run the `npm run semantic-release-prepare` script. They make sure:
 - You follow a [conventional commit message](https://github.com/conventional-changelog/conventional-changelog)
 - Your build is not gonna fail in [Travis](https://travis-ci.org) (or your CI server), since it's being run locally before `git push`

This makes more sense in combination with [automatic releases](#automatic-releases)

### FAQ

#### `Array.prototype.from`, `Promise`, `Map`... is undefined?

TypeScript or Babel only provides down-emits on syntactical features (`class`, `let`, `async/await`...), but not on functional features (`Array.prototype.find`, `Set`, `Promise`...), . For that, you need Polyfills, such as [`core-js`](https://github.com/zloirock/core-js) or [`babel-polyfill`](https://babeljs.io/docs/usage/polyfill/) (which extends `core-js`).

For a library, `core-js` plays very nicely, since you can import just the polyfills you need:

```javascript
import "core-js/fn/array/find"
import "core-js/fn/string/includes"
import "core-js/fn/promise"
...
```

This library was bootstraped by [typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter).
