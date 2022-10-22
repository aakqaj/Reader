export interface SearchSource extends BookSource {
  SearchUrl: string;
  Method: "POST" | "GET";
  Payload: {} | string[];

  ResultBookListRule: string;
  DetailUrlRule: string;
  BookNameRule: string;
  AuthorRule: string;
  TypeRule: string;
  WordsCountRule: string;
  NewChapterRule: string;
  NewChapterDateRule: string;
  IntroRule: string;
  ImgURLRule: string;
}

export interface BookDetailSource extends BookSource {
  BookNameRule: string;
  AuthorRule: string;
  TypeRule: string;
  WordsCountRule: string;
  NewChapterRule: string;
  NewChapterDateRule: string;
  IntroRule: string;
  ImgURLRule: string;
  Content: ContentSource;
}

export interface ContentSource {
  DetailUrlRule: string;
  CatalogueListRule: string;
  CatalogueNameRule: string;
  CatalogueUrlRule: string;
  NextCatalogePageRule: string;
  ContentRule: string;
  NextContentPageRule: string;
}

export interface BookSource {
  SourceName: string;
  BaseUrl: string;
  Search: SearchSource;
  BookDetail: BookDetailSource;
}
