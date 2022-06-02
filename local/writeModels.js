const { compileFromFile } = require('json-schema-to-typescript')
const { resolve } = require('path')
const fs = require('fs/promises')
const { existsSync } = require('fs')

const SCHEMAS_DIR = resolve('schema')

const getAllFiles = async (path) => {
  const items = await fs.readdir(path)

  for (item of items) {
    const filePath = resolve('schema', item)
    const stats = await fs.stat(filePath)
    
    if (stats.isDirectory()) {
      const strArr = filePath.split('/')
      const dirName = strArr[strArr.length - 1]
      const modelPath = resolve('src', dirName)

      if (!existsSync(modelPath)) {
        fs.mkdir(modelPath)
      }

      const files = await fs.readdir(filePath)
      const modelsFile = `${dirName}.interfaces.ts`
      const pathFile = `${modelPath}/${modelsFile}`

      if (existsSync(pathFile)) {
        await fs.unlink(pathFile)
      }

      for (file of files) {
        const ts = await compileFromFile(`${filePath}/${file}`)
        await fs.appendFile(pathFile, ts)
      }
    }
  }
}

const compileModels = async () => {
  try {
    getAllFiles(SCHEMAS_DIR)
  } catch (error) {
    console.log(error)
  }
}

compileModels()
