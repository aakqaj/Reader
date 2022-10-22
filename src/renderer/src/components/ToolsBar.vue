<template>
  <div class="tools-bar">
    <the-icon :icon="'book'"></the-icon>
    <the-icon :icon="'setting'"></the-icon>
  </div>
</template>

<script setup lang="ts">
import TheIcon from "./TheIcon.vue";
</script>

<style lang="scss" scoped>
.tools-bar {
  position: fixed;
  padding: 10px;
  width: 100%;
  height: 80px;
  bottom: 0;

  background-color: var(--bg);
}

.tools-bar {
  display: grid;
  grid-template-columns: 1fr 1fr;

  align-items: center;
  justify-items: center;
}
</style>
