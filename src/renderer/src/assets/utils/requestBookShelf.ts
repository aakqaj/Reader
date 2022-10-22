import { readJsonFile, readJsonFileSync } from './operationFile'

export function getBookshelfInfo() {
  return readJsonFileSync('./static/bookshelf/bookshelf.json')
}
