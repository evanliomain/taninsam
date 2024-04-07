# Taninsam

Documentation available in : https://evanliomain.github.io/taninsam

A functionnal library based on a powerfull chain mecanism.

[![Release](https://github.com/evanliomain/taninsam/actions/workflows/release.yml/badge.svg?branch=master)](https://github.com/evanliomain/taninsam/actions/workflows/release.yml)
[![Coveralls](https://img.shields.io/coveralls/evanliomain/taninsam)](https://coveralls.io/github/evanliomain/taninsam)

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Made with](https://img.shields.io/badge/Made%20with-TypeScript-blue)](http://www.typescriptlang.org)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

![npm](https://img.shields.io/npm/v/taninsam)
![npm bundle size](https://img.shields.io/bundlephobia/min/taninsam)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/taninsam)
![npm](https://img.shields.io/npm/dt/taninsam)
![npm](https://img.shields.io/npm/dm/taninsam)

[![npm](https://img.shields.io/npm/l/taninsam.svg)](https://github.com/github.com/evanliomain/taninsam/master/LICENSE)

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
  .chain(x => `square of 2 is ${x}`)
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

- `yarn lint`: Lints code
- `yarn test`: Run test suite once
- `yarn stryker`: Run mutation testing suite once
- `yarn build`: Generate bundles and typings, create docs
- `yarn start`: Runs `npm run build` in watch mode

Code source is automatically formatted and linted at each commit.

This library was bootstraped by [typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter).
