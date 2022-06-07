import { v4 as uuid } from 'uuid'
import { CreateBankAccountRequestData } from './bankAccount.interfaces'
import { iDynamoDbClient } from '../shared/aws/dynamodb.interfaces'
import { DynamoDbConfig } from '../shared/environment/types'

export class BankAccountRepository {
  constructor(
    private readonly _repository: iDynamoDbClient,
    private readonly _env: DynamoDbConfig
  ) { }

  async saveBankAccount(data: CreateBankAccountRequestData): Promise<void> {
    try {
      const params = {
        TableName: this._env.tables.bankAccounts,
        Item: {
          id: uuid(),
          ...data
        }
      }
      return await this._repository.saveItem(params)
    } catch (error) {
      throw error
    }
  }
}
