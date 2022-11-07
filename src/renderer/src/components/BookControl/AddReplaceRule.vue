<template>
  <div class="purify">
    <div class="group">
      <input type="text" placeholder="Source" id="source-text" /><span
        class="highlight"
      ></span
      ><span class="bar"></span>
      <!-- <label>源</label> -->
    </div>

    <div class="group">
      <input type="text" placeholder="Replace" id="replace-text" /><span
        class="highlight"
      ></span
      ><span class="bar"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
defineProps(["id"]);
</script>

<style scoped lang="scss">
.purify {
  margin: 0 auto;
  width: 80%;
  height: 60%;

  display: grid;
  grid-column-gap: 20px;
  align-items: center;
  justify-items: center;

  $bg-color: #424242;
  $hl-color: #2196f3;
  $muted-color: mix(white, $bg-color, 70%);
  $trans-time: 300ms;
  $width: 100%;

  .group {
    width: 100%;
  }

  input {
    background: none;
    color: $muted-color;
    font-size: 12px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: $width;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid $muted-color;
    &:focus {
      outline: none;
    }
    &:focus ~ label,
    &:valid ~ label {
      top: -14px;
      font-size: 12px;
      color: $hl-color;
    }
    &:focus ~ .bar:before {
      width: $width;
    }
  }

  label {
    color: $muted-color;
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: $trans-time ease all;
  }

  .bar {
    position: relative;
    display: block;
    width: $width;
    &:before {
      content: "";
      height: 2px;
      width: 0;
      bottom: 0px;
      position: absolute;
      background: $hl-color;
      transition: $trans-time ease all;
      left: 0%;
    }
  }
}
</style>
