<template>
  <div @keyup="changeShowTools" id="content-box">
    <div class="title">
      <h4>{{ chapterName() }}</h4>
    </div>
    <div class="show">
      <div
        class="book-content"
        @click.left="turnRight"
        @contextmenu.prevent="turnLeft"
      >
        <div class="reading"></div>
      </div>
    </div>

    <div class="footer">
      <div class="shedule">
        {{
          `${(
            (getCursor(bookDetail.BookName) / bookDetail.ChapterList.length) *
            100
          ).toFixed(2)}%`
        }}
      </div>
      <div class="chapter-name">{{ chapterName() }}</div>
      <div class="shedule-this">
        {{ `${readingPage} / ${readingPageCount}` }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";
import { computed, onMounted, ref, defineProps, watch, toRaw } from "vue";
import { getCursor } from "../assets/utils/requestBookCursor";
import { useStore } from "vuex";

import { keyListener } from "../assets/utils/utils";

const store = useStore();
const props = defineProps(["content"]);
const bookDetail = toRaw(
  computed(() => store.state.BookDetails.bookDetail).value
);
const showTools = computed(() => store.state.BookState.showTools);

function chapterName() {
  return bookDetail.ChapterList[getCursor(bookDetail.BookName)].ChapterName;
}

const readingPageCount = ref(0);
const readingPage = ref(0);

const animeDuration = 500;

onMounted(async () => {
  // 快捷键呼出工具栏
  keyListener("Escape", () => {
    changeShowTools();
  });

  setTimeout(() => {
    const readingEle: any = document.querySelector(".reading");

    const scrollWidth = readingEle.scrollWidth;
    let pageWidth = readingEle.offsetWidth + 20;
    readingPageCount.value = Math.floor(scrollWidth / pageWidth);

    let resizeTag = true;
    window.onresize = () => {
      if (resizeTag) {
        resizeTag = false;
        setTimeout(() => {
          const scrollWidth = readingEle.scrollWidth;
          let pageWidth = readingEle.offsetWidth + 20;
          readingPageCount.value = Math.floor(scrollWidth / pageWidth);
          if (readingPage.value > readingPageCount.value) {
            readingPage.value = 0;
          }
          resizeTag = true;
        }, 100);
      }
    };
  }, 10);
});

watch(
  () => toRaw(props.content),
  (old) => {
    let readingEl = document.querySelector(".reading");
    if (readingEl) {
      console.log(bookDetail);

      readingEl.innerHTML = old[1];
      const readingEle: any = document.querySelector(".reading");
      const scrollWidth = readingEle.scrollWidth;
      const pageWidth = readingEle.offsetWidth + 20;
      readingPageCount.value = Math.floor(scrollWidth / pageWidth);
      if (readingPage.value > readingPageCount.value) {
        readingPage.value = 0;
      }
    }
  }
);

function changeShowTools() {
  store.commit("setStateShowTools", !showTools.value);
}
function turnRight() {
  console.log("<reading page> ", readingPage.value);

  const readingEle: any = document.querySelector(".reading");
  const scrollWidth = readingEle.scrollWidth;
  let pageWidth = readingEle.offsetWidth + 20;
  readingPageCount.value = Math.floor(scrollWidth / pageWidth);

  if (readingPage.value >= 0 && readingPage.value <= readingPageCount.value) {
    if (readingPage.value == 0) {
      pageWidth = pageWidth - 10;
    }

    if (readingPage.value === readingPageCount.value) {
      store.dispatch("setCursor", getCursor(bookDetail.BookName) + 1);
      readingPage.value = 0;
      const r: any = document.querySelector(".reading");

      let p = r.offsetWidth + 20;

      anime({
        targets: ".reading",
        translateX: [`${p}px`, 0],
        easing: "easeInOutQuad",
        duration: animeDuration,
        opacity: [0, 1],
      });
      readingPage.value = 0;
    } else {
      anime({
        targets: ".reading",
        translateX: `${-(readingPage.value + 1) * pageWidth}px`,
        easing: "easeInOutQuad",
        duration: animeDuration,
      });

      readingPage.value += 1;
    }
  }
}

function turnLeft() {
  console.log("<reading page> ", readingPage.value);
  const readingEle: any = document.querySelector(".reading");
  const scrollWidth = readingEle.scrollWidth;
  let pageWidth = readingEle.offsetWidth + 20;
  readingPageCount.value = Math.floor(scrollWidth / pageWidth);

  if (readingPage.value > 0 && readingPage.value <= readingPageCount.value) {
    anime({
      targets: ".reading",
      translateX: `${-(readingPage.value - 1) * pageWidth}px`,
      easing: "easeInOutQuad",
      duration: animeDuration,
    });

    readingPage.value -= 1;
    console.log("左");
  } else if (readingPage.value === 0) {
    if (getCursor(bookDetail.BookName) === 0) {
      return;
    }
    store.dispatch("setCursor", getCursor(bookDetail.BookName) - 1);
    const r: any = document.querySelector(".reading");
    let p = r.offsetWidth + 20;

    const readingEle: any = document.querySelector(".reading");
    let pageWidth = readingEle.offsetWidth + 20;
    // readingPageCount.value = Math.floor(scrollWidth / pageWidth);

    // 等待watch重新计算载入的html
    setTimeout(() => {
      readingPage.value = readingPageCount.value;
      console.log(readingPage.value, readingPageCount.value);

      anime({
        targets: ".reading",
        translateX: [
          `${-(readingPage.value + 1) * pageWidth}px`,
          `${-readingPage.value * pageWidth}px`,
        ],
        easing: "easeInOutQuad",
        duration: animeDuration,
        opacity: [0, 1],
      });
    }, 10);
  }
}
</script>

<style lang="scss">
#content-box {
  width: 100%;
  height: 100%;

  position: relative;
}

.show {
  margin: 10px 60px;
  height: 90vh;
  font-family: Zcoo;
  font-size: 28px;

  overflow: scroll;
}

.book-content {
  height: 100%;
}

.reading {
  height: 100%;
  columns: calc(100vw - 680px);
  column-gap: 20px;
  z-index: 10;
}

@media only screen and (min-width: 1514px) {
  .show {
    margin: 10px 360px;
    height: 90vh;
  }
}

.title {
  margin: 0 auto;

  text-align: center;
  font-size: 24px;
  z-index: 20;

  h4 {
    margin: 0;
    padding: 0;
  }
}

.footer {
  position: absolute;
  margin: 10px auto;
  width: 100%;
  bottom: 0;

  color: hsl(0, 0%, 50%);

  display: grid;
  grid-template-columns: 1fr 4fr 1fr;

  align-items: center;
  justify-items: center;
}
</style>
