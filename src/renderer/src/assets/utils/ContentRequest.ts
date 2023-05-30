import BookSourceAnalysis from "./BookSourceAnalysis";
import { BookSource, ContentSource } from "../interface/BookSource";
import { BookDetail, Chapter } from "../interface/BookDeatils";
import { readFile, exists, writeFile } from "./operationFile";
import { request } from "./request";
import { joinUrl } from "./utils";
import { getCursor } from "./requestBookCursor";
import { isSave } from "../utils/DetailsRequest";
import { store } from "../../store";
import { toRaw } from "vue";

export class ContentRequest {
  bookDetail!: BookDetail;
  bookChapter!: Chapter[];
  cursor: number;
  step: number;
  bookname: string;
  contentSource!: ContentSource;

  constructor(bDetail: BookDetail) {
    this.step = 10;
    this.bookDetail = bDetail;
    this.bookname = this.bookDetail.BookName || "";
    this.bookChapter = this.bookDetail.ChapterList as Chapter[]; // 断言存在

    if (!isSave(this.bookname)) {
      this.bookname = "test";
      localStorage.setItem(this.bookname, "0");
      // clearDir("./static/bookshelf/cache/");
    }

    this.cursor = getCursor(this.bookname || "");
  }
  async init() {
    const state: any = toRaw(store.state);
    const sourceList: BookSource[] = state.BookSource.bookSourceList;
    const source = sourceList.filter(
      (item) => item.SourceName == this.bookDetail.SourceName
    )[0];

    console.log(source);

    this.contentSource = source.BookDetail.Content;
  }

  async readContent(cursor: number) {
    if (!this.contentSource) {
      await this.init();
    }

    // 重新获取当前cursor
    this.cursor = getCursor(this.bookname);
    // this.cacheData(cursor);

    setTimeout(() => {
      Promise.all(
        [...new Array(this.step)].map((_, index) =>
          this.requestContent(
            this.bookChapter[cursor + index - this.step / 2]?.ChapterUrl || "",
            Number(cursor) + index - this.step / 2
          )
        )
      );
    }, 10);

    if (cursor < 0 || cursor >= this.bookChapter.length) {
      return null;
    }

    const content = await this.requestContent(
      this.bookChapter[cursor].ChapterUrl,
      cursor
    );

    return content;
  }

  async requestContent(url: string, saveName: number) {
    if (await exists(`./static/bookshelf/${this.bookname}/${saveName}.html`)) {
      //   console.log(`read ${saveName}.html`);
      return await readFile(
        `./static/bookshelf/${this.bookname}/${saveName}.html`
      );
    }

    //  过滤无效请求
    if (
      (saveName < 0 || saveName >= this.bookChapter.length) &&
      saveName !== -500
    ) {
      return null;
    }

    let nextContentPageTextRule =
      this.contentSource.NextContentPageRule.replace(/(?<=@)(.*?)$/gm, "text");
    const contentHtml = await request(url, "GET", null);
    let bsa = new BookSourceAnalysis(contentHtml.data);
    let content = bsa.ruleSearch(this.contentSource.ContentRule)[0];

    if (this.contentSource.NextContentPageRule !== "") {
      //   console.log("有可能有下一页");

      let nextbtnText = bsa.ruleSearch(nextContentPageTextRule)[0];

      // 存在下一页 且 不存在下一章
      if (
        nextbtnText.indexOf("页") !== -1 &&
        nextbtnText.indexOf("章") === -1
      ) {
        // console.log("有下一页按钮");

        url = joinUrl(
          this.bookDetail.DetailUrl,
          bsa.ruleSearch(this.contentSource.NextContentPageRule)[0]
        );

        const c = await this.requestContent(url, -500);
        content += c;
      }
    }

    if (saveName !== -500 && url !== "") {
      writeFile(
        `./static/bookshelf/${this.bookname}/${saveName}.html`,
        content
      );
    }
    return content;
  }
}
