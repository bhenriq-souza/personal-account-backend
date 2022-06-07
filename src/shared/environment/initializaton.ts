import { getEnv, getEnvOrDefault } from '../utils/environment'
import { EnvironmentOptions } from './types'

export function resolveEnvironment <T extends EnvironmentOptions>(
  configs: T
): Record<keyof T & string, string> { 
  return Object.entries(configs)
    .reduce<Record<keyof EnvironmentOptions, string>>(
      (acc, [name, settings]) => {
        let value

        if ('default' in settings) {
          value = getEnvOrDefault(name, settings.default ?? '')
        } else {
          value = getEnv(name)
        }

        return {
          ...acc,
          [name]: value
        }
      }, {})
}
