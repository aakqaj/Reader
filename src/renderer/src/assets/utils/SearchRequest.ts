import BookSourceAnalysis from './BookSourceAnalysis'
import { BookSource } from '../interface/BookSource'
import { SearchResult } from '../interface/SearchResult'
import { readFile } from './operationFile'
import { request } from './request'

export class SearchRequest {
  bsa!: BookSourceAnalysis
  source!: BookSource
  requestHtml: string
  SearchResult!: SearchResult[]
  constructor() {
    this.requestHtml = ''
    this.SearchResult = []
  }

  async init(bookSource: BookSource) {
    this.source = bookSource
  }

  async getRequestHtml(bookname: string) {
    let payload: any = { ...this.source?.Search.Payload }

    if (Array.isArray(this.source.Search.Payload)) {
      let command = ''
      this.source.Search.Payload.map((item: string) => (command += item + '&'))
      command = command.replace(/\$/g, encodeURIComponent(bookname))
      command = command.replace(/&$/g, '')
      payload = command
    } else {
      for (let i in payload) {
        if (payload[i] === '$') {
          payload[i] = bookname
        }
      }
    }

    const getresult = await request(
      this.source?.Search.SearchUrl,
      this.source?.Search.Method,
      payload
    )

    this.requestHtml = getresult.data
    console.log('<Search Page>')
    // console.log(this.requestHtml)

    this.bsa = new BookSourceAnalysis(this.requestHtml)

    return getresult.data
  }

  async getTestHtml(bookname: string) {
    this.requestHtml = await readFile('./static/bookshelf/test/test.html')
    this.bsa = new BookSourceAnalysis(this.requestHtml)
    return this.requestHtml
  }

  async test() {
    this.getBookList()
  }

  async getBookList() {
    this.bsa.ruleSearch(this.source.Search.ResultBookListRule)?.map((bookCard: string) => {
      let b = new BookSourceAnalysis(bookCard)

      // console.log(bookCard);
      

      let sourceName = this.source.SourceName || ''
      let detailUrl = b.ruleSearch(this.source.Search.DetailUrlRule)[0] || ''
      let bookName = b.ruleSearch(this.source.Search.BookNameRule)[0] || ''
      let author = b.ruleSearch(this.source.Search.AuthorRule)[0] || ''
      let wordsCount = b.ruleSearch(this.source.Search.WordsCountRule)[0] || ''
      let newChapter = b.ruleSearch(this.source.Search.NewChapterRule)[0] || ''
      let newChapterDate = b.ruleSearch(this.source.Search.NewChapterDateRule)[0] || ''

      // console.log(bookCard,this.source.Search.IntroRule);
      
      let intro = b.ruleSearch(this.source.Search.IntroRule)[0] || ''
      // console.log(intro);
      
      let img = b.ruleSearch(this.source.Search.ImgURLRule)[0] || ''
      let type = b.ruleSearch(this.source.Search.TypeRule)[0] || ''

      if (detailUrl === '') {
        return
      }
      if (detailUrl.indexOf(this.source.BaseUrl) == -1) {
        detailUrl = `${this.source.BaseUrl}${detailUrl}`
      }

      const book: SearchResult = {
        DetailUrl: detailUrl,
        BookName: bookName,
        Type: type,
        Author: author,
        WordsCount: wordsCount,
        NewChapter: newChapter,
        Intro: intro,
        ImgURL: img,
        NewChapterDate: newChapterDate,
        SourceName: sourceName
      }

      this.SearchResult.push(book)
    })

    return this.SearchResult
  }
}
