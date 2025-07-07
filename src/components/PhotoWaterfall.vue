<template>
  <div class="mb-4">
    <el-button disabled>Default</el-button>
    <el-button type="primary" disabled>Primary</el-button>
    <el-button type="success" disabled>Success</el-button>
    <el-button type="info" disabled>Info</el-button>
    <el-button type="warning" disabled>Warning</el-button>
    <el-button type="danger" disabled>Danger</el-button>
  </div>
  <p>{{ count }}</p>
  <div class="columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
    <div v-for="photo in photos" :key="photo.id" class="break-inside-avoid mb-4">
      <div class="relative group">
        <img 
          :src="photo.urls.small" 
          :alt="photo.slug" 
          class="w-full rounded-lg transition-all duration-300 opacity-0 hover:shadow-lg" 
          loading="lazy"
          @load="(e: Event) => (e.target as HTMLImageElement).classList.add('opacity-100')"
          @error="(e: Event) => (e.target as HTMLImageElement).src = '../assets/placeholder-image.jpg'"
        />
        <p class="text-sm text-gray-600 mt-2 line-clamp-2">{{ photo.slug }}</p>
      </div>
    </div>
    <div ref="sentinel" class="h-4 w-full"></div>
  </div>
</template>
<script setup lang="ts">
import { usePhotoStore } from '../store/photo';
import { storeToRefs } from 'pinia';
import { ref, onMounted, onUnmounted } from 'vue';

defineProps<{ count: number }>();
const photoStore = usePhotoStore();
const { photos, isLoading, hasMore } = storeToRefs(photoStore);
const sentinel = ref<HTMLElement | null>(null);
const observer = ref<IntersectionObserver | null>(null);
const debounceTimeout = ref<number | null>(null);

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  if (entries[0].isIntersecting && !isLoading.value && hasMore.value) {
    // Debounce the load more request
    if (debounceTimeout.value) {
      clearTimeout(debounceTimeout.value);
    }
    debounceTimeout.value = window.setTimeout(() => {
      photoStore.loadPhotos();
    }, 300);
  }
};

onMounted(() => {
  photoStore.loadPhotos();
  observer.value = new IntersectionObserver(
    handleIntersection,
    {
      threshold: 0.5, // Increased threshold for better performance
      rootMargin: '100px', // Start loading before reaching the bottom
    }
  );

  if (sentinel.value) {
    observer.value.observe(sentinel.value);
  }
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
  if (debounceTimeout.value) {
    clearTimeout(debounceTimeout.value);
  }
});
</script>

<style>
/* Add this to your global CSS or component styles */
.break-inside-avoid {
  break-inside: avoid;
}
</style>
