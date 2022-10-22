<template>
  <div :class="`anime-target${name ? '-' + name : ''}`" class="default">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, watchEffect } from 'vue'
import anime from 'animejs'

const props = defineProps(['animeObj', 'name', 'show'])

watchEffect(() => {
  if (props.show) {
    anime({
      targets: `.anime-target${props.name ? '-' + props.name : ''}`,
      ...props.animeObj.enterActive,
      opacity: 1 //防止覆盖 通过控制组件透明度来控制组件显示与隐藏 内嵌入过度逻辑
    })
  } else {
    anime({
      targets: `.anime-target${props.name ? '-' + props.name : ''}`,
      ...props.animeObj.leaveActive,
      opacity: 0
    })
  }
})
</script>

<style lang="scss" scoped>
.default {
  opacity: 0;
}

</style>