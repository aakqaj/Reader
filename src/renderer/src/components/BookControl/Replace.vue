<template>
  <the-drop-down :id="id">
    <template #dropDownTitle>替换净化</template>
    <template #dropDownContent>
      <div class="item">text</div>
      <div class="item">text</div>
      <div class="item">text</div>
      <div class="item">text</div>
    </template>
  </the-drop-down>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import TheDropDown from "../TheDropDown.vue";

defineProps(["id"]);
</script>

<style scoped></style>
