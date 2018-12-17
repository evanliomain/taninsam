import { CastMapping } from '../@types/cast-mapping';
import { chain } from '../chain';
import { entries } from '../entries';
import { filter } from '../filter';
import { reduce } from '../reduce';

/**
 * @module object=>object
 */
/**
 * Cast properties of an object or an array of object, given provided mapping
 * @param mapping Mapping between key and caster.
 * @return The function to apply on the object or the array to do cast its properties into another object or array
 * @example
 * ```
 * castTo(
 *    ({ a }) => parseInt(a, 10),
 *    ({ b }) => Math.floor(b),
 *    ({ c }) => parseInt(c, 16)
 * )({ a: '1', b: 2.1, c: 'A' }) // { a: 1, b: 2, c: 10 }'`
 * castTo([
 *    {a: 1, b: 2, c:3},
 *    {a: 4, b: 5, c:6}
 * ])({a: x => x + x, b: x => x}) // [{a: 2, b: 2, c:3}, {a: 8, b: 5, c:6}]
 * ```
 * @example Using the chain
 * ```
 * chain({ a: '1', b: 2.1, c: 'A' })
 *    .chain(castTo(
 *      ({ a }) => parseInt(a, 10),
 *      ({ b }) => Math.floor(b),
 *      ({ c }) => parseInt(c, 16)
 *    ))
 *    .value() // { a: 1, b: 2, c: 10 }`
 * chain([
 *       {a: 1, b: 2, c:3},
 *       {a: 4, b: 5, c:6}
 *    ])
 *   .chain(castTo({a: x => x + x, b: x => x}))
 *   .value() // [{a: 2, b: 2, c:3}, {a: 8, b: 5, c:6}]
 * ```
 */
export function castTo(mapping: CastMapping): (ob: object) => object {
  const caster: (ob: object) => object = (ob: object) =>
    chain(mapping)
      .chain(entries())
      .chain(filter(([key]) => undefined !== ob[key]))
      .chain(
        reduce(
          (castedObject, [key, cast]) => ({
            ...castedObject,
            [key]: cast(ob[key])
          }),
          ob
        )
      )
      .value();

  return (ob: object) => (Array.isArray(ob) ? ob.map(caster) : caster(ob));
}
