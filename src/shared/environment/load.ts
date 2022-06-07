import { resolveEnvironment } from './initializaton'
import { DynamoDbConfig } from './shared/aws/dynamodb'
import { ServerlessConfig } from './shared/aws/serverless'
import { AllConfigs } from './types'

const AllConfigsOptions = {
  ...DynamoDbConfig,
  ...ServerlessConfig
} as const

export function loadEnvironment(): AllConfigs {
  const resolved = resolveEnvironment<typeof AllConfigsOptions>(AllConfigsOptions) 
  return {
    aws: {
      dynamodb: {
        tables: {
          banks: resolved.BANKS_TABLE,
          bankAccounts: resolved.BANK_ACCOUNTS_TABLE
        }
      },
      serverless: {
        region: resolved.SLS_REGION,
        profile: resolved.SLS_PROFILE || undefined,
        isOffline: resolved.IS_OFFLINE === "true"
      }
    }
  }
}