import { assertText } from './parsing'

export function NonEmptyString (arg: any, name: string): void {
  assertText(arg, name + ' must be non-empty string')
}
