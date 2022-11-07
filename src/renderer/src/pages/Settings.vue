<template>
  <div id="settings">
    <div class="left-bar">
      <div class="setting-list">
        <router-link class="s-item bookshelf-manger down" @click="changeShow" to="booksourcemanger">
          书源管理
        </router-link>

        <router-link class="s-item bookshelf-manger" @click="changeShow" to="bookshelfmanger"
          >书架管理</router-link
        >

        <router-link class="s-item bookshelf-manger" @click="changeShow" to="themsmanger"
          >快捷键</router-link
        >
      </div>

      <router-link class="about s-item" @click="changeShow" to="about">关于</router-link>
    </div>
    <div class="view">
      <transition name="rview">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
onMounted(() => {
  router.push('/booksourcemanger')
})

let prePosition: number = 0
let preEl = null
function changeShow(event: any) {
  const preDownEl = document.querySelector('.down')
  const preUpEl = document.querySelector('.up')

  if (preEl !== event.target) {
    if (preDownEl) {
      preDownEl.classList.remove('down')
    }
    if (preUpEl) {
      preUpEl.classList.remove('up')
    }

    if (event.pageY > prePosition) {
      setTimeout(() => {
        event.target.classList.add('down')
      }, 10)
    } else {
      setTimeout(() => {
        event.target.classList.add('up')
      }, 10)
    }
  }

  prePosition = event.pageY
  preEl = event.target
}
</script>

<style scoped lang="scss">
// 布局
#settings {
  margin-top: 12px;
  width: 100%;
  height: calc(100% - 134px);

  display: grid;
  grid-template-columns: 238px 1fr;
}

.left-bar {
  border-radius: 0 8px 8px 0;
  display: grid;
  grid-template-rows: 1fr 64px;
  .setting-list {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 64px);
    align-items: center;
  }
  .s-item {
    margin: 8px 10px 0 10px;
    line-height: 56px;
  }
}

// 配色 动画
.left-bar {
  background-color: hsl(0, 0%, 16%);
  box-shadow: 2px 0px 8px hsl(0, 0%, 14%);
  z-index: 3;
}

.s-item {
  color: var(--text-color);
  &:hover {
    border-radius: 8px;
    background-color: hsl(0, 0%, 18%);
    box-shadow: 1px 1px 10px hsla(0, 0%, 8%, 0.3);
  }
}

.router-link-active {
  border-radius: 8px;
  background-color: hsl(0, 0%, 18%);
  box-shadow: 1px 1px 10px hsla(0, 0%, 8%, 0.3);

  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 4px;
    left: -8px;
    top: 16px;
    background-color: hsl(213, 96%, 46%);
    border-radius: 50px;
  }
}

@keyframes down {
  0% {
    height: 0;
  }
  100% {
    height: 24px;
  }
}

.router-link-active.down {
  transition: all 0.3s ease-in;

  &::before {
    animation: down 0.2s ease-in;
    height: 24px;
  }
}

.router-link-active.up {
  transition: all 0.3s ease-in;

  &::before {
    position: absolute;
    top: auto;
    bottom: 16px;
    animation: down 0.2s ease-in;
    height: 24px;
  }
}

.view {
  background-color: hsla(0, 0%, 18%);
  border-radius: 8px;
  box-shadow: -2px 2px 10px rgb(0, 0, 0);
  overflow: scroll;
}

.rview-enter-from,
.rview-leave-to {
  opacity: 0;
}

.rview-enter-active {
  transition: all 0.8s ease-in-out;
}
.rview-leave-active {
  transition: all 0.2s ease-in-out;
}

.rview-enter-to,
.rview-leave-from {
  opacity: 1;
}
</style>