<template>
  <div class="replace">
    <the-drop-down :id="id">
      <template #dropDownTitle>替换净化</template>
      <template #dropDownContent>
        <div class="item">
          <!-- <AddReplaceRule /> -->
          <Transition name="fadeOut">
            <template v-if="isApper">
              <ShowReplaceRule :replaceData="replaceList" @reload="readReplaceData" />
            </template>
          </Transition>

          <Transition name="fadeIn">
            <template v-if="!isApper">
              <AddReplaceRule />
            </template>
          </Transition>

          <div class="control">
            <div
              class="bttn-pill bttn-sm bttn-primary cancel-btn"
              @click="changeApper"
              v-show="!isApper"
            >
              返回
            </div>
            <div class="bttn-pill bttn-sm bttn-primary add-btn" @click="addReplaceRule">添加</div>
          </div>
        </div>
      </template>
    </the-drop-down>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, toRaw, ref, Transition, onMounted } from 'vue'
import TheDropDown from '../TheDropDown.vue'
import AddReplaceRule from './AddReplaceRule.vue'
import ShowReplaceRule from './ShowReplaceRule.vue'
import { useStore } from 'vuex'

import { pushReplaceRule, readReplaceRule } from '../../assets/utils/readReplaceReg'

const store = useStore()

const bookName = computed(() => store.state.BookDetails.bookDetail.BookName)

defineProps(['id'])

const isApper = ref(true)
let replaceList = ref()

function readReplaceData() {
  setTimeout(
    async () => (replaceList.value = toRaw(await readReplaceRule(toRaw(bookName.value)))),
    0
  )
}

function changeApper() {
  isApper.value = true
  readReplaceData()
}

function addReplaceRule() {
  if (isApper.value === true) {
    isApper.value = false
  } else {
    let bName = toRaw(bookName.value)
    const sEl: any = document.querySelector('#source-text')
    const rEl: any = document.querySelector('#replace-text')

    if (sEl && rEl) {
      let sourcetext = sEl.value
      let replaceText = rEl.value
      // pushReplaceRule(bName, sourcetext, replaceText);
      console.log(bName, sourcetext, replaceText)
      if (sourcetext !== '') {
        pushReplaceRule(bName, sourcetext, replaceText)
      }
    }
  }
}

onMounted(() => {
  readReplaceData()
})
</script>

<style scoped lang="scss">
@import url('../../assets/css/bbtn.min.css');
.replace {
  margin-top: 36px;
}
.item {
  height: 240px;

  position: relative;
}

.control {
  margin: 10px 20px;
  position: absolute;
  bottom: 0px;
  right: 0px;

  display: grid;
  grid-template-columns: 1fr 1fr;

  grid-column-gap: 10px;
  .add-btn {
    grid-column: 3 / 2;
    text-align: center;
    width: 68px;
    /* height: 36px; */
  }

  .cancel-btn {
    text-align: center;
    width: 68px;
  }
}

.fadeOut-enter-from,
.fadeOut-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.fadeOut-enter-active,
.fadeOut-leave-active {
  transition: all 0.4s ease-in-out;
}

.fadeOut-enter-to,
.fadeOut-leave-from {
  opacity: 1;
  transform: translateY(0%);
}

.fadeIn-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
.fadeIn-enter-to {
  opacity: 1;
  transform: translateY(0%);
}

.fadeIn-leave-from {
  opacity: 1;
  transform: translateY(-100%);
}
.fadeIn-leave-to {
  opacity: 0;
  transform: translateY(0%);
}

.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: all 0.8s ease-in-out;
}
</style>
