<template>
  <div class="reload" @click="update">更新本书</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

import { message } from "ant-design-vue";
defineProps(["id"]);
const store = useStore();
let bookDetail = computed(() => store.state.BookDetails.bookDetail);

message.config({
  top: `100px`,
  rtl: true,
});

async function update() {
  await store.dispatch("requestBookDetail", bookDetail.value);
  await store.dispatch("writeBookDetail", bookDetail.value);
  message.success("更新完成", 0.8);
}
</script>

<style scoped lang="scss">
.reload {
  width: 360px;
  height: 49px;
  border-bottom: 1px solid var(--border-color2);
  line-height: 49px;
  font-style: 14px;

  padding-left: 76px;
}
</style>
