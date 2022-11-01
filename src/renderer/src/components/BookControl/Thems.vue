<template>
  <div class="thems">
    <the-drop-down :id="id">
      <template #dropDownTitle>皮肤样式</template>
      <template #dropDownContent>
        <div class="item">
          <div class="them-test black-white" @click="demo"></div>
          <span>淡雅白</span>
          <div class="them black-yellow"></div>
          <span>牛皮黄</span>
          <div class="them black-green"></div>
          <span>自然绿</span>
          <div class="them white-black"></div>
          <span>石墨黑</span>
        </div>
      </template>
    </the-drop-down>
  </div>
</template>

<script setup lang="ts">
import { getThems } from "../../assets/utils/LocationlApi/readStyle";
import { defineProps, computed, ref } from "vue";
import TheDropDown from "../TheDropDown.vue";

function demo() {
  getThems();
}

defineProps(["id"]);
</script>

<style scoped lang="scss">
.item {
  height: 128px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 10fr 2fr;

  align-items: center;
  justify-items: center;
}

.them {
  grid-row: 1 / 2;

  position: relative;
  width: 48px;
  height: 48px;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    border-width: 18px;
    border-style: solid;
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
  }

  .black-white {
    grid-row: 1 / 2;

    position: relative;
    width: 48px;
    height: 48px;
    background-image: linear-gradient(to bottom right, #000003, #fff);
    // &::before {
    //   border-color: #000003 transparent transparent #000003;
    // }

    // &::after {
    //   border-color: transparent white white transparent;
    // }
  }

  .black-yellow {
    &::before {
      border-color: #000003 transparent transparent #000003;
    }

    &::after {
      border-color: transparent #e0ce9e #e0ce9e transparent;
    }
  }

  .black-green {
    &::before {
      border-color: #000003 transparent transparent #000003;
    }

    &::after {
      border-color: transparent rgb(227, 237, 205) rgb(227, 237, 205)
        transparent;
    }
  }

  .white-black {
    &::before {
      border-color: #ffffff transparent transparent white;
    }

    &::after {
      border-color: transparent black black transparent;
    }
  }
}
</style>
