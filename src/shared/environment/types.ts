export interface EnvironmentOptionSettings {
  format: (arg: any, name: string) => void
  namespace: string
  default?: string
}

export type EnvironmentOptions = Record<string, EnvironmentOptionSettings>

export interface AllConfigs {
  aws: AWSConfig,
}

export interface AWSConfig {
  dynamodb: DynamoDbConfig,
  serverless: ServerlessConfig
}

export interface DynamoDbConfig {
  tables: {
    banks: string,
    bankAccounts: string
  }
}

export interface ServerlessConfig {
  region: string,
  profile?: string,
  isOffline?: boolean
}
