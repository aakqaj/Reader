<template>
  <div class="font-style">
    <the-drop-down :id="id">
      <template #dropDownTitle>字体类型</template>
      <template #dropDownContent>
        <div class="item">
          <div class="ftype" @click="reloadFontSize">
            <button
              class="ftype-title"
              :class="{ ftypeActive: isActive }"
              @click="isActive = true"
            >
              标题
            </button>
            <button
              class="ftype-content"
              :class="{ ftypeActive: !isActive }"
              @click="isActive = false"
            >
              正文
            </button>
          </div>

          <div class="size">
            <div>字体大小:{{ fontSize }}</div>
            <input type="range" v-model="fontSize" />
          </div>

          <div class="font-style">
            <button
              v-for="font in fontFamilyList"
              :key="font.name"
              :style="`font-family: ${font.name}; font-size: 36px`"
              @click="reloadFontFamily(font.name)"
            >
              {{ font.text }}
            </button>
          </div>
        </div>
      </template>
    </the-drop-down>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref, watch, onMounted } from "vue";
import TheDropDown from "../TheDropDown.vue";
import { useStore } from "vuex";
import { mittBus } from "../../assets/lib/mittBus";
import {
  getFontFamily,
  getFontSize,
  getStyle,
} from "../../assets/utils/api/readStyle";
import { BookStyle } from "../../assets/interface/Style";
import _ from "lodash";

defineProps(["id"]);
const store = useStore();
const bookName = computed(() => store.state.BookDetails.bookDetail.BookName);

const isActive = ref(true);
const fontSize = ref(0);

const fontFamilyList = [
  {
    name: "ZhiMangXing",
    text: "志莽行书体",
  },
  {
    name: "MaShanZhen",
    text: "马善政毛笔楷书",
  },
  {
    name: "Zcoo",
    text: "站酷常规",
  },
  {
    name: "Xingkai",
    text: "青鸟华光行楷",
  },
  {
    name: "Kangxi",
    text: "康熙字典體",
  },
  {
    name: "Hongyun",
    text: "鸿运体",
  },
];

onMounted(async () => {
  await reloadFontSize();
});

watch(
  () => fontSize.value,
  async (val) => {
    let targetEl = document.querySelector(".ftypeActive");
    let targetText: string = "";
    let style: BookStyle = await getStyle();

    if (targetEl) {
      targetText = targetEl.textContent || "标题";
    }

    if (targetText.indexOf("标题") === 1) {
      style.Font.TitleSize = fontSize.value;
    } else {
      style.Font.ContentSize = fontSize.value;
    }

    mittBus.emit("reloadStyle", style);
  }
);

async function reloadFontSize() {
  let targetEl = document.querySelector(".ftypeActive");
  let targetText: string | null = "";

  if (targetEl) {
    targetText = targetEl.textContent || "标题";
  }

  if (targetText.indexOf("标题") === 1) {
    fontSize.value = (await getFontSize()).titleSize;
  } else {
    fontSize.value = (await getFontSize()).contentSize;
  }
}

async function reloadFontFamily(font: string) {
  let targetEl = document.querySelector(".ftypeActive");
  let targetText: string = "";
  let style: BookStyle = await getStyle();

  if (targetEl) {
    targetText = targetEl.textContent || "标题";
  }

  if (targetText.indexOf("标题") === 1) {
    style.Font.TitleFontFamily = font;
  } else {
    style.Font.ContentFontFamily = font;
  }

  mittBus.emit("reloadStyle", style);
}
</script>

<style scoped lang="scss">
@import url("../../assets/css/bbtn.min.css");

button::after {
  border: none;
}
.ftype {
  display: grid;

  grid-template-columns: 1fr 1fr;

  button {
    background-color: var(--bg);
    color: #fff;
    height: 28px;
    border: none;
  }

  .ftypeActive {
    background: #1d89ff;
  }

  margin-bottom: 20px;
}

.size {
  & > div {
    margin-left: 2%;
  }

  input[type="range"] {
    margin-left: 10%;
    width: 80%;
  }
}

.font-style {
  & > button {
    width: 100%;
    display: block;
    background: none;
    border: none;
    padding: 0;
    margin: 4px 0;
    line-height: initial;

    color: white;
    text-align: left;

    transition: padding 0.1s ease-in-out;
  }
  & > button:focus {
    border-left: 4px solid #1d89ff;
    padding-left: 24px;

    background-color: hsl(0, 0%, 26%);
  }
}
</style>
