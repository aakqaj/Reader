<template>
  <div>
    <input type="range" @change="demo" />
    <div class="box">
      <div class="thems" @click="runit"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const val = ref(0);

function demo(e) {
  console.log(e.target.value);
}

function runit() {
  console.log("hello");
}
</script>

<style scoped lang="scss">
$fontColor: black;
$bg: white;
input[type="range"] {
  width: 800px;

  cursor: pointer;
}
.thems {
  position: relative;
  width: 0;
  height: 0;

  left: 50px;
  top: 50px;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    border-width: 18px;
    border-style: solid;
    border-color: $fontColor transparent transparent $fontColor;
    transition: border-width 0.3s ease-in;
  }

  &:hover:before {
    border-width: 24px;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    border-width: 24px;
    border-style: solid;
    border-color: transparent $bg $bg transparent;
  }
}
</style>
