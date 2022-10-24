<template>
  <nav class="menu">
    <nav class="drop-down-menu" :class="id">
      <input type="checkbox" class="activate" :id="id" />
      <label :for="id" class="menu-title">
        <the-icon :icon="'arrow_right_fat'"></the-icon>
        <slot name="dropDownTitle"></slot>
      </label>

      <div class="drop-down">
        <slot name="dropDownContent"></slot>
      </div>
    </nav>
  </nav>
</template>

<script setup lang="ts">
import TheIcon from "./TheIcon.vue";
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
  let el = document.querySelector(`.${props.id} .item`);
  if (el) {
    return `${el.clientHeight * itemCount.value}px`;
  }

  return "0px";
}
</script>

<style lang="css" scoped>
label {
  color: var(--text-color);
}

.menu {
  user-select: none;
}

.drop-down-menu {
  display: block;
}
.menu-title {
  display: block;
  padding: 10px 15px;

  display: flex;
  align-items: center;

  cursor: pointer;
}

.menu-title svg {
  margin-right: 30px;
  transition: all 0.2s ease-in;
}

.activate {
  display: none;
}

/* Skin */
.drop-down-menu {
  /* background: var(--bg); */
  border-radius: 4px;
  border-bottom: 1px solid var(--border-color2);
  /* background: #3d6d99;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, #5796d0),
    color-stop(100%, #3d6d99)
  );
  background: -moz-linear-gradient(top, #5796d0 0%, #3d6d99 100%); */
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

:checked ~ .menu-title svg {
  transform: rotate(90deg);
}

.drop-down {
  height: 0;
  overflow: hidden;
}

.activate:checked ~ .drop-down {
  height: v-bind(getDropDownHeigth());
}

.drop-down {
  transition: height 0.3s ease-in-out;
}
</style>
