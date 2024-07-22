import * as fs from 'fs'

const DATA_DIRECTORY = '/data'

function _readFile(filename: string): string {
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
function _writeFile(filename: string, content: string): void {
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

export function load<T>(fileName: string): T[] {
  let records: T[] = []

  const filename = `${fileName}.json`
  try {
    const rawContent = _readFile(filename)
    if (rawContent) {
      records = JSON.parse(rawContent) as T[]
    }
  } catch (err) {
    throw err
  }

  return records
}

export function save<T>(fileName: string, content: T[]): void {
  const filename = `${fileName}.json`
  try {
    _writeFile(filename, JSON.stringify(content))
  } catch (err) {
    throw err
  }
}
