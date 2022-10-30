<template>
  <div class="thems">
    <the-drop-down :id="id">
      <template #dropDownTitle>皮肤样式</template>
      <template #dropDownContent>
        <div class="item">
          <div class="them black-white"></div>
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
import { defineProps, computed, ref } from "vue";
import TheDropDown from "../TheDropDown.vue";

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
    &::before {
      border-color: black transparent transparent black;
    }

    &::after {
      border-color: transparent white white transparent;
    }
  }

  .black-yellow {
    &::before {
      border-color: black transparent transparent black;
    }

    &::after {
      border-color: transparent #e0ce9e #e0ce9e transparent;
    }
  }

  .black-green {
    &::before {
      border-color: black transparent transparent black;
    }

    &::after {
      border-color: transparent hsl(120, 80%, 45%) hsl(120, 80%, 45%)
        transparent;
    }
  }

  .white-black {
    &::before {
      border-color: white transparent transparent white;
    }

    &::after {
      border-color: transparent black black transparent;
    }
  }
}
</style>
