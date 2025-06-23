import { defineStore } from "pinia";
import { ref } from "vue";
import type { UnsplashPhoto } from "../service/unsplash";
import { fetchPhoto } from '../service/unsplash';

export const usePhotoStore = defineStore('photos', () => {
  const photos = ref<UnsplashPhoto[]>([]);
  const page = ref(1);
  const isLoading = ref(false);
  const hasMore = ref(true);
  const error = ref<string | null>(null);
  const retryCount = ref(0);
  const MAX_RETRIES = 3;

  const loadPhotos = async () => {
    if (isLoading.value || !hasMore.value) return;

    try {
      isLoading.value = true;
      error.value = null;
      const newPhotos = await fetchPhoto(page.value);
      
      if (newPhotos.length === 0) {
        hasMore.value = false;
      } else {
        photos.value = [...photos.value, ...newPhotos];
        page.value += 1;
        retryCount.value = 0; // Reset retry count on successful load
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load photos';
      if (retryCount.value < MAX_RETRIES) {
        retryCount.value += 1;
        setTimeout(loadPhotos, 1000 * retryCount.value); // Exponential backoff
      } else {
        hasMore.value = false;
      }
    } finally {
      isLoading.value = false;
    }
  };

  const reset = () => {
    photos.value = [];
    page.value = 1;
    hasMore.value = true;
    error.value = null;
    retryCount.value = 0;
  };

  return {
    photos,
    isLoading,
    hasMore,
    error,
    loadPhotos,
    reset
  }
});
