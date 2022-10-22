<template>
    <div class="search__container">
      <slot></slot>
    </div>
  </template>
  
  <script lang="ts" setup>

  </script>
  
  <style lang="scss">
  .search {
    &__container {
      margin: 0 auto;
      width: 80%;
    }
  
    &__input {
      width: 100%;
      padding: 12px 24px;
  
      background-color: transparent;
      transition: transform 250ms ease-in-out;
      font-size: 14px;
      line-height: 18px;
  
      color: var(--dark-color);
      
      background-size: 18px 18px;
      background-position: 95% center;
      border-radius: 50px;
      border: 1px solid hsl(60, 4%, 20%);
      transition: all 250ms ease-in-out;
      backface-visibility: hidden;
      transform-style: preserve-3d;
  
      &::placeholder {
        color: color(#ffffff a(0.8));
        text-transform: uppercase;
        letter-spacing: 1.5px;
      }
  
      &:hover,
      &:focus {
        padding: 12px 0;
        outline: 0;
        border: 1px solid transparent;
        border-bottom: 1px solid #575756;
        border-radius: 0;
        background-position: 100% center;
      }
    }
  }
  </style>
  