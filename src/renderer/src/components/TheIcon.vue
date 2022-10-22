<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#icon-${icon}` || ''"></use>
  </svg>
</template>

<script setup lang="ts">
import '../assets/utils/iconfont.js'
import { defineProps } from 'vue'

defineProps(['icon'])
</script>

<style scoped>
.icon {
  width: 2em;
  height: 2em;

  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>