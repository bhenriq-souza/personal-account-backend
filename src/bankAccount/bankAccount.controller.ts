import { ResponseBuilder } from '../shared/api/responseBuilder'
import type { ApiEvent, ApiResponse } from '../shared/api/types'
import type { BankAccountServices } from './bankAccount.services'
import type { CreateBankAccountOkResponse } from './bankAccount.interfaces'

export class BankAccountController {
  public constructor(private readonly _service: BankAccountServices) { }

  public createBankAccount = async (event: ApiEvent): Promise<ApiResponse> => {
    const result = await this._service.createBankAccount()
    return ResponseBuilder.OK<CreateBankAccountOkResponse>(result)
  }
}
