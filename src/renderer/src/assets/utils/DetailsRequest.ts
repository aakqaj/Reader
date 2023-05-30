import BookSourceAnalysis from "./BookSourceAnalysis";
import { BookSource, BookDetailSource } from "../interface/BookSource";
import { BookDetail, Chapter } from "../interface/BookDeatils";
import {
  readJsonFile,
  writeJsonFile,
  createDir,
  exists,
  existsSync,
  deleteDir,
} from "./operationFile";
import { request } from "./request";
import { joinUrl, isUrl } from "./utils";
import { removeCursor } from "./requestBookCursor";
import { store } from "../../store";
import { toRaw } from "vue";

// import { deatilTestData } from './detailsTest'

export class DetailsRequest {
  bsa!: BookSourceAnalysis;
  bookDetail!: BookDetail;
  sourceBookDetails!: BookDetailSource;
  requestHtml: string;
  public constructor(bDetail: BookDetail) {
    this.bookDetail = {
      ...bDetail,
      ChapterList: [],
    };

    this.requestHtml = "";
  }

  public async init() {
    const state: any = toRaw(store.state);
    const sourceList: BookSource[] = state.BookSource.bookSourceList;

    const source = sourceList.filter(
      (item) => item.SourceName == this.bookDetail.SourceName
    )[0];
    this.sourceBookDetails = source.BookDetail;

    this.bookDetail = { ...this.bookDetail, BaseUrl: source.BaseUrl };
  }

  public async getAllDataOfDetails() {
    await this.init();
    await this.getRequestHtml();
    await this.getBookDetail();
    return this.bookDetail;
  }

  public async getRequestHtml(url: string = this.bookDetail.DetailUrl || "") {
    console.log("<debug>", url, this.bookDetail);
    const getresult = await request(url, "GET", null);
    this.requestHtml = getresult.data;
    this.bsa = new BookSourceAnalysis(this.requestHtml);
    return getresult.data;
  }

  private async loadMetaData() {
    let leftUrl = this.bookDetail.BaseUrl;
    const defaultImg =
      "https://img1.baidu.com/it/u=2723741487,3517617872&fm=253&fmt=auto&app=138&f=JPG?w=500&h=710";
    let bookName =
      this.bsa.ruleSearch(this.sourceBookDetails.BookNameRule)[0] || "";
    let author =
      this.bsa.ruleSearch(this.sourceBookDetails.AuthorRule)[0] || "";
    let wordsCount =
      this.bsa.ruleSearch(this.sourceBookDetails.WordsCountRule)[0] || "";
    let newChapter =
      this.bsa.ruleSearch(this.sourceBookDetails.NewChapterRule)[0] || "";
    let newChapterDate =
      this.bsa.ruleSearch(this.sourceBookDetails.NewChapterDateRule)[0] || "";

    let intro = this.bsa.ruleSearch(this.sourceBookDetails.IntroRule)[0] || "";
    let img =
      this.bsa.ruleSearch(this.sourceBookDetails.ImgURLRule)[0] || defaultImg;

    // if (img !== defaultImg) {
    //   img = joinUrl(this.bookDetail.BaseUrl, img)
    // }
    if (!img.includes("http")) img = joinUrl(leftUrl, img);

    let type = this.bsa.ruleSearch(this.sourceBookDetails.TypeRule)[0] || "";

    this.bookDetail = {
      ...this.bookDetail,
      BookName: bookName,
      Author: author,
      WordsCount: wordsCount,
      NewChapter: newChapter,
      NewChapterDate: newChapterDate,
      Intro: intro,
      ImgURL: img,
      Type: type,
    };
  }

  private async requestTrueData() {
    let leftUrl = this.bookDetail.BaseUrl;
    let url = this.bsa.ruleSearch(
      this.sourceBookDetails.Content.DetailUrlRule
    )[0];

    try {
      await request(joinUrl(leftUrl, url), "GET", null);
    } catch {
      leftUrl = this.bookDetail.DetailUrl;
    }
    url = joinUrl(leftUrl, url);

    this.bookDetail = {
      ...this.bookDetail,
      DetailUrl: url,
    };

    await this.getRequestHtml(url);
  }

  private async setChapterList() {
    let nextPageRule = this.sourceBookDetails.Content.NextCatalogePageRule;
    let chapterList: Chapter[] = [];
    let leftUrl = this.bookDetail.BaseUrl;

    // 推断 章节详情页依据 域名 还是 此页网址 进行拼接
    const test = this.bsa.ruleSearch(
      this.sourceBookDetails.Content.CatalogueListRule
    )[0];
    const testB = new BookSourceAnalysis(test);
    const testUrl =
      testB.ruleSearch(this.sourceBookDetails.Content.CatalogueUrlRule)[0] ||
      "";

    try {
      await request(joinUrl(leftUrl, testUrl), "GET", null);
      console.log("use base");
    } catch {
      leftUrl = this.bookDetail.DetailUrl;
    }

    this.bsa
      .ruleSearch(this.sourceBookDetails.Content.CatalogueListRule)
      .map((item: string) => {
        let b = new BookSourceAnalysis(item);
        let url =
          b.ruleSearch(this.sourceBookDetails.Content.CatalogueUrlRule)[0] ||
          "";
        url = joinUrl(leftUrl, url);

        chapterList.push({
          ChapterName:
            b.ruleSearch(this.sourceBookDetails.Content.CatalogueNameRule)[0] ||
            "",
          ChapterUrl: url,
        });
      });

    if (this.bookDetail.ChapterList) {
      this.bookDetail.ChapterList.push(...chapterList);
    }

    if (nextPageRule !== "") {
      let url = this.bsa.ruleSearch(
        this.sourceBookDetails.Content.NextCatalogePageRule
      )[0];
      url = joinUrl(leftUrl, url);
      if (isUrl(url)) {
        await this.getRequestHtml(url);
        await this.setChapterList();

        //超过阈值返回
        if (
          this.bookDetail.ChapterList?.length &&
          this.bookDetail.ChapterList.length > 1000000
        )
          return;
      } else {
        return this.bookDetail;
      }
    }

    return this.bookDetail;
  }

  //Core 获取书籍详情信息
  public async getBookDetail() {
    await this.loadMetaData();

    //是否存在跳转详情网址  如阅读全文
    if (this.sourceBookDetails.Content.DetailUrlRule !== "") {
      await this.requestTrueData();
    }
    await this.setChapterList();

    return this.bookDetail;
  }

  async save() {
    await createDir(`./static/bookshelf/${this.bookDetail.BookName}`);
    writeJsonFile(
      `./static/bookshelf/${this.bookDetail.BookName}/detail.json`,
      this.bookDetail
    );
  }

  async isSave(bookName: string | undefined) {
    return await exists(`./static/bookshelf/${bookName}/detail.json`);
  }
}

export async function save(bookDetail: BookDetail) {
  await createDir(`./static/bookshelf/${bookDetail.BookName}`);
  writeJsonFile(
    `./static/bookshelf/${bookDetail.BookName}/detail.json`,
    bookDetail
  );
  const bookShelfJson = await readJsonFile("./static/bookshelf/bookshelf.json");

  let existsObj = bookShelfJson.filter(
    (item: any) => item.BookName === bookDetail.BookName
  );
  if (existsObj.length === 0) {
    bookShelfJson.push({
      BookName: bookDetail.BookName,
      BookImg: bookDetail.ImgURL,
    });

    console.log(bookDetail);
  }

  writeJsonFile("./static/bookshelf/bookshelf.json", bookShelfJson);
}

export async function deleteBook(bookDetail: BookDetail) {
  await deleteDir(`./static/bookshelf/${bookDetail.BookName}`);
  let bookShelfJson = await readJsonFile("./static/bookshelf/bookshelf.json");
  bookShelfJson = bookShelfJson.filter(
    (item: any) => item.BookName !== bookDetail.BookName
  );
  writeJsonFile("./static/bookshelf/bookshelf.json", bookShelfJson);
  removeCursor(bookDetail.BookName as string);

  removeCursor(bookDetail.BookName as string);
}

export function isSave(bookName: string | undefined) {
  return existsSync(`./static/bookshelf/${bookName}/detail.json`);
}
