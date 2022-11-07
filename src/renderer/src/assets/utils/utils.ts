export function isUrl(str: string) {
  const v = new RegExp(
    '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
    'i'
  )

  return v.test(str)
}

// export function joinUrl(baseUrl: string | undefined, joinUrl: string): string {
//   if (!/\//gm.test(joinUrl)) {
//     joinUrl = '/' + joinUrl
//   }

//   if (joinUrl.indexOf(baseUrl || '') == -1) {
//     joinUrl = `${baseUrl}${joinUrl}`
//   }

//   return joinUrl
// }

export function joinUrl(leftUrl: string | undefined, rightUrl: string): string {
  if (!leftUrl) {
    return ''
  }
  if (!/\/$/gm.test(leftUrl)) {
    leftUrl = leftUrl + '/'
  }

  if (!/\//gm.test(rightUrl)) {
    rightUrl = '/' + rightUrl
  }

  let leftList = leftUrl.split('/')
  let rightList = rightUrl.split('/')
  let allList = [...leftList, ...rightList]
  const repeat = allList.filter((item, index) => {
    return allList.indexOf(item) !== index && item !== ''
  })

  leftUrl = leftUrl.replace(/\/$/gm, '')

  repeat.map((item) => {
    let key = `\/${item}`
    // console.log(key);
    rightUrl = rightUrl.replace(new RegExp(key, 'gm'), '')
  })

  return leftUrl + rightUrl
}

interface KeyFun {
  keyName: string
  fun: Function
}
const keyFun: KeyFun[] = []

export function keyListener(key: string, callback: Function) {
  if (!keyFun.some((item) => item.keyName === key)) {
    keyFun.push({
      keyName: key,
      fun: callback
    })
  }

  document.onkeyup = (e) => {
    e.preventDefault()
    keyFun.filter((item) => {
      if (e.key === item.keyName) {
        item.fun()
      }
    })
  }
}

export function debounce(func: Function, delay: number) {
  let timeout: any = null
  return function (...args: any) {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }

    timeout = setTimeout(() => {
      // @ts-ignore
      func.apply(this, args)
    }, delay)
  }
}
