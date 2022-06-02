
import { BillsServices } from './bills.services'
import { BillsController } from './bills.controller'
import { ApiHandler } from '../shared/api/types'

const service: BillsServices = new BillsServices()
const controller: BillsController = new BillsController(service)

const create: ApiHandler = controller.createBill

export {
  create
}
