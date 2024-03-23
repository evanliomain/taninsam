/**
 * @module chain
 */

import { log } from '../.internal';
import { ChainFn, Links, Result } from '../@types';

/**
 * Enchain any function.
 * To get the value, apply .value()
 * To transform the value with a function f, apply .chain(f)
 * @param f the first function to apply in the chain
 */
export function chainFn<T>(f: (e) => T): ChainFn<T> {
  return _chainByFunction<T>(e => ({ result: f(e), links: {} }), {});

  function _chainByFunction<V>(
    _f: (e, l?: Links) => Result<V>,
    links: Links,
    linkName?: string,
  ): ChainFn<V> {
    return {
      chain: _chain,
      link: (newLinkName: string): ChainFn<V> =>
        _chainByFunction(_f, links, newLinkName),
      value: () => e => _f(e).result,
      log: (flag: string): ChainFn<V> =>
        _chain((x, closureLink) => {
          log(flag, x, closureLink);

          return x;
        }),
    };

    function _chain(g) {
      return _chainByFunction((x, closureLink = {}) => {
        const { result, links: inneriteClosureLinks } = _f(x, closureLink);

        if (undefined === linkName) {
          return {
            result: g(result, inneriteClosureLinks),
            links: inneriteClosureLinks,
          };
        }
        const newClosureLink = {
          ...inneriteClosureLinks,
          [linkName]: result,
        };

        return { result: g(result, newClosureLink), links: newClosureLink };
      }, links);
    }
  }
}
