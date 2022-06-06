import { CreateBankAccountOkResponse } from './bankAccount.interfaces'

export class BankAccountServices {
  public createBankAccount(): Promise<CreateBankAccountOkResponse> {
    return new Promise((resolve => resolve({
      message: 'Bank account created',
      status: 'OK',
      result: {
        id: '4da654d6a46d5'
      }
    })))
  }
}
