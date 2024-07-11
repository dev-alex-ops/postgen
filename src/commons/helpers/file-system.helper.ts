import * as fs from 'fs'
import * as path from 'path'

const DATA_DIRECTORY = '/data'

async function _readFile(filename: string): Promise<string> {
  let content: string

  const filepath = `.${DATA_DIRECTORY}/${filename}`
  try {
    if (fs.existsSync(filepath)) {
      content = fs.readFileSync(filepath, 'utf8')
    }
  } catch (err) {
    throw err
  }

  return content
}
async function _writeFile(filename: string, content: string): Promise<void> {
  const filepath = `.${DATA_DIRECTORY}/${filename}`
  try {
    if (!fs.existsSync(`.${DATA_DIRECTORY}`)) {
      fs.mkdirSync(`.${DATA_DIRECTORY}`)
    }

    fs.writeFileSync(filepath, content)
  } catch (err) {
    throw err
  }
}

export async function load<T>(fileName: string): Promise<T[]> {
  let records: T[] = []

  const filename = `${fileName}.json`
  try {
    const rawContent = await _readFile(filename)
    if (rawContent) {
      records = JSON.parse(rawContent) as T[]
    }
  } catch (err) {
    throw err
  }

  return records
}

export async function save<T>(fileName: string, content: T[]): Promise<void> {
  const filename = `${fileName}.json`
  try {
    _writeFile(filename, JSON.stringify(content))
  } catch (err) {
    throw err
  }
}
