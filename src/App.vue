<script setup lang="ts">
import { ref } from 'vue';
import PhotoWaterfall from './components/PhotoWaterfall.vue';
import HelloWorld from './components/privacy.vue';

const count = ref(2);
</script>

<template>
  <div>
    <!-- <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a> -->
  </div>
  <PhotoWaterfall :count="count" />
</template>
