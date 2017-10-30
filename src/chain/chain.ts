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

  function _chainByValue<T>(v: T, links: Links): Chain<T> {
    return {
      chain: f => _chainByValue(f(v, links), links),
      link: linkName => _chainByValue(v, { ...links, [linkName]: v }),
      value: () => v,
      log: _log<T>(v, links)
    };
  }

  function _log<T>(v: T, links: Links): (flag: string) => Chain<T> {
    return (flag: string) => {
      log(flag, v, links);
      return _chainByValue<T>(v, links);
    };
  }
}
