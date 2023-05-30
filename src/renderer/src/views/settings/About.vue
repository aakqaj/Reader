<template>
  <div id="about">
    <div class="application-name">
      <img class="icon" src="../../assets/images/icon.png" alt="" />
      <span>Reader</span>
    </div>
    <div class="version">版本: 1.0.1</div>
    <div class="author" @click="skip('https://github.com/aakqaj')">作者: @aakqaj</div>
    <div class="pro" @click="skip('https://github.com/aakqaj/Reader')">
      Github: <span>Reader</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const shell = require('electron').shell
function skip(url: string) {
  shell.openExternal(url)
}
</script>

<style scoped lang="scss">
#about {
  margin: 40px auto auto 40px;
}

.icon {
  width: 32px;
}
.application-name {
  margin-bottom: 20px;

  span{
    margin-left: 10px;
  }
}
.author,
.pro {
  cursor: pointer;
}
.pro span {
  font-size: 12px;
  border-bottom: 1px solid white;
}
</style>