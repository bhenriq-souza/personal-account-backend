import { NonEmptyString } from '../../../utils/format'

export const ServerlessConfig = {
  SLS_REGION: {
    type: "string",
    format: NonEmptyString,
    namespace: 'aws.serverless',
    default: 'us-east-1'
  },
  SLS_PROFILE: {
    type: "string",
    format: NonEmptyString,
    namespace: 'aws.serverless'
  },
  IS_OFFLINE: {
    type: "string",
    format: NonEmptyString,
    namespace: 'aws.serverless'
  }
}
