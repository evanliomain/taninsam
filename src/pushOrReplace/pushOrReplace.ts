import { push } from '../push';

/**
 * @module array=>array
 */
/**
 * Push an element into an array, or replace an existing one if it matchs one.
 * @param replace Object with a match function and an element to replace in matching case.
 * @return the function to apply on the array to do perform the check, replace by the element if matching or push the element if not
 * @example
 * ```
 * pushOrReplace<number>({
 *       match: x => x%2 === 0,
 *       replacement: 2
 *    },{
 *       match: x => x%3 === 0,
 *       replacement: 3
 *    })([1, 2, 4]) // [1, 2, 2, 3]
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 4])
 *   .chain(pushOrReplace<number>({
 *       match: x => x%2 === 0,
 *       replacement: 2
 *    },{
 *       match: x => x%3 === 0,
 *       replacement: 3
 *    }))
 *   .value() // [1, 2, 2, 3]
 * ```
 */
export function pushOrReplace<T>(
  ...replace: {
    match: (element: T) => boolean;
    replacement: T;
  }[]
): (array: ReadonlyArray<T>) => ReadonlyArray<T> {
  return (array: ReadonlyArray<T>) =>
    replace.reduce(
      (accuList, r) =>
        accuList.every(element => !r.match(element))
          ? push(r.replacement)(accuList)
          : accuList.map(
              (element: T) => (r.match(element) ? r.replacement : element)
            ),
      array
    );
}
