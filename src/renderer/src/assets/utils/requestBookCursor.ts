export function getCursor(bookname: string) {
  return Number(localStorage.getItem(bookname))
}

function setCursor(bookname: string, cursor: number) {
  localStorage.setItem(bookname, cursor.toString())
}

export function existsCursor(bookname: string) {
  return localStorage.getItem(bookname) === null ? false : true
}

export function removeCursor(bookname: string) {
  if (existsCursor(bookname)) {
    localStorage.removeItem(bookname)
  }
}
