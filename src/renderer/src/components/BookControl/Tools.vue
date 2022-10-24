<template>
  <div class="rbox">
    <my-transition
      class="tools"
      :show="showTools"
      :name="'tools'"
      :animeObj="animetion"
    >
      <div class="tools-list">
        <replace :id="'demo'"></replace>
        <replace :id="'demo2'"></replace>
      </div>

      <div class="next-chapter" @click="toNextChapter">下一章</div>
    </my-transition>
  </div>
</template>

<script setup lang="ts">
import { computed, toRaw } from "vue";
import { getCursor } from "../../assets/utils/requestBookCursor";
import MyTransition from "../MyTransition.vue";
import TheIcon from "../TheIcon.vue";
import Replace from "./Replace.vue";

import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const showTools = computed(() => store.state.BookState.showTools);

const animetion = {
  enterActive: {
    translateX: [0, "-100%"],
    easing: "easeInOutQuad",
    duration: 400,
  },
  leaveActive: {
    translateX: ["-100%", 0],
    easing: "easeInOutQuad",
    duration: 400,
  },
};

function toNextChapter() {
  let detail = toRaw(store.state.BookDetails.bookDetail);
  if (getCursor(detail.BookName) >= detail.ChapterList.length - 1) {
    console.log("没有下一章");
  } else {
    store.dispatch("setCursor", getCursor(detail.BookName) + 1);
  }
}
</script>

<style lang="scss" scoped>
.rbox {
  position: fixed;
  top: 0;
  right: -360px;
  width: 360px;
  height: 100vh;
  z-index: 20;
}

@media only screen and (max-width: 936px) {
  .rbox {
    right: -260px;
    width: 260px;
  }
}
.tools {
  height: 100vh;
  background-image: linear-gradient(
    to left,
    hsla(0, 0%, 14%, 0.99),
    hsla(0, 0%, 16%, 0.98)
  );
  box-shadow: 1px 1px 20px hsl(0, 0%, 10%);
}

.tools-list {
  // padding: 20px 10px;
  height: calc(100vh - 70px);
  //   margin: 0 auto;
  border-bottom: 1px solid hsl(0, 0%, 25%);

  overflow: scroll;
}

.next-chapter {
  margin: 0 auto;
  height: 70px;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
