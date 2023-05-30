<template>
  <div class="source-list">
    <div class="source" v-for="(item, index) in replaceData" :key="index">
      <div class="source-box">
        <div class="delete-icon">
          <the-icon
            :icon="'delete'"
            @click="removeItem(item.source)"
          ></the-icon>
        </div>
        <div class="text">{{ item.source }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { removeReg } from "../../assets/utils/readReplaceReg";
import TheIcon from "../TheIcon.vue";
import { defineProps, defineEmits, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const bookName = computed(() => store.state.BookDetails.bookDetail.BookName);

const props = defineProps(["replaceData"]);
const emit = defineEmits(["reload"]);

function removeItem(source: string) {
  if (window.confirm("你确定要删除该净化规则吗？")) {
    removeReg(bookName.value, source);
    emit("reload");
  } else {
    return false;
  }
}
</script>

<style scoped lang="scss">
.source-list {
  //   margin-top: 10px;
  //   margin-left: 28px;
  padding: 10px 28px;

  height: 160px;
  overflow-y: scroll;

  .source {
    border-bottom: 1px solid var(--border-color2);
    .source-box {
      height: 50px;

      display: grid;
      grid-template-columns: 2fr 10fr;
      grid-column-gap: 20px;
      align-items: center;

      transition: transform 0.3s ease-in;

      transform: translateX(-25%);

      &:hover {
        transform: translateX(0.8%);
      }
    }

    width: 100%;
    .text {
      //   margin-left: -20%;
      width: 100%;
      //   text-align: center;
    }

    .delete-icon {
      width: 100%;
      height: 100%;

      background-color: red;

      display: flex;
      align-items: center;
      justify-content: center;

      //   overflow: hidden;

      .icon {
        width: 28px !important;
        height: 28px !important;
      }
    }
  }
}
</style>
