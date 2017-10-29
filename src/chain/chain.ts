/**
 * @module chain
 */

import { Chain, Links } from '../@types';

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
      // tslint:disable-next-line:no-console
      console.group(flag);
      if (Array.isArray(v)) {
        // tslint:disable-next-line:no-console
        console.table(v);
      } else {
        // tslint:disable-next-line:no-console
        console.log(v);
      }
      // tslint:disable-next-line:no-console
      console.log('links', links);
      // tslint:disable-next-line:no-console
      console.groupEnd();
      return _chainByValue<T>(v, links);
    };
  }
}
