import { CreateBillResponse } from './bills.interfaces'
export class BillsServices {
  public createBill(name: string): Promise<CreateBillResponse> {
    return new Promise((resolve => resolve({ message: `hello, ${name}!!` })))
  }
}
