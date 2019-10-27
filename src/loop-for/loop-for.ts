import { isNumber } from '../is-number';

/**
 * @module any=>any
 */
interface Iteration {
  start?: number;
  stop: number;
  step?: number;
}
interface IterationParameters {
  start: number;
  stop: number;
  step: number;
}
/**
 * This method loop on an input:
 * - at first, output = input
 * - on each call, it output = iteratee(output)
 * - the loop is parameterize by iteration as a number of loop to apply,
 * or a start, stop, step object
 * - finally, returns output
 * @param iteration The number of iteration, or a start, stop, step object.
 * @param iteratee The iteratee invoked per element.
 * @return the function to apply on the input
 * @example
 * ```
 * loopFor<number>(5, x => 1 + x)(1) // 6
 * ```
 * @example with iteration object
 * ```
 * loopFor<number>({ start: 2, stop: 10, step: 2 }, (x, i) => x + i ** 2)(0)
 * // 2² + 4² + 6² + 8² = 120
 * ```
 * @example Using the chain
 * ```
 * chain(1)
 *   .chain(loopFor<number>(5, x => 1 + x))
 *   .value() // 6
 * ```
 */
export function loopFor<T>(
  iteration: number | Iteration,
  iteratee: (x: T, index?: number) => T
): (input: T) => T {
  const { start, stop, step } = forParameters(iteration);

  return (input: T) => {
    let accumulator = input;
    for (let index = start; index < stop; index += step) {
      accumulator = iteratee(accumulator, index);
    }

    return accumulator;
  };
}

function forParameters(iteration: number | Iteration): IterationParameters {
  const defaultParameters = { start: 0, step: 1 };
  if (isNumber(iteration)) {
    return { ...defaultParameters, stop: iteration };
  }

  return { ...defaultParameters, ...iteration };
}
