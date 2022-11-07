<template>
  <div class="thems">
    <the-drop-down :id="id">
      <template #dropDownTitle>皮肤样式</template>
      <template #dropDownContent>
        <div class="item">
          <template v-for="them in thems" :key="them.name">
            <div
              class="them"
              :class="them.className"
              @click="chooseThem(them)"
            ></div>
            <span>{{ them.name }}</span>
          </template>
        </div>
      </template>
    </the-drop-down>
  </div>
</template>

<script setup lang="ts">
import { getStyle, getThems } from "../../assets/utils/api/readStyle";
import { defineProps, computed, ref } from "vue";
import TheDropDown from "../TheDropDown.vue";
import { mittBus } from "../../assets/lib/mittBus";
import { BookStyle } from "../../assets/interface/Style";

const thems = [
  {
    className: "black-white",
    name: "淡雅白",
    BackgroundColor: "#FFFFFF",
    FontColor: "#000003",
  },
  {
    className: "black-yellow",
    name: "牛皮黄",
    BackgroundColor: "#e0ce9e",
    FontColor: "#000003",
  },
  {
    className: "black-green",
    name: "青草绿",
    BackgroundColor: "rgb(227, 237, 205)",
    FontColor: "#000003",
  },
  {
    className: "white-black",
    name: "石墨黑",
    BackgroundColor: "hsl(0, 0%, 21%)",
    FontColor: "#fff",
  },
];

async function chooseThem(them: any) {
  let style: BookStyle = await getStyle();

  style.Them = {
    name: them.name,
    BackgroundColor: them.BackgroundColor,
    FontColor: them.FontColor,
  };

  mittBus.emit("reloadStyle", style);
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
    &::before {
      border-color: #000003 transparent transparent #000003;
    }

    &::after {
      border-color: transparent #ffffff #ffffff transparent;
    }
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
