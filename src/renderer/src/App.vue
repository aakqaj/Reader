<script setup lang="ts">
// import Versions from '@renderer/components/Versions.vue'
import ToolsBar from './components/ToolsBar.vue'
import SearchBox from './components/SearchBox.vue'
import WindowBtn from './components/WindowBtn.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { BookSource } from './assets/interface/BookSource'
import { readJsonFile } from './assets/utils/operationFile'

const router = useRouter()
const stroe = useStore()

onMounted(async () => {
  // router.push("/demo");
  router.push('/bookshelf')
  const bookSourceAllData: BookSource[] = await readJsonFile('./static/configs/BookSource.json')
  await stroe.dispatch('setBookSourceList', bookSourceAllData)
  await stroe.dispatch('setBookSource', '平凡文学')
})
</script>

<template>
  <div class="container">
    <window-btn />
    <div class="reader">
      <search-box></search-box>
      <router-view></router-view>
      <tools-bar></tools-bar>

      <div id="book-body"></div>
    </div>
  </div>
</template>

<style lang="less">
@import './assets/css/styles.less';
@import './assets/css/rootval.css';
@import './assets/css/main.css';

body {
  width: 100vw;
  height: 100vh;

  min-width: 460px;

  background-color: rgba(255, 255, 255, 0);
  position: relative;
}
#app {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  color: var(--text-color);
  background-color: var(--bg);

  overflow: scroll;
}

.reader{
  height: calc(100vh - 30px);
  z-index: 1;
}
</style>
