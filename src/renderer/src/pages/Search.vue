<template>
  <div>
    <div class="back" @click="back">
      <the-icon :icon="'back_android'"></the-icon>
    </div>
    <div class="result">
      <div class="search-result">
        <div v-for="(b, index) in bookList" :key="index" class="card">
          <div class="book" @click="showDetails(b)">
            <!-- <img :src="b.ImgURL || img" alt="" /> -->
            <img
              :src="b.ImgURL || img"
              onerror="this.src= 'https://img1.baidu.com/it/u=2723741487,3517617872&fm=253&fmt=auto&app=138&f=JPG?w=500&h=710';"
            />
            <div>
              <div>{{ b.BookName }}</div>
              <div>{{ b.Type + " " + b.Author }}</div>
              <div>{{ b.NewChapterDate + " " + b.WordsCount }}</div>
              <div class="intro">{{ b.Intro }}</div>
            </div>
          </div>
        </div>
      </div>

      <Transition name="fade">
        <div v-if="componentName !== undefined">
          <component :is="componentName"></component>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRaw, Transition } from "vue";
import TheIcon from "../components/TheIcon.vue";
import BookDetails from "./BookDetails.vue";

import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const bookList = computed(() => store.state.SearchBookList.searchResult);

const img =
  "https://img1.baidu.com/it/u=2723741487,3517617872&fm=253&fmt=auto&app=138&f=JPG?w=500&h=710";

const componentName = ref<any>(undefined);

async function showDetails(book: any) {
  book = toRaw(book);
  await store.dispatch("requestBookDetail", book);

  if (componentName.value == undefined) {
    componentName.value = BookDetails;
  }

  // console.log(book);
}

function back() {
  if (componentName.value !== undefined) {
    componentName.value = undefined;
  } else {
    router.push("bookshelf");
  }
}
</script>

<style lang="scss" scoped>
.back {
  position: fixed;
  top: 12px;
  left: 12px;

  z-index: 3;

  .icon {
    color: hsl(60, 1%, 54%);
  }

  transition: transform 0.4s ease-in-out;
  &:hover {
    transform: translateX(-1px);
    .icon {
      color: hsl(60, 25%, 60%);
    }
  }
}

.result {
  position: relative;
  height: calc(100vh - 136px);
}
.search-result {
  width: 80vw;
  margin: 0 auto;
  padding-bottom: 64px;

  display: grid;

  grid-template-columns: 1fr 1fr;
  grid-column-gap: 48px;
}

.card {
  margin: 25px auto;
  padding: 28px;
  min-height: 232px;
  width: 100%;
  border-bottom: 3px solid hsl(25deg, 45%, 60%);
  img {
    width: 128px;
    margin-right: 24px;
    border-radius: 8px;
    float: left;
  }

  .book {
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: translateX(25px);
    }
  }

  .intro {
    overflow: hidden;

    text-overflow: ellipsis;

    display: -webkit-box;

    -webkit-box-orient: vertical;

    -webkit-line-clamp: 4;
  }
}
</style>
