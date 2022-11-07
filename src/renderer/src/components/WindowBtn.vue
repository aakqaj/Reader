<template>
  <div class="window-btn">
    <div class="contanier">
      <div class="btn min">
        <the-icon :icon="'2zuixiaohua-2'" @click="min"></the-icon>
      </div>
      <div class="btn max">
        <the-icon :icon="'3zuidahua-1'" @click="max"></the-icon>
      </div>
      <div class="btn close" @click="close">
        <the-icon :icon="'4guanbi-2'"></the-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TheIcon from './TheIcon.vue'
const ipcRenderer = require('electron').ipcRenderer

function min() {
  ipcRenderer.send('window-min')
}

function max() {
  ipcRenderer.send('window-max')
}

function close() {
  ipcRenderer.send('window-close')
}
</script>

<style lang="scss" scoped>
.window-btn {
  -webkit-app-region: drag;
  height: 24px;
  width: 100vw;
  line-height: 24px;
  position: fixed;
  top: 0;
  z-index: 100;
}


.contanier {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 48px 48px 48px;

  justify-content: end;
  opacity: 0;
  
  transition: all .3s ease-in;

  &:hover{
    opacity: 1;
  }
}

.icon {
  width: 40%;
}

.btn {
  width: 100%;
  height: 100%;

  text-align: center;
  -webkit-app-region: no-drag;
}

.btn:hover {
  background-color: gray;
}

.close:hover {
  border-radius: 0 8px 0 0;
  background-color: hsl(0, 80%, 40%);
}
</style>