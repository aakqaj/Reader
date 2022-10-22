export interface Chapter {
  ChapterName: string
  ChapterUrl: string
  Content?: string
}

export interface BookDetail {
  SourceName?: string
  BaseUrl?: string
  DetailUrl?: string
  BookName?: string
  Author?: string
  BookImg?: string
  ImgURL?: string
  Intro?: string
  Type?: string
  WordsCount?: string
  NewChapter?: string
  NewChapterDate?: string
  ChapterList?: Chapter[]
}
