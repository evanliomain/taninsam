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

This library was bootstraped by [typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter).
