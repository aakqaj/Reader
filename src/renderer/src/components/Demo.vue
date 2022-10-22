<template>
  <div>
    <div>text</div>
    <div>
      <button @click="doit">初始化载入</button>
      <button @click="pre">上一章</button>
      <button @click="next">下一章</button>
      <button @click="to">跳转至{{ toCursor }}</button>
      <button @click="demo">demo</button>
      <div>
        <input type="text" v-model.lazy="toCursor" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { ContentRequest } from "../assets/utils/ContentReqTest";
import { deatilTestData } from "../assets/utils/detailsTest";
import { ChapterQueue } from "../assets/utils/ChapterQueue";

const bookDetail = deatilTestData;
const chapterList = bookDetail.ChapterList;
let chapterQueue = new ChapterQueue();
const toCursor = ref(0);

let cursor = 0;

let contentReq = new ContentRequest(deatilTestData);
async function doit() {
  await contentReq.init();

  console.log("init");

  chapterQueue.setQueue([
    await contentReq.readContent(cursor - 1),
    await contentReq.readContent(cursor),
    await contentReq.readContent(cursor + 1),
  ]);

  console.log(chapterQueue.getQueue());
  console.log(chapterList[toCursor.value], "章节名");

  console.log("-------------------------------------------");
}

async function pre() {
  toCursor.value = Number(toCursor.value);
  chapterQueue.addToStart(await contentReq.readContent(cursor - 1));
  toCursor.value -= 1;
  console.log("<pre>");

  console.log(chapterQueue.getQueue());
  console.log(chapterList[toCursor.value]);
  console.log("-------------------------------------------");
}

async function next() {
  console.log("next");
  toCursor.value = Number(toCursor.value);

  chapterQueue.addToEnd(await contentReq.readContent(cursor + 1));
  toCursor.value += 1;

  console.log(chapterQueue.getQueue());
  console.log(chapterList[toCursor.value]);
  console.log("-------------------------------------------");
}

async function to() {
  console.log(toCursor.value);
  chapterQueue.clear();

  console.log("to");

  toCursor.value = Number(toCursor.value);

  chapterQueue.setQueue([
    await contentReq.readContent(toCursor.value - 1),
    await contentReq.readContent(toCursor.value),
    await contentReq.readContent(toCursor.value + 1),
  ]);

  console.log(chapterQueue.getQueue());
  console.log("-------------------------------------------");
}

async function demo() {
  await contentReq.init();
  console.log(await contentReq.requestContent(chapterList[0].ChapterUrl, 0));
}
</script>

<style lang="scss">
body {
  background-color: var(--bg) !important;
}

div {
  color: var(--text-color);
}
</style>
