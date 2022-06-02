import { ResponseBuilder } from '../shared/api/responseBuilder'
import type { ApiEvent, ApiResponse } from '../shared/api/types'
import type { CreateBillRequest, CreateBillResponse } from './bills.interfaces'
import type { BillsServices } from './bills.services'

export class BillsController {
  public constructor(private readonly _service: BillsServices) { }

  public createBill = async (event: ApiEvent): Promise<ApiResponse> => {
    const request: CreateBillRequest = JSON.parse(event.body || '')
    const result = await this._service.createBill(request.name)
    return ResponseBuilder.OK<CreateBillResponse>(result)
  }
}
