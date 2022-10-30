<template>
  <div class="font-style">
    <the-drop-down :id="id">
      <template #dropDownTitle>字体类型</template>
      <template #dropDownContent>
        <div class="item">
          <div class="ftype">
            <button
              class="ftype-title"
              :class="{ active: isActive }"
              @click="isActive = true"
            >
              标题
            </button>
            <button
              class="ftype-content"
              :class="{ active: !isActive }"
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
            <button style="font-family: ZhiMangXing; font-size: 36px">
              志莽行书体
            </button>

            <button
              class="active"
              style="font-family: MaShanZhen; font-size: 36px"
            >
              马善政毛笔楷书
            </button>

            <button style="font-family: Zcoo; font-size: 36px">站酷常规</button>

            <button style="font-family: Xingkai; font-size: 36px">
              青鸟华光行楷
            </button>

            <button style="font-family: Kangxi; font-size: 36px">
              康熙字典體
            </button>

            <button style="font-family: Hongyun; font-size: 36px">
              鸿运体
            </button>
          </div>
        </div>
      </template>
    </the-drop-down>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref } from "vue";
import TheDropDown from "../TheDropDown.vue";
import { useStore } from "vuex";

defineProps(["id"]);
const store = useStore();
const bookName = computed(() => store.state.BookDetails.bookDetail.BookName);

const isActive = ref(true);
const fontSize = ref(0);
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

  .active {
    background: #1d89ff;
  }

  margin-bottom: 20px;
}

.size {
  input[type="range"] {
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

    transition: padding transform 0.1s ease-in-out;
  }
  & > button:focus {
    border-left: 4px solid #1d89ff;
    padding-left: 24px;

    background-color: hsl(0, 0%, 26%);
    transform: scale(1, 1);
  }
}
</style>
