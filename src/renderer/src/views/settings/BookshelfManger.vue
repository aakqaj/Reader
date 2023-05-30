<template>
  <div class="bookshelf-manger">
    <div class="book-list">
      <div class="book-card" v-for="book in bookList" :key="book.BookName">
        <div class="bookname">{{ book.BookName }}</div>
        <div class="control">
          <span class="icon-container" @click="deleteBook(book.BookName)">
            <div class="tips">删除</div>
            <the-icon :icon="'shanchu'" class="delete"></the-icon
          ></span>
          <span class="icon-container" @click="clearCache(book.BookName)">
            <div class="tips">清除缓存</div>
            <the-icon :icon="'qingchu'" class="clear"></the-icon
          ></span>
          <span
            class="icon-container"
            @click="importReplaceRule(book.BookName)"
          >
            <div class="tips">导入</div>
            <the-icon :icon="'daoru'" class="import"></the-icon
          ></span>
          <span
            class="icon-container"
            @click="exportReplaceRule(book.BookName)"
          >
            <div class="tips">导出</div>
            <the-icon :icon="'daochu'" class="export"></the-icon
          ></span>
        </div>
      </div>

      <!-- <div class="io-btn">
        <button class="bttn-pill bttn-md bttn-primary">导入书籍</button>
        <button class="bttn-pill bttn-md bttn-primary">导出书籍</button>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, toRaw } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import _, { isEqual } from "lodash";
import { message } from "ant-design-vue";

import {
  clearFiles,
  deleteDir,
  readJsonFile,
  writeJsonFile,
} from "../../assets/utils/operationFile";
import { readReplaceRule } from "../../assets/utils/readReplaceReg";
import TheIcon from "../../components/TheIcon.vue";
import { removeCursor } from "../../assets/utils/requestBookCursor";
const store = useStore();
const route = useRoute();
message.config({
  top: `100px`,
  rtl: true,
});

store.commit("reloadBookshelf");
let bookList = computed(() => toRaw(store.state.Bookshelf.bookList));

const bookshelfPath = "./static/bookshelf/";

watch(
  () => route,
  () => {
    // 回调函数
    store.commit("reloadBookshelf");
    bookList = computed(() => store.state.Bookshelf.bookList);
  },
  {
    immediate: true,
    deep: true,
  }
);

async function deleteBook(bookname: string) {
  if (!confirm("sure")) return;

  await deleteDir(`./static/bookshelf/${bookname}`);
  let bookShelfJson = await readJsonFile("./static/bookshelf/bookshelf.json");
  bookShelfJson = bookShelfJson.filter(
    (item: any) => item.BookName !== bookname
  );
  await writeJsonFile("./static/bookshelf/bookshelf.json", bookShelfJson);
  removeCursor(bookname);

  store.commit("reloadBookshelf");
  bookList = computed(() => store.state.Bookshelf.bookList);
}

function clearCache(bookName: string) {
  if (confirm("sure")) {
    clearFiles(bookshelfPath + bookName, "html");
    console.log("delit");
    alert("清除成功");
  }
}

async function importReplaceRule(bookName: string) {
  try {
    const data = JSON.parse(await navigator.clipboard.readText());
    let sourceReplaceRule = _.filter(
      await readReplaceRule(bookName),
      (item) => item.source !== "无替换净化规则"
    );
    sourceReplaceRule.push(...data);
    sourceReplaceRule = _.uniqWith(sourceReplaceRule, isEqual);
    writeJsonFile(
      `${bookshelfPath}${bookName}/replaceReg.json`,
      sourceReplaceRule
    );

    message.success("导入成功", 0.8);
  } catch (e) {
    console.log(e);

    message.error("错误的净化规则", 0.8);
  }
}

async function exportReplaceRule(bookName: string) {
  const data = await readReplaceRule(bookName);
  const clipboardObj = navigator.clipboard;
  clipboardObj.writeText(JSON.stringify(data));

  message.success("对象已置于剪切板", 0.8);
}
</script>

<style scoped lang="scss">
@import url("../../assets/css/bbtn.min.css");
.bookshelf-manger {
  padding: 40px;
  height: 100%;
  overflow: scroll;

  position: relative;
}

.book-list {
  height: 90%;

  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 360px);
  grid-template-rows: repeat(auto-fill, 136px);
  grid-row-gap: 24px;
  grid-column-gap: 12px;

  overflow: scroll;
}

.book-card {
  padding: 10px;
  height: 128px;
  cursor: auto;

  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.01);
  }

  border-radius: 18px;
  position: relative;

  .control {
    position: absolute;
    bottom: 2px;
    right: 26px;
  }

  .icon-container {
    position: relative;
    display: inline-block;
  }

  /* Tooltip 文本 */
  .icon-container .tips {
    // width: 120px;
    min-width: 74px;
    width: 100%;
    height: 24px;
    background-color: hsla(0, 0%, 20%, 0.6);

    text-align: center;
    padding: 0 5px;
    border-radius: 6px;

    /* 定位工具提示文本 - 请看下面的例子 */
    position: absolute;
    top: -28px;
    transform: translateX(-28px);

    opacity: 0;

    &::before {
      content: "";
      position: absolute;
      border-width: 4px;
      border-style: solid;
      top: 100%;
      left: 45%;

      border-color: hsla(0, 0%, 20%, 0.6) transparent transparent transparent;
    }
  }

  /* 将鼠标悬停在工具提示容器上时，显示工具提示文本 */
  .icon-container:hover .tips {
    opacity: 1;
  }
}
.icon {
  width: 18px;
}

.io-btn {
  position: absolute;
  bottom: 60px;
  right: 88px;
  display: flex;

  button {
    margin: 10px;
    border-radius: 8px;

    &:hover {
      transform: scale(1.04);
    }
  }
}

.book-card {
  background-color: hsl(222, 12%, 34%);
  box-shadow: 1px 1px 10px hsla(0, 2%, 30%, 1);
}
</style>
