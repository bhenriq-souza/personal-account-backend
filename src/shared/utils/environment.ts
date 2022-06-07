import { ConfigurationError } from '../errors/types'

export function getEnv (name: string): string {
  const value = process.env[name]
  if (value === undefined || value.length === 0) {
    throw new ConfigurationError(`Required environment ENV vars ${name} missing`)
  } else {
    return value
  }
}

export function getEnvOrDefault (name: string, fallback: string): string {
  const value = process.env[name]
  if (value === undefined || value.length === 0) {
    /**
     * Next step, after implementing the environment variables acquisition, is to implement the logger
     */
    console.log(`Env variable '${name}' was not set, falling back to default value ${fallback}`)
    return fallback
  } else {
    return value
  }
}
