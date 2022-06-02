import { ApiResponse } from './types'
import { HttpStatusCode } from './statusCodes'

export class ResponseBuilder {
  public static OK<T>(result: T): ApiResponse {
    return ResponseBuilder._returnAs<T>(result, HttpStatusCode.Ok)
  }
  
  private static _returnAs<T>(result: T, statusCode: number): ApiResponse {
    return {
      body: JSON.stringify(result),
      statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  }
}