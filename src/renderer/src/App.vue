<script setup lang="ts">
// import Versions from '@renderer/components/Versions.vue'
import ToolsBar from "./components/ToolsBar.vue";
import SearchBox from "./components/SearchBox.vue";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { BookSource } from "./assets/interface/BookSource";
import { readJsonFile } from "./assets/utils/operationFile";
// import axios from 'axios'

const router = useRouter();
const stroe = useStore();

onMounted(async () => {
  // router.push("/demo");
  router.push("/bookshelf");
  const bookSourceAllData: BookSource[] = await readJsonFile(
    "./static/configs/BookSource.json"
  );
  await stroe.dispatch("setBookSourceList", bookSourceAllData);
  await stroe.dispatch("setBookSource", "88读书网");
});
</script>

<template>
  <div>
    <search-box></search-box>
    <router-view></router-view>
    <tools-bar></tools-bar>
  </div>
</template>

<style lang="less">
@import "./assets/css/styles.less";
@import "./assets/css/rootval.css";
@import "./assets/css/main.css";

body {
  width: 100vw;
  height: 100vh;

  min-width: 460px;

  color: var(--text-color);
  background-color: var(--bg);
}
</style>
