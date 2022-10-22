// function setPages_(text: string[] | undefined) {
//   const chapters: HTMLDivElement[] = []
//   text?.map((item) => {
//     let appendEl = document.createElement('div')
//     appendEl.setAttribute('class', 'chapter')
//     appendEl.innerHTML = item || ''
//     chapters.push(appendEl)
//   })

//   const content = document.querySelector('.show')

//   if (content) {
//     content.innerHTML = ''
//     chapters.map((item) => {
//       content.appendChild(item)
//     })
//   }
// }

export function setPages(text: string) {
  const content = document.querySelector('.show')
  let appendEl = document.createElement('div')
  appendEl.setAttribute('class', 'chapter')
  appendEl.innerHTML = text || ''

  if (content) {
    content.innerHTML = ''
    content.append(appendEl)
  }
}

export function getPages(text: string): string[] | undefined {
  const el = document.querySelector('.book-content')

  let clientWidth = el?.clientWidth || 0
  let clientHeight = el?.clientHeight || 0

  const fontPerLineNum = Math.floor(clientWidth / 18) // 每行字数
  const colPerPageNum = Math.floor(clientHeight / 18) // 每页行数
  let fontPerPageNum = fontPerLineNum * colPerPageNum // 每页最大字数

  //   // 获取测试容器
  const test = document.querySelector('.show')
  let startIndex = 0 // text下标开始位置
  let textArray: string[] = [] // 分页结果数组
  while (startIndex < text.length) {
    let splitNum = fontPerPageNum // 首先使用最大字数测试
    if (test) {
      test.innerHTML = text.substr(startIndex, splitNum)
      while (test.scrollHeight > clientHeight) {
        splitNum -= fontPerLineNum // 如果高度超过，则每次减少一行字数的量
        test.innerHTML = text.substr(startIndex, splitNum)
      }
      while (test.scrollHeight <= clientHeight && startIndex + splitNum - 1 < text.length) {
        splitNum += 1 // 高度<=页面高度，则每次增加1字符直到正好填满
        test.innerHTML = text.substr(startIndex, splitNum)
      }
      textArray.push(text.substr(startIndex, splitNum - 1))
      startIndex += splitNum - 1
    }
  }

  setPages(textArray[0])

  return textArray
}
