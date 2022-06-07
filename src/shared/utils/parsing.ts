import * as _ from 'lodash'
import { AssertionFailedError } from '../errors/types'

export function isText(maybeString: unknown): maybeString is string {
  return typeof maybeString === 'string' && maybeString.trim().length > 0
}

export function hasKey<K extends string> (k: K, o: unknown): o is { [_ in K]: unknown } & { [maybeOtherProp: string]: unknown } {
  return typeof o === 'object' && o !== null && k in o
}

export function assertText(maybeString: unknown, message?: string): asserts maybeString is string {
  if (!isText(maybeString)) {
    throw new AssertionFailedError('Invalid string' + (message !== undefined ? ': ' + message : ''))
  }
}

export function assertTrue(maybeBoolean: boolean, message: string): void {
  if (!maybeBoolean) throw new AssertionFailedError(`Assertion Error: ${message}`)
}
