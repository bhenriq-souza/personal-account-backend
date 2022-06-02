import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
} from 'aws-lambda'

export type ApiEvent = APIGatewayProxyEvent
export type ApiResponse = APIGatewayProxyResult
export type ApiHandler = (event: APIGatewayProxyEvent) => Promise<ApiResponse>
