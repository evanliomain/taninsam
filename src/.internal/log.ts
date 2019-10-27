// tslint:no-console
import { Links } from '../@types';

/**
 * @ignore
 */
export function log<T>(flag: string, v: T, links: Links): void {
  console.group(flag);
  if (Array.isArray(v)) {
    console.table(v);
  } else {
    console.log(v);
  }
  console.log('links', links);
  console.groupEnd();

  return;
}
