<template>
  <pre><code class="language-json">{{props.code}}</code></pre>
</template>
<script lang="ts" setup>
import "../../assets/prism/prism1.css";
import prims from "../../assets/prism/prism1.js";
import { defineProps, onMounted, watch, toRaw } from "vue";

const props = defineProps(["code"]);
onMounted(() => {
  prims();
});
//
watch(
  () => toRaw(props.code),
  () => {
    prims();
  }
);
</script>
