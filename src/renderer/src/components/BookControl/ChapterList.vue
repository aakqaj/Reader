<template>
  <div class="box">
    <my-transition
      class="chapter"
      :show="showChapterList"
      :name="'chapter'"
      :animeObj="animetion"
    >
      <div class="back">
        <the-icon @click="back" :icon="'back_android'"></the-icon>
        <the-search>
          <input
            class="search__input"
            type="text"
            placeholder="Search"
            v-model="searchText"
            @keyup.enter="search"
            @input="resetSearchIndex"
          />
        </the-search>
      </div>
      <div class="chapter-list">
        <div
          class="chapter-name"
          @click="toChapter(index)"
          :id="`to-${index}`"
          v-for="(item, index) in chapterList"
          :key="index"
        >
          <a :class="{ active: index === active }">
            {{ item?.ChapterName }}
          </a>
        </div>
      </div>

      <div class="pre-chapter" @click="toPreChapter">上一章</div>
    </my-transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, toRaw, watch, ref } from "vue";
import MyTransition from "../MyTransition.vue";
import TheIcon from "../TheIcon.vue";
import TheSearch from "../TheSearch.vue";
import { getCursor } from "../../assets/utils/requestBookCursor";

import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const active = ref(-1);
const searchText = ref("");
const showChapterList = computed(() => store.state.BookState.showTools);
const chapterList = computed(
  () => store.state.BookDetails.bookDetail.ChapterList
);

const animetion = {
  enterActive: {
    translateX: [0, "100%"],
    easing: "easeInOutQuad",
    duration: 400,
  },
  leaveActive: {
    translateX: ["100%", 0],
    easing: "easeInOutQuad",
    duration: 400,
  },
};

//使active章节位于左侧工具栏中央 无动画效果
onMounted(() => {
  let cursor = store.state.BookState.bookNameToCursor;
  active.value = cursor;
  scrollTo(cursor, "auto");
});

// 使active章节位于左侧工具栏中央
watch(
  () => store.state.BookState.bookNameToCursor,
  () => {
    let cursor = store.state.BookState.bookNameToCursor;
    scrollTo(cursor, "smooth");
  }
);

// 点击上一章
function toPreChapter() {
  let detail = toRaw(store.state.BookDetails.bookDetail);
  if (getCursor(detail.BookName) <= 0) {
    console.log("没有上一章");
  } else {
    store.dispatch("setCursor", getCursor(detail.BookName) - 1);
  }
}

// 直接跳转至指定章节
function toChapter(cursor: number) {
  store.dispatch("setCursor", cursor);
}

function back() {
  router.back();
  store.commit("setStateShowTools", !showChapterList.value);
}

function scrollTo(target: number, behavior: ScrollBehavior) {
  document.querySelector(`#to-${target}`)?.scrollIntoView({
    behavior: behavior,
    block: "center",
  });
  active.value = target;
  document.querySelector(`#to-${target}`);
}

let searchIndex = 0;

function resetSearchIndex() {
  if (searchText.value === "") {
    searchIndex = 0;
  }
}
function search() {
  let chapters = toRaw(chapterList.value);
  let searchResult = chapters.filter((item: any) => {
    return item.ChapterName.indexOf(searchText.value) !== -1;
  });
  if (searchIndex < 0 || searchIndex >= searchResult.length) {
    searchIndex = 0;
  }

  scrollTo(chapters.indexOf(searchResult[searchIndex]), "smooth");
  searchIndex++;
}
</script>

<style lang="scss" scoped>
.box {
  position: fixed;
  left: -360px;
  width: 360px;
  height: 100vh;

  z-index: 20;
}

@media only screen and (max-width: 936px) {
  .box {
    left: -260px;
    width: 260px;
  }

  .chapter-name {
    width: 220px;
  }
}
.chapter {
  border-radius: 8px 0 0 8px;
  background-image: linear-gradient(
    to right,
    hsla(0, 0%, 14%, 0.99),
    hsla(0, 0%, 16%, 0.98)
  );
  box-shadow: 1px 1px 20px hsl(0, 0%, 10%);
}

.back {
  height: 70px;
  padding: 15px 5px;
  border-bottom: 1px solid hsl(0, 0%, 25%);

  svg {
    width: 24px;
    color: hsl(0, 0%, 50%);
  }

  display: grid;
  grid-template-columns: 1fr 5fr;

  align-items: center;
  justify-items: center;
}

.chapter-list {
  height: calc(100vh - 140px);
  //   margin: 0 auto;
  padding: 0 20px;
  border-bottom: 1px solid hsl(0, 0%, 25%);

  overflow: scroll;
  overflow-x: hidden;

  .chapter-name {
    height: calc((100vh - 140px) / 20);
    width: 320px;
    line-height: calc((100vh - 140px) / 20);

    border-bottom: 1px solid hsl(0, 0%, 12%);
    overflow: hidden;

    transition: transform 0.2s ease-in;

    &:hover {
      transform: translateX(18px);
      cursor: pointer;
    }
  }
}
.pre-chapter {
  margin: 0 auto;
  height: 70px;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.active {
  color: hsl(190, 88%, 50%);
}

@media only screen and (max-width: 936px) {
  .box {
    left: -260px;
    width: 260px;
  }

  .chapter-list .chapter-name {
    width: 220px;
  }
}
</style>
