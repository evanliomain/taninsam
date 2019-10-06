/**
 * @module chain
 */

import { Chain, Links } from '../@types';
import { log } from '../.internal';

/**
 * Enchain any value.
 *
 * To get the value, apply .value()
 * @param value the value to insert at the start of the chain
 */
export function chain<T>(value: T): Chain<T> {
  return _chainByValue<T>(value, {});

  function _chainByValue<V>(v: V, links: Links): Chain<V> {
    return {
      chain: f => _chainByValue(f(v, links), links),
      link: linkName => _chainByValue(v, { ...links, [linkName]: v }),
      value: () => v,
      log: _log<V>(v, links)
    };
  }

  function _log<V>(v: V, links: Links): (flag: string) => Chain<V> {
    return (flag: string) => {
      log(flag, v, links);
      return _chainByValue<V>(v, links);
    };
  }
}
