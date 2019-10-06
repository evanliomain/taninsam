/**
 * @module array=>any
 */
/**
 * Return the minimum of the list according the iteratee
 * @param iteratee The iteratee invoked per element.
 * @return the function to apply on the array to return its minimum
 * @example
 * ```
 * minBy<{ x:number; y:number; }>(e => e.x)([
 *   { x:1, y:5 },
 *   { x:2, y:4 },
 *   { x:3, y:3 },
 *   { x:4, y:2 }
 * ]) // { x:1, y:5 }
 * minBy<{ x:number; y:number; }>(e => e.y)([
 *   { x:1, y:5 },
 *   { x:2, y:4 },
 *   { x:3, y:3 },
 *   { x:4, y:2 }
 * ]) // { x:4, y:2 }
 * ```
 * @example Using the chain
 * ```
 * chain([{ x:1, y:5 }, { x:2, y:4 }, { x:3, y:3 }, { x:4, y:2 }])
 *   .chain(minBy<{ x:number; y:number; }>(e => e.x))
 *   .value() // { x:1, y:5 }
 * ```
 */
export function minBy<T>(
  iteratee: (element: T) => number
): (elements: ReadonlyArray<T>) => T | undefined {
  return (elements: ReadonlyArray<T>) => {
    if (0 === elements.length) {
      return undefined;
    }
    if (1 === elements.length) {
      return elements[0];
    }
    const [head, ...tail] = elements;
    return tail.reduce(
      (acc: T, element: T) =>
        iteratee(acc) <= iteratee(element) ? acc : element,
      head
    );
  };
}
