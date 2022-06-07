import { ResponseBuilder } from '../shared/api/responseBuilder'
import type { ApiEvent, ApiResponse } from '../shared/api/types'
import type { BankAccountServices } from './bankAccount.services'
import type { CreateBankAccountOkResponse, CreateBankAccountRequestData } from './bankAccount.interfaces'

export class BankAccountController {
  public constructor(private readonly _service: BankAccountServices) { }

  public createBankAccount = async (event: ApiEvent): Promise<ApiResponse> => {
    const data: CreateBankAccountRequestData = JSON.parse(event.body || '')
    
    /**
     *  before create bank account, the controller should:
     *  1. check if the bank actually exists;
     *  2. check if there is no other bank account (same account number) for this bank.
     *     For this purpose, we should implement an Global Secundary index using the bank number and account number
     *  */
    const result = await this._service.createBankAccount(data)
    return ResponseBuilder.OK<CreateBankAccountOkResponse>(result)
  }
}
