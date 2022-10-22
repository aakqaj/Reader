<template>
  <Teleport to="body">
    <div id="my-book">
      <chapter-list></chapter-list>
      <Content :content="content"></Content>
      <tools></tools>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import ChapterList from "../components/BookControl/ChapterList.vue";
import Tools from "../components/BookControl/Tools.vue";
import Content from "../components/Content.vue";

import { useRouter } from "vue-router";
import { useStore } from "vuex";

import { getCursor } from "../assets/utils/requestBookCursor";
import { ContentRequest } from "../assets/utils/ContentRequest";
import { ChapterQueue } from "../assets/utils/ChapterQueue";

import { computed, onBeforeMount, Teleport, toRaw, watch, ref } from "vue";

const store = useStore();
const router = useRouter();

const bookDetail = computed(() => store.state.BookDetails.bookDetail);
const chapterQueue = new ChapterQueue();
const content = ref<any>([]);
let contentReq = new ContentRequest(toRaw(bookDetail.value));

onBeforeMount(async () => {
  // 在vuex中载入储存在浏览器的此书第游标值
  store.dispatch("setCursor", getCursor(toRaw(bookDetail.value).BookName));

  await contentReq.init();
  let cursor = store.state.BookState.bookNameToCursor;

  chapterQueue.setQueue([
    await contentReq.readContent(cursor - 1),
    await contentReq.readContent(cursor),
    await contentReq.readContent(cursor + 1),
  ]);
  content.value = [...chapterQueue.getQueue()];
});

// 章节变动 立即请求内容
watch(
  () => store.state.BookState.bookNameToCursor,
  async (cursor: number, preCursor: number) => {
    cursor = Number(cursor);
    preCursor = Number(preCursor);
    if (Math.abs(cursor - preCursor) == 1) {
      if (cursor - preCursor == 1) {
        chapterQueue.addToEnd(await contentReq.readContent(cursor + 1));
      } else {
        chapterQueue.addToStart(await contentReq.readContent(cursor - 1));
      }
    } else {
      chapterQueue.clear();
      chapterQueue.setQueue([
        await contentReq.readContent(cursor - 1),
        await contentReq.readContent(cursor),
        await contentReq.readContent(cursor + 1),
      ]);
    }
    content.value = [...chapterQueue.getQueue()];
  }
);
</script>

<style scoped lang="scss">
body {
  position: relative;
}

#my-book {
  width: 100vw;
  height: 100vh;

  min-width: 520px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;

  background-color: var(--bg);
  overflow: scroll;
}
</style>
