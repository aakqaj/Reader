<template>
  <div class="tools-bar">
    <the-icon
      :icon="'books'"
      class="bookshelf"
      :class="{ toolsBarActive: toolsBarActive }"
      @click="toBookshelf"
    ></the-icon>
    <the-icon
      class="setting"
      :icon="'setting'"
      :class="{ toolsBarActive: !toolsBarActive }"
      @click="toSettings"
    ></the-icon>
  </div>
</template>

<script setup lang="ts">
import TheIcon from './TheIcon.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const toolsBarActive = ref(true)

function toBookshelf() {
  toolsBarActive.value = true
  router.push('/bookshelf')
}

function toSettings() {
  toolsBarActive.value = false
  router.push('/settings')
}
</script>

<style lang="scss" scoped>
.tools-bar {
  border-radius: 0 0 24px 24px;
  position: fixed;
  padding: 10px;
  width: 100%;
  height: 80px;
  bottom: 0;

  background-color: var(--bg);
  box-shadow: 1px 1px 10px hsla(0, 0%, 0%, 0.2);
}

.tools-bar {
  display: grid;
  grid-template-columns: 1fr 1fr;

  align-items: center;
  justify-items: center;
}

.bookshelf {
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: rotate(-12deg);
  }
}

.setting {
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: rotate(90deg);
  }
}
.icon.toolsBarActive {
  color: hsl(213, 96%, 46%);
}
</style>
