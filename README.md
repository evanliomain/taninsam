# Taninsam

Documentation available in : https://evanliomain.github.io/taninsam

A functionnal library based on a powerfull chain mecanism.

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/evanliomain/taninsam.svg)](https://greenkeeper.io/)
[![Travis](https://img.shields.io/travis/evanliomain/taninsam.svg)](https://travis-ci.org/evanliomain/taninsam)
[![Dependencies](https://david-dm.org/evanliomain/taninsam/status.svg)](https://david-dm.org/evanliomain/taninsam)
[![Dev Dependencies](https://david-dm.org/evanliomain/taninsam/dev-status.svg)](https://david-dm.org/evanliomain/taninsam?type=dev)
[![Coveralls](https://img.shields.io/coveralls/evanliomain/taninsam.svg)](https://coveralls.io/github/evanliomain/taninsam)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fapi%2Fgithub.com%2Fevanliomain%2Ftaninsam%2Fmaster)](https://stryker-mutator.github.io)

# Why should I use Taninsam ?

Yes you could just use simple ESNext functions to do your transformation. If you enjoy with it, just keep it that way.

But sometime, the code don't feel linear, so you are tempted to use a library. So why this one, instead of another ?

Taninsam is:

- Write in Typescript to enforced the feature correctness
- Write in full TDD because is so easy to do it that way
- Offer a simple way for chain function
- Offer a constante way to code data transformation: no more function alias or 2 way to compose functions
- Easy to extend: just `chain` a function

# Getting started

Install taninsam:

`npm install --save taninsam`

or

`yarn add taninsam`

Import the librairie and start the chain:

```typescript
import { chain, filter, map, sum } from 'taninsam';

// Sum square of even number in this collection
chain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  .chain(filter(x => 0 === x % 2)) // [2, 4, 6, 8, 10]
  .chain(map(x => x ** 2)) // [4, 16, 36, 64, 100]
  .chain(sum()) // 220
  .value();
```

To understand the chain function, it's as easy as this:

```typescript
function chain(x) {
  return {
    chain: f => chain(f(x)),
    value: () => x
  };
}
```

So you can `chain` as much as function you want, and called `value()` at the end to get the actual value.

To extend the chain, it's as easy as to write a function:

```typescript
import { chain } from 'taninsam';

chain(2)
  .chain(x => x ** 2)
  .chain(x => `square of 2 is {x}`)
  .value(); // 'square of 2 is 4'
```

# Contributing

## Installation

`yarn`

## Coding

Main commands to develop

- Use vscode for coding (or any other good editor that suite you)
- `yarn gen`: Create a new function
- `yarn test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
- `yarn commit`: Commit using conventional commit style

Additionals commands

- `yarn test`: Run test suite once
- `yarn start`: Runs `npm run build` in watch mode
- `yarn test:prod`: Run linting and generate coverage
- `yarn build`: Generate bundles and typings, create docs
- `yarn lint`: Lints code

Code source is automatically formatted and linted at each commit.

This library was bootstraped by [typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter).
