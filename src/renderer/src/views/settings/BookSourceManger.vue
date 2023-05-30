<template>
  <div class="booksource-manger">
    <div class="booksource-list">
      <div
        class="booksource-card"
        v-for="booksource in bookSourceAllData"
        :key="booksource.SourceName"
      >
        <div
          :class="{
            'acitve-source': true,
            active: booksource.SourceName === activeSource.SourceName,
          }"
          @click="changeActiveSource(booksource.SourceName)"
        ></div>
        <div class="source-name">{{ booksource.SourceName }}</div>
        <div class="base-url">{{ booksource.BaseUrl }}</div>
        <div class="control">
          <span class="icon-container" @click="skipTo(booksource)">
            <div class="tips">编辑</div>
            <the-icon :icon="'edit'" class="edit"></the-icon
          ></span>
          <span
            class="icon-container"
            @click="toAddBook(booksource.SourceName)"
          >
            <div class="tips">加书</div>
            <the-icon :icon="'add'" class="edit"></the-icon
          ></span>
        </div>
      </div>

      <div class="booksource-card add-source">
        <span class="icon-container" @click="toAddBookSource">
          <div class="tips">添加书源</div>
          <the-icon :icon="'add'" class="edit"></the-icon
        ></span>
        <span class="icon-container" @click="toAddBook('test')">
          <div class="tips">强制加书</div>
          <the-icon :icon="'add1'" class="edit"></the-icon
        ></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { BookSource } from "../../assets/interface/BookSource";
import TheIcon from "../../components/TheIcon.vue";
import _ from "lodash";

const stroe = useStore();
const router = useRouter();

const bookSourceAllData: ComputedRef<BookSource[]> = computed(
  () => stroe.state.BookSource.bookSourceList
);

const activeSource: ComputedRef<BookSource> = computed(
  () => stroe.state.BookSource.bookSource
);

async function changeActiveSource(sourceName: string) {
  await stroe.dispatch("setBookSource", sourceName);
}

function skipTo(booksource: BookSource) {
  router.push({
    name: "edit",
    query: {
      sourceName: booksource.SourceName,
    },
  });
}

function toAddBookSource() {
  router.push({
    name: "edit",
    query: {
      sourceName: "test",
      model: "addBookSource",
    },
  });
}

function toAddBook(sourceName: string) {
  router.push({
    name: "edit",
    query: {
      sourceName,
      model: "addBooK",
    },
  });
}
</script>

<style scoped lang="scss">
@import url("../../assets/css/bbtn.min.css");
.booksource-manger {
  margin: 40px;
}

.push-btn {
  margin: 0 80px 40px 0;

  display: flex;
  justify-content: end;

  position: relative;
  right: 0px;
  button {
    margin: 10px;
    border-radius: 8px;

    &:hover {
      transform: scale(1.04);
    }
  }
}

.booksource-list {
  padding-top: 10px;
  height: 90%;

  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 360px);
  grid-template-rows: repeat(auto-fill, 136px);
  grid-row-gap: 24px;
  grid-column-gap: 24px;

  overflow: scroll;
}

.booksource-card {
  padding: 10px;
  height: 128px;
  cursor: auto;

  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.01);
  }

  border-radius: 18px;
  position: relative;

  .base-url {
    margin-top: 64px;
  }

  .control {
    position: absolute;
    bottom: 2px;
    right: 26px;
  }

  .control .icon-container {
    margin-left: 6px;
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

  .icon {
    width: 18px;
  }
}

.booksource-card {
  position: relative;
  .acitve-source {
    position: absolute;
    right: -3px;
    top: -3px;
    width: 18px;
    height: 18px;
    background-color: #fff;
    border-radius: 50%;

    box-shadow: inset 0 0 0 1px hsl(0, 0%, 80%), inset 0 0 0 6px hsl(0, 0%, 70%);
  }

  .active {
    box-shadow: inset 0 0 0 1px hsl(0, 0%, 80%),
      inset 0 0 0 6px hsl(120, 100%, 45%);
  }
}

.booksource-card.add-source {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    border-width: 3px;
    height: 90%;
    left: 50%;

    border: 1px solid hsl(0, 10%, 60%);

    transform: rotate(25deg);
  }

  display: inline-flex;
  align-items: center;
  justify-content: center;
  .icon {
    width: 128px;
    height: 64px;

    transition: all 0.3s ease-in-out;

    &:hover {
      transform: scale(0.96);
    }
  }

  .tips {
    transform: translateX(2px);
  }
}

.booksource-card {
  background-color: hsl(222, 12%, 34%);
  box-shadow: 1px 1px 10px hsla(0, 2%, 30%, 1);
}
</style>
