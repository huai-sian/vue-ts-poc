<template>
  <div>
    {{ formatTime }}
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
// import { useCountdown } from "../composables/useCountdown";
import { useCountdown } from "../composables/useCountdown";

const {
    formatTime,
    start,
  } = useCountdown();

onMounted(() => {
  start();
})
</script>