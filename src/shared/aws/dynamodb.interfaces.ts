import { DynamoDB } from 'aws-sdk'

export interface iDynamoDbClient {
  saveItem: (item: DynamoDB.DocumentClient.PutItemInput) => Promise<void>
}
