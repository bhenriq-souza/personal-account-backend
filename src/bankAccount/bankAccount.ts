import { ApiHandler } from '../shared/api/types'
import { AllConfigs } from '../shared/environment/types'
import { DynamoDbClient } from '../shared/aws/dynamodb'
import { iDynamoDbClient } from '../shared/aws/dynamodb.interfaces'
import { loadEnvironment } from '../shared/environment/load'
import { BankAccountServices } from './bankAccount.services'
import { BankAccountController } from './bankAccount.controller'
import { BankAccountRepository } from './bankAccount.repository'

const env: AllConfigs = loadEnvironment()
const client: iDynamoDbClient = new DynamoDbClient(env.aws.serverless)
const repository: BankAccountRepository = new BankAccountRepository(client, env.aws.dynamodb)
const service: BankAccountServices = new BankAccountServices(repository)
const controller: BankAccountController = new BankAccountController(service)

const create: ApiHandler = controller.createBankAccount

export {
  create
}
