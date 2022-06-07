import { CreateBankAccountOkResponse, CreateBankAccountRequestData } from './bankAccount.interfaces'
import { BankAccountRepository } from './bankAccount.repository'

export class BankAccountServices {
  constructor(private readonly _repository: BankAccountRepository) { }

  public async createBankAccount(data: CreateBankAccountRequestData): Promise<CreateBankAccountOkResponse> {
    try {
      await this._repository.saveBankAccount(data)
    } catch (error) {
      console.error(error)
    }
    
    return new Promise((resolve => resolve({
      message: 'Bank account created',
      status: 'OK',
      result: {
        id: '4da654d6a46d5'
      }
    })))
  }
}
