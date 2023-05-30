<template>
  <div id="edit">
    <div class="back" @click="back">
      <the-icon :icon="'back_android'"></the-icon>
    </div>

    <div class="container">
      <div class="edit">
        <form action="#edit" spellcheck="false" @submit="check">
          <fieldset class="card base">
            <legend><h4 class="des">基本信息</h4></legend>

            <div class="content">
              <div class="item">
                <label for="sourcename"> 书源名* </label>
                <input name="sourcename" id="sourcename" required type="text" />
              </div>
              <div class="item">
                <label for="baseurl"> 域名* </label>
                <input name="baseurl" id="baseurl" required type="text" />
              </div>
            </div>
          </fieldset>

          <fieldset v-show="showSearch" class="card search">
            <legend><h4 class="des">搜索</h4></legend>
            <div class="content">
              <div class="item">
                <input class="searchText" type="text" placeholder="书名" />
                <label for="searchurl"> 搜索地址* </label>
                <input
                  name="searchurl"
                  id="searchurl"
                  :required="showSearch"
                  type="text"
                />
              </div>

              <div class="item">
                <div class="action">请求方式*</div>
                <fieldset>
                  <input
                    :required="showSearch"
                    type="radio"
                    id="GET"
                    name="action"
                    value="GET"
                    checked
                  />
                  <label for="get">Get</label>

                  <input
                    :required="showSearch"
                    type="radio"
                    id="POST"
                    name="action"
                    value="POST"
                  />
                  <label for="post">Post</label>
                </fieldset>
              </div>

              <div class="item">
                <label for="payload"> 载荷* </label>
                <input
                  name="payload"
                  id="payload"
                  :required="showSearch"
                  type="text"
                />
              </div>

              <div class="item">
                <label for="booklist"> 书籍列表规则* </label>
                <input
                  name="booklist"
                  id="booklist"
                  :required="showSearch"
                  type="text"
                />
                <label for="bookurl"> 详细地址规则* </label>
                <input
                  name="bookurl"
                  id="bookurl"
                  :required="showSearch"
                  type="text"
                />
                <label for="bookname"> 书名规则*</label>
                <input
                  name="bookname"
                  id="bookname"
                  :required="showSearch"
                  type="text"
                />
                <label for="author"> 作者规则 </label>
                <input name="author" id="author" type="text" />
                <label for="type"> 类型规则 </label>
                <input name="type" id="type" type="text" />
                <label for="count"> 字数规则 </label>
                <input name="count" id="count" type="text" />
                <label for="newchapter"> 最新章节名规则 </label>
                <input name="newchapter" id="newchapter" type="text" />
                <label for="intro"> 简介规则 </label>
                <input name="intro" id="intro" type="text" />
                <label for="img"> 封面规则 </label>
                <input name="img" id="img" type="text" />
              </div>
            </div>
          </fieldset>

          <fieldset class="card detail">
            <legend><h4 class="des">书籍详情</h4></legend>
            <div class="content">
              <div class="item" v-show="!showSearch">
                <label for="d-bookurl"> 书籍地址* </label>
                <input
                  name="d-bookurl"
                  id="d-bookurl"
                  :required="!showSearch"
                  type="text"
                />
              </div>

              <div class="item">
                <label for="d-bookname"> 书名规则* </label>
                <input name="d-bookname" id="d-bookname" required type="text" />
                <label for="d-author">作者规则 </label>
                <input name="d-author" id="d-author" type="text" />
                <label for="d-type"> 类型规则 </label>
                <input name="d-type" id="d-type" type="text" />
                <label for="d-count"> 字数规则 </label>
                <input name="d-count" id="d-count" type="text" />
                <label for="d-newchapter"> 最新章节名规则 </label>
                <input name="d-newchapter" id="d-newchapter" type="text" />
                <label for="d-intro"> 简介规则 </label>
                <input name="d-intro" id="d-intro" type="text" />
                <label for="d-img"> 封面规则 </label>
                <input name="d-img" id="d-img" type="text" />
              </div>
            </div>
          </fieldset>

          <fieldset class="card content">
            <legend><h4 class="des">书籍内容</h4></legend>
            <div class="content">
              <div class="item">
                <label for="trueurl"> 真实地址规则 </label>
                <input name="trueurl" id="trueurl" type="text" />
                <label for="catalogue-list">章节列表规则* </label>
                <input
                  name="catalogue-list"
                  id="catalogue-list"
                  required
                  type="text"
                />
                <label for="cname"> 章节名规则* </label>
                <input name="cname" id="cname" required type="text" />
                <label for="curl"> 章节地址规则* </label>
                <input name="curl" id="curl" required type="text" />
                <label for="cnext"> 下一页章节规则 </label>
                <input name="cnext" id="cnext" type="text" />
                <label for="content"> 内容规则* </label>
                <input name="content" id="content" required type="text" />
                <label for="next-content"> 下一页内容规则 </label>
                <input name="next-content" id="next-content" type="text" />
              </div>
            </div>
          </fieldset>

          <button type="button" class="btn run" @click="test">运行</button>
          <button type="submit" class="btn">保存</button>
        </form>
      </div>
      <div class="view">
        <div class="loader">
          loading
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
        <div class="code"><Code :code="code"></Code></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  onBeforeMount,
  ComputedRef,
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  Ref,
  toRaw,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import _ from "lodash";
import TheIcon from "../../components/TheIcon.vue";
import Code from "../../components/utils/Code.vue";

import {
  BookSource,
  SearchSource,
  ContentSource,
  BookDetailSource,
} from "../../assets/interface/BookSource";
import { getInputElementMapping } from "../../assets/utils/utils";
import {
  clearFiles,
  readJsonFile,
  writeJsonFile,
} from "../../assets/utils/operationFile";
import { ContentRequest } from "../../assets/utils/ContentRequest";
import { save as saveBook } from "../../assets/utils/DetailsRequest";

const store = useStore();
const router = useRouter();
const route = useRoute();
const bookSourceAllData: ComputedRef<BookSource[]> = computed(() =>
  toRaw(store.state.BookSource.bookSourceList)
);
const thisBooksource: Ref<any> = ref();
const defaultBookSource: BookSource = toRaw(store.state.BookSource.bookSource);

const bookshelfPath = "./static/bookshelf/";

const showSearch = ref(true);
const queryParams = route.query;
let cacheBookDetail: any = {};

let code: any = ref();

function back() {
  router.back();
}
onBeforeMount(() => {
  thisBooksource.value = _.filter(
    bookSourceAllData.value,
    (o: BookSource) => o.SourceName === queryParams.sourceName
  )[0];

  // 加书模式
  if (!queryParams.model) return;
  if (queryParams.model === "addBooK") showSearch.value = false;
});

onMounted(() => {
  source2thisEle(toRaw(thisBooksource.value) as BookSource);
});
onBeforeUnmount(async () => {
  // 清除form缓存
  const form = document.querySelector("form") as HTMLFormElement;
  form.reset();

  // 恢复当前书源
  store.dispatch("setBookSource", defaultBookSource.SourceName);
  clearCache();
});

async function test() {
  await clearCache();
  // 将测试源导入为当前使用源
  thisBooksource.value = thisEle2SourceObj();
  thisBooksource.value = {
    ...thisBooksource.value,
    SourceName: "test",
  };
  console.log(thisBooksource.value);

  store.commit("setTestSource", thisBooksource.value);

  const loaderEle = document.querySelector(".loader") as HTMLElement;
  loaderEle.style.opacity = "1";

  code.value = "";
  try {
    await requestData();
  } catch (e) {
    console.log(e);

    code.value = { ...code.value, "error message": e };
  }
  loaderEle.style.opacity = "0";

  return false;
}

function check(e: Event) {
  save();
  e.preventDefault();
  return false;
}

async function save() {
  if (
    document.querySelector<HTMLInputElement>("#sourcename")?.value === "test"
  ) {
    alert("请修改书源名称");
    return;
  }

  const path = "./static/configs/BookSource.json";

  let bookSources: BookSource[] = await readJsonFile(path);
  const bookSource = thisEle2SourceObj();

  bookSources.unshift(bookSource);
  bookSources = _.uniqBy(bookSources, "SourceName");

  await writeJsonFile(path, bookSources);
  await store.dispatch("setBookSourceList", bookSources);

  if (queryParams.model === "addBooK") {
    const bookDetail = {
      ...cacheBookDetail,
      SourceName: bookSource.SourceName,
    };
    saveBook(bookDetail);
    alert("加书成功");
    return;
  }

  alert("保存成功");
}

async function requestData() {
  const mapping = bookSourceMapping();
  const searchBookName =
    document.querySelector<HTMLInputElement>(".searchText")?.value || "书";
  const chapterLenght = 3;

  //  模拟搜索
  let bookDetail: any = {};
  if (queryParams.model !== "addBooK") {
    await store.dispatch("searchBook", searchBookName);
    const firstBook = toRaw(store.state.SearchBookList.searchResult)[0];
    bookDetail = { ...firstBook };
    // 去除对象空值
    bookDetail = _.pickBy(bookDetail, (o) => o !== "");
    bookDetail = {
      ...bookDetail,
      SourceName: mapping.thisSourceName.value,
    };
    code.value = {
      "搜索结果（首个）": bookDetail,
    };
  }

  // 强制加书 更改 书籍详情页
  if (queryParams.model === "addBooK") {
    bookDetail = {
      ...bookDetail,
      DetailUrl: mapping.thisDetailBookUrl.value,
    };
  }

  bookDetail = {
    ...bookDetail,
    SourceName: "test",
  };

  // 模拟请求书籍详情
  await store.dispatch("requestBookDetail", bookDetail);
  const data = _.pickBy(store.state.BookDetails.bookDetail, (o) => o !== "");

  code.value = {
    ...code.value,
    书籍详情: {
      ...data,
      ChapterList: [
        ..._.take(data.ChapterList, chapterLenght),
        `..........后${chapterLenght}章..........`,
        ..._.takeRight(data.ChapterList, chapterLenght),
      ],
    },
  };

  if (queryParams.model === "addBooK") {
    cacheBookDetail = {
      ...bookDetail,
      ...data,
    };
  }

  // 所有经此测试器的源都走 test 测试源
  bookDetail = {
    ...data,
    ...bookDetail,
    BookName: "test",
    SourceName: "test",
  };

  const contentReq = new ContentRequest(bookDetail);
  await contentReq.init();
  code.value = {
    ...code.value,
    正文第一章: await contentReq.readContent(0),
  };

  return true;
}

function bookSourceMapping() {
  const thisBaseUrl = getInputElementMapping("#baseurl");
  const thisSourceName = getInputElementMapping("#sourcename");

  const thisSearchAction = getInputElementMapping('input[name="action"]');
  const thisSearchUrl = getInputElementMapping("#searchurl");
  const thisSearchPayload = getInputElementMapping("#payload");
  const thisSearchBookList = getInputElementMapping("#booklist");
  const thisSearchBookUrl = getInputElementMapping("#bookurl");
  const thisSearchBookName = getInputElementMapping("#bookname");
  const thisSearchAuthor = getInputElementMapping("#author");
  const thisSearchType = getInputElementMapping("#author");
  const thisSearchCount = getInputElementMapping("#count");
  const thisSearchNewChapter = getInputElementMapping("#newchapter");
  const thisSearchIntro = getInputElementMapping("#intro");
  const thisSearchImg = getInputElementMapping("#img");

  const thisDetailBookUrl = getInputElementMapping("#d-bookurl");

  const thisDetailBookName = getInputElementMapping("#d-bookname");
  const thisDetailAuthor = getInputElementMapping("#d-author");
  const thisDetailType = getInputElementMapping("#d-type");
  const thisDetailCount = getInputElementMapping("#d-count");
  const thisDetailNewChapter = getInputElementMapping("#d-newchapter");
  const thisDetailIntro = getInputElementMapping("#d-intro");
  const thisDetailImg = getInputElementMapping("#d-img");

  const thisContentChapterList = getInputElementMapping("#catalogue-list");
  const thisTrueUrl = getInputElementMapping("#trueurl");
  const thisContentChapterName = getInputElementMapping("#cname");
  const thisContentChapterUrl = getInputElementMapping("#curl");
  const thisContentChapterNextPage = getInputElementMapping("#cnext");
  const thisContent = getInputElementMapping("#content");
  const thisContentNextPage = getInputElementMapping("#next-content");

  return {
    thisBaseUrl,
    thisSourceName,
    thisSearchAction,
    thisSearchUrl,
    thisSearchPayload,
    thisSearchBookList,
    thisSearchBookUrl,
    thisSearchBookName,
    thisSearchAuthor,
    thisSearchType,
    thisSearchCount,
    thisSearchNewChapter,
    thisSearchIntro,
    thisSearchImg,
    thisDetailBookUrl,
    thisDetailBookName,
    thisDetailAuthor,
    thisDetailType,
    thisDetailCount,
    thisDetailNewChapter,
    thisDetailIntro,
    thisDetailImg,
    thisContentChapterList,
    thisTrueUrl,
    thisContentChapterName,
    thisContentChapterUrl,
    thisContentChapterNextPage,
    thisContent,
    thisContentNextPage,
  };
}

function source2thisEle(source: BookSource) {
  const mapping = bookSourceMapping();
  mapping.thisSourceName.ele.value = "test";
  if (!source) return;

  mapping.thisSourceName.ele.value = source.SourceName;
  mapping.thisBaseUrl.ele.value = source.BaseUrl;

  mapping.thisSearchUrl.ele.value = source.Search.SearchUrl;

  if (source.Search.Method) {
    const actionEle = document.querySelector(`#${source.Search.Method}`);
    (actionEle as HTMLInputElement).checked = true;
  }
  mapping.thisSearchAction.ele.value = source.Search.Method || "GET";
  mapping.thisSearchPayload.ele.value = JSON.stringify(source.Search.Payload);
  mapping.thisSearchBookList.ele.value = source.Search.ResultBookListRule;
  mapping.thisSearchBookUrl.ele.value = source.Search.DetailUrlRule;
  mapping.thisSearchBookName.ele.value = source.Search.BookNameRule;
  mapping.thisSearchAuthor.ele.value = source.Search.AuthorRule;
  mapping.thisSearchType.ele.value = source.Search.TypeRule;
  mapping.thisSearchCount.ele.value = source.Search.WordsCountRule;
  mapping.thisSearchNewChapter.ele.value = source.Search.NewChapterRule;
  mapping.thisSearchIntro.ele.value = source.Search.IntroRule;
  mapping.thisSearchImg.ele.value = source.Search.ImgURLRule;

  mapping.thisDetailBookName.ele.value = source.BookDetail.BookNameRule;
  mapping.thisDetailAuthor.ele.value = source.BookDetail.AuthorRule;
  mapping.thisDetailType.ele.value = source.BookDetail.TypeRule;
  mapping.thisDetailCount.ele.value = source.BookDetail.WordsCountRule;
  mapping.thisDetailNewChapter.ele.value = source.BookDetail.NewChapterRule;
  mapping.thisDetailIntro.ele.value = source.BookDetail.IntroRule;
  mapping.thisDetailImg.ele.value = source.BookDetail.ImgURLRule;
  mapping.thisTrueUrl.ele.value = source.BookDetail.Content.DetailUrlRule;

  mapping.thisContentChapterList.ele.value =
    source.BookDetail.Content.CatalogueListRule;
  mapping.thisContentChapterName.ele.value =
    source.BookDetail.Content.CatalogueNameRule;
  mapping.thisContentChapterUrl.ele.value =
    source.BookDetail.Content.CatalogueUrlRule;
  mapping.thisContentChapterNextPage.ele.value =
    source.BookDetail.Content.NextCatalogePageRule;
  mapping.thisContent.ele.value = source.BookDetail.Content.ContentRule;
  mapping.thisContentNextPage.ele.value =
    source.BookDetail.Content.NextContentPageRule;
}

function thisEle2SourceObj(): BookSource {
  const mapping = bookSourceMapping();

  const search: SearchSource = {
    SearchUrl: mapping.thisSearchUrl.value,
    Method: mapping.thisSearchAction.value as "GET" | "POST",
    Payload: JSON.parse(mapping.thisSearchPayload.value || "[]"),
    ResultBookListRule: mapping.thisSearchBookList.value,
    DetailUrlRule: mapping.thisSearchBookUrl.value,
    BookNameRule: mapping.thisSearchBookName.value,
    AuthorRule: mapping.thisSearchAuthor.value,
    TypeRule: mapping.thisSearchType.value,
    WordsCountRule: mapping.thisSearchCount.value,
    NewChapterRule: mapping.thisSearchNewChapter.value,
    IntroRule: mapping.thisSearchIntro.value,
    ImgURLRule: mapping.thisSearchImg.value,
    NewChapterDateRule: "",
  };

  const content: ContentSource = {
    DetailUrlRule: mapping.thisTrueUrl.value,
    CatalogueListRule: mapping.thisContentChapterList.value,
    CatalogueNameRule: mapping.thisContentChapterName.value,
    CatalogueUrlRule: mapping.thisContentChapterUrl.value,
    NextCatalogePageRule: mapping.thisContentChapterNextPage.value,
    ContentRule: mapping.thisContent.value,
    NextContentPageRule: mapping.thisContentNextPage.value,
  };

  const bookDetail: BookDetailSource = {
    BookNameRule: mapping.thisDetailBookName.value,
    AuthorRule: mapping.thisDetailAuthor.value,
    TypeRule: mapping.thisDetailType.value,
    WordsCountRule: mapping.thisDetailCount.value,
    NewChapterRule: mapping.thisDetailNewChapter.value,
    NewChapterDateRule: "",
    IntroRule: mapping.thisDetailIntro.value,
    ImgURLRule: mapping.thisDetailImg.value,
    Content: content,
  };

  return {
    SourceName: mapping.thisSourceName.value,
    BaseUrl: mapping.thisBaseUrl.value,
    Search: search,
    BookDetail: bookDetail,
  };
}

async function clearCache() {
  store.commit("removeSource", "test");

  // 清除缓存
  clearFiles(bookshelfPath + "test", "html");
}
</script>

<style scoped lang="scss">
#edit {
  width: 100%;
  height: 100%;
}

.back {
  height: 32px;
  margin: 4px;
  transition: transform 0.3s ease-in;

  &:hover {
    transform: translateX(-3px);
    svg {
      color: orangered;
    }
  }
}

.container {
  margin: 0 auto;
  width: 92%;
  height: calc(100% - 48px);
  display: grid;
  grid-template-columns: 8fr 5fr;
  grid-column-gap: 4px;
}

.container .edit {
  height: 100%;
  overflow: auto;
  .card {
    margin: 20px 0;
    width: 76%;
    padding: 10px;
    border-radius: 8px;

    background: hsl(0, 0%, 30%);
    box-shadow: 0 0 8px hsla(0, 0%, 8%, 0.8);

    legend {
      margin-left: 10px;
      height: 0px;
      line-height: 0px;
      .des {
        color: var(--text-color);
      }
    }

    .content {
      padding-left: 18px;
    }

    label {
      margin: 8px auto;
      display: block;
    }
    input[type="radio"] {
      margin-left: 12px;
    }
    input[type="text"] {
      margin-left: 12px;
      padding-left: 6px;
      height: 32px;
      width: 268px;
      line-height: 32px;

      color: black;
      outline: none;
      border: none;
      border-radius: 4px;

      box-shadow: 0 0 0 0px transparent;
      background: hsl(0, 0%, 90%);

      &:focus {
        box-shadow: 0 0 0 2px hsl(209, 80%, 55%);
      }
    }

    .item {
      margin: 8px 0;
    }
  }
}

.container .view {
  border-radius: 8px;
  background-color: hsl(0, 0%, 18%);
  box-shadow: 0 0 3px black;
  overflow: auto;
  height: 100%;

  position: relative;
  .loader {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 10%);
    opacity: 0;

    @keyframes load {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }

    span {
      animation: load 1s ease-in-out infinite;
    }
    span:nth-child(2) {
      animation-delay: 0.3s;
    }
    span:nth-child(3) {
      animation-delay: 0.6s;
    }
  }
}

.btn {
  color: black;
}

/****************************888**** */
.base {
  input#sourcename {
    width: 168px;
  }
}
.search {
  input#searchurl {
    width: 368px;
  }

  .item:nth-child(2) {
    label {
      display: unset;
      margin-right: 8px;
    }
  }

  .item:nth-child(3) {
    input[type="text"] {
      width: 368px;
    }
  }

  .item:nth-child(4) {
    input[type="text"] {
      width: 378px;
    }
  }
}

.detail {
  .content .item:first-child {
    input {
      width: 368px;
    }
  }
}

.container .edit .card input.searchText {
  width: 128px;
}
</style>
