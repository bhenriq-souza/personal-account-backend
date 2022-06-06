

import { BankAccountServices } from './bankAccount.services'
import { BankAccountController } from './bankAccount.controller'
import { ApiHandler } from '../shared/api/types'

const service: BankAccountServices = new BankAccountServices()
const controller: BankAccountController = new BankAccountController(service)

const create: ApiHandler = controller.createBankAccount

export {
  create
}
