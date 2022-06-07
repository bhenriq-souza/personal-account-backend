import * as AWS from 'aws-sdk'
import { ServerlessConfig } from '../environment/types'
import { iDynamoDbClient } from './dynamodb.interfaces'

const _createDynamoDbClient = (env: ServerlessConfig): AWS.DynamoDB.DocumentClient => {
  AWS.config.update({
    region: env.region
  })

  if (env.isOffline) {
    const credentials = new AWS.SharedIniFileCredentials({
      profile: env.profile
    })
    AWS.config.credentials = credentials
  }

  return new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })
}

export class DynamoDbClient implements iDynamoDbClient {
  _client: AWS.DynamoDB.DocumentClient
  
  constructor(private readonly _env: ServerlessConfig) {
    this._client = _createDynamoDbClient(this._env)
  }
  
  async saveItem(item: AWS.DynamoDB.DocumentClient.PutItemInput): Promise<void> {
    await this._client.put(item).promise()
  }
}
