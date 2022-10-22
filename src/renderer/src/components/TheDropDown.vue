<template>
  <nav class="menu">
    <nav class="drop-down-menu" :class="id">
      <input type="checkbox" class="activate" :id="id" />
      <label :for="id" class="menu-title">
        <slot name="dropDownTitle"></slot>
      </label>

      <div class="drop-down">
        <slot name="dropDownContent"></slot>
      </div>
    </nav>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, onMounted, onUpdated, ref } from "vue";

const props = defineProps(["id"]);
const itemCount = ref(0);

onUpdated(() => {
  itemCount.value = document.querySelectorAll(`.${props.id} .item`).length;
});

onMounted(() => {
  itemCount.value = document.querySelectorAll(`.${props.id} .item`).length;
});

function getDropDownHeigth() {
  return `${itemCount.value * 30}px`;
}
</script>

<style lang="css" scoped>
a,
label {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
}

a:hover {
  color: #ddd;
}

.menu a {
  display: block;
  padding: 10px 15px;
}

.drop-down-menu {
  display: block;
}

.menu-title {
  cursor: pointer;
}

.menu-title {
  display: block;
  padding: 10px 15px;
}

.activate {
  display: none;

  position: absolute;
  cursor: pointer;
  width: 100%;
  height: 40px;
  margin: 0 0 0 -15px;
  opacity: 0;
}

/* Skin */
.drop-down-menu {
  background: #3d6d99;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, #5796d0),
    color-stop(100%, #3d6d99)
  );
  background: -moz-linear-gradient(top, #5796d0 0%, #3d6d99 100%);
}

.drop-down-menu:hover {
  background: #5a6470;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, #495261),
    color-stop(100%, #38404b)
  );
  background: -moz-linear-gradient(top, #495261 0%, #38404b 100%);
}

:checked ~ .menu-title {
  background: #495261;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, #495261),
    color-stop(100%, #38404b)
  );
  background: -moz-linear-gradient(top, #495261 0%, #38404b 100%);
}

.drop-down {
  max-height: 0;
  overflow: hidden;
}

.drop-down a {
  background: #222;
}

.drop-down a:hover {
  background: #111;
}

.activate:checked ~ .drop-down {
  max-height: v-bind(getDropDownHeigth());
}

.drop-down {
  transition: max-height 0.3s ease-in-out;
}
</style>
