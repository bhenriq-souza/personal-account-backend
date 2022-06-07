
export abstract class DefaultError extends Error {
  constructor(public description: string, public code?: number) {
    super(description)
  }
}

export class AssertionFailedError extends DefaultError {
  constructor(message: string = 'Assertion failed') {
    super(message)
  }
}

export class ConfigurationError extends DefaultError {
  constructor(message: string = 'Configuration missing error') {
    super(message)
  }
}
