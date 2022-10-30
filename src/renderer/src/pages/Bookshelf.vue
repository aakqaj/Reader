<template>
  <div>
    <div class="bookshelf">
      <div class="book" v-for="(book, index) in bookList" :key="index">
        <div @click="read(book.BookName)">
          <img
            :src="book.BookImg"
            onerror="this.src= 'https://img1.baidu.com/it/u=2723741487,3517617872&fm=253&fmt=auto&app=138&f=JPG?w=500&h=710';"
          />
          <div class="book-name">{{ book.BookName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const route = useRoute();

let bookList = computed(() => store.getters.getBookshelf);

async function read(bookname: string) {
  await store.dispatch("readBookDetails", bookname);
  router.push("/book");
}

watch(
  () => route,
  () => {
    // 回调函数
    console.log("reload");
    store.commit("reloadBookshelf");

    bookList = computed(() => store.state.Bookshelf.bookList);
  },
  {
    immediate: true,
    deep: true,
  }
);

onMounted(() => {
  store.commit("reloadBookshelf");
  bookList = computed(() => store.state.Bookshelf.bookList);
});
</script>

<style lang="scss" scoped>
.bookshelf {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 25px;
  grid-column-gap: 5px;
}

@media only screen and (min-width: 1546px) {
  .bookshelf {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-row-gap: 25px;
    grid-column-gap: 5px;
  }
}

.bookshelf {
  height: 100%;
  // margin: 60px;
  padding: 20px;
  padding-bottom: 116px;

  align-items: center;
  justify-items: center;
  overflow: scroll;
}

.book {
  padding: 40px 10px;
  width: 200px;

  border-radius: 18px;
  img {
    width: 128px;
    min-height: 160px;
    border-radius: 8px;
  }

  box-shadow: 1px 1px 10px hsla(0, 0%, 20%, 0.2);
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 1px 1px 20px hsla(0, 0%, 28%, 1);
  }
  text-align: center;
  .book-name {
    height: 20px;
  }
}
</style>
