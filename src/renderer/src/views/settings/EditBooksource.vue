<template>
  <div @click="back">edit</div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
function back() {
  router.back()
}
console.log(route.query.sourceName)
</script>

<style scoped lang="scss">
</style>