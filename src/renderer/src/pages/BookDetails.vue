<template>
  <div class="detail">
    <div class="base-info">
      <img :src="bookD.ImgURL || img" alt="" />
      <div class="info">
        <div class="name">{{ bookD.BookName }}</div>
        <div class="author">{{ bookD.Author }}</div>
        <div class="type">{{ bookD.Type }}</div>
        <div class="datewords">
          {{ bookD.NewChapterDate + " " + bookD.WordsCount }}
        </div>
        <div class="intro">{{ bookD.Intro }}</div>
      </div>
    </div>

    <div class="new-chapters">
      <div v-for="(item, index) in cList" :key="index">
        {{ item?.ChapterName }}
      </div>
    </div>

    <div class="ctrl">
      <div @click="pushOrPop">
        {{ isInBookShelf ? "移除书架" : "加入书架" }}
      </div>
      <div @click="read">开始阅读</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, toRaw, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { BookDetail } from "../assets/interface/BookDeatils";

import { save, isSave, deleteBook } from "../assets/utils/DetailsRequest";

const store = useStore();
const router = useRouter();

const img =
  "https://img1.baidu.com/it/u=2723741487,3517617872&fm=253&fmt=auto&app=138&f=JPG?w=500&h=710";

const bookD = computed(() => store.state.BookDetails.bookDetail);
const cList = ref<any[]>([]);

const isInBookShelf = ref(
  (() => {
    let bookDetail: BookDetail = toRaw(bookD.value);
    return isSave(bookDetail.BookName);
  })()
);

async function pushOrPop() {
  let bookDetail: BookDetail = toRaw(bookD.value);

  if (!isInBookShelf.value) {
    await save(bookDetail);
    isInBookShelf.value = true;
  } else {
    await deleteBook(bookDetail);
    console.log("dele");
    isInBookShelf.value = false;
  }
}

function read() {
  if (!isInBookShelf) {
    bookD.value.BookName = "cache";
  }
  router.push("/book");
}

onMounted(() => {
  let data: {}[] = [...toRaw(store.state.BookDetails.bookDetail.ChapterList)];
  cList.value = data.splice(data.length - 10, data.length).reverse();

  console.log(data);

  let m = function (e: any) {
    e.preventDefault();
  };
  document.body.style.overflow = "hidden";
  document.addEventListener("touchmove", m, { passive: false }); //禁止页面滑动
});

onUnmounted(() => {
  let m = function (e: any) {
    e.preventDefault();
  };

  document.body.style.overflow = ""; //出现滚动条
  // document.removeEventListener('touchmove', m, { passive: true })
  document.removeEventListener("touchmove", m);
});
</script>

<style lang="scss">
.detail {
  position: fixed;
  top: 0;
  left: 0;
  height: calc(100vh - 80px);
  width: 100%;

  background-color: var(--bg);
  color: var(--text-color);
  overflow: scroll;
}

.base-info {
  margin: 48px auto 0 auto;
  width: 920px;
  height: 410px;

  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: -30vw;
    width: 100vw;
    height: 4px;
    background-color: var(--border-color2);
  }

  img {
    margin: 0 48px;
    grid-area: img;
    width: 266px;
    height: 332px;
    // max-width: 320px;
    border-radius: 18px;
    float: left;

    box-shadow: 1px 1px 20px hsla(260, 5%, 89%, 0.2);
  }

  .info {
    // padding: 18px;
    display: grid;

    grid-row-gap: 18px;

    div {
      font-family: Zcoo;
    }
  }

  .name {
    font-weight: bolder;
    font-size: 48px;
  }

  .intro {
    font-family: Zcoo;
    font-size: 16px;
  }
}

.new-chapters {
  width: 76vw;
  height: 280px;
  margin: 20px auto;

  overflow: scroll;

  display: grid;
  grid-template-columns: 1fr 1fr;

  grid-row-gap: 18px;
  justify-items: center;

  div {
    width: 230px;
  }
}

.ctrl {
  width: 100vw;
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 0px;

  div {
    margin: 20px;
    padding: 10px 14px;
    border-radius: 30px;

    // background-color: hsl(208, 85%, 52%);
    background-color: var(--btn-color);
    color: var(--btn-text-color);
    font-weight: 12;

    transition: transform 0.3s ease-in;

    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

@media screen and (max-height: 868px) {
  .base-info {
    height: 280px;
  }

  .base-info img {
    width: 180px;
    height: 220px;
  }

  .new-chapters {
    height: 180px;
  }
}
</style>
