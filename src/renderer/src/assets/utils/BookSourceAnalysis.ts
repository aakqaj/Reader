import cheerio from 'cheerio'
import { css } from 'cheerio/lib/api/css'

export default class BookSourceAnalysis {
  $: any
  constructor(doc: string) {
    this.$ = cheerio.load(doc)
  }

  setResult(css_rule: any, attribute: any): string[] {
    let result: string[] = []
    this.$(css_rule).map((_: any, content: string) => {
      if (attribute == 'text') {
        result.push(this.$(content).text())
      } else if (attribute == 'html') {
        result.push(this.$(content).html())
      } else {
        result.push(this.$(content).attr(attribute))
      }
    })
    return result
  }

  ruleSearch(css_selector: string): string[] {
    try {
      if (css_selector === '') {
        return ['']
      }
      let attribute = /@/.test(css_selector) ? /@(.*?)$/g.exec(css_selector)?.[1] : null
      let css_rule: any
      css_rule = /@/.test(css_selector) ? /(.*?)@/g.exec(css_selector)?.[1] : css_rule
      let index = /\.(\d)/.test(css_rule) ? css_rule.match(/\d/g).pop() : null
      css_rule = css_rule.replace(/\.\d/g, ' ')

      // console.log(css_rule,attribute);
      if (index === null) {
       
        
        return this.setResult(css_rule, attribute)
      } else {
        let last_tag = css_rule.match(/\.?\w+\s$/g)[0]
        css_rule = css_rule.replace(/\.\w+\s$/, '')
        let result: string[] = []

        this.$(css_rule).map((_: any, item: any) => {
          result.push(this.setResult(item, attribute)[0])
          // this.$(item)
          //   .children(last_tag)
          //   .map((i_: number, item_: any) => {
          //     console.log(item,"hello");

          //     if (i_ == index) {
          //       result.push(this.setResult(item_, attribute)[0])
          //     }
          //   })
        })
        return [result[index]]
      }
    } catch (err) {
      return ['']
    }
  }
}
