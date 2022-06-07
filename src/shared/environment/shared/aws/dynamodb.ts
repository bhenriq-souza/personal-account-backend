import { NonEmptyString } from '../../../utils/format'

export const DynamoDbConfig = {
  BANKS_TABLE: {
    type: "string",
    format: NonEmptyString,
    namespace: 'aws.dynamodb.tables'
  },
  BANK_ACCOUNTS_TABLE: {
    type: "string",
    format: NonEmptyString,
    namespace: 'aws.dynamodb.tables'
  }
}
