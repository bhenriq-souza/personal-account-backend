const AWS = require('aws-sdk')
const { parse } = require('csv-parse/sync')
const { readFile } = require('fs/promises')
const { resolve } = require('path')
const args = require('minimist')(process.argv.slice(2))

const MIGRATION = args.migration
const STAGE = args.stage ?? 'dev'
const REGION = args.region ?? 'us-east-1'
const PATH = `data/${MIGRATION}/${STAGE}.csv`
const TABLE = `personal-account-${MIGRATION}-table-${STAGE}`

const credentials = new AWS.SharedIniFileCredentials({ profile: 'bruno.administrator'})

AWS.config.update({ region: REGION })
AWS.config.credentials = credentials

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'})

const migrate = async () => {
  const txtContent = await readFile(resolve(PATH))
  const records = parse(txtContent, {
    columns: true,
    skip_empty_lines: true
  })

  const tables = await dynamodb.listTables().promise()

  if (!tables.TableNames.includes(TABLE)) {
    console.error('Table not found')
    return
  }

  const items = []

  for (const row of records) {
    const keys = Object.keys(row)[0].split(';')
    const values = Object.values(row)[0].split(';')

    if (keys.length !== values.length) {
      console.error('error found: Header and Values mismatch', values)
      continue
    }

    let item = {}

    for (let i = 0; i <= keys.length - 1; i++) {
      console.log('Item to write: ', keys[i], values[i]);
      
      item = {
        ...item,
        [keys[i]]: { 'S': values[i] }
      }
    }
    
    items.push(item)
  }

  const params = {
    RequestItems: {
      [TABLE]: items.map(i => ({
        PutRequest: {
          Item: i
        }
      }))
    }
  }

  try {
    await dynamodb.batchWriteItem(params).promise()
  } catch (error) {
    console.error(error)
  }
}

migrate()
