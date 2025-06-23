import { ref, computed } from 'vue';

/**
 * Description
 * @param {number} defaultSeconds:number=300
 * @returns {any}
 */
export const useCountdown = (defaultSeconds: number = 300): any => {
  const timeLeft = ref(defaultSeconds);
  const timer = ref<number | null>(null);

  const formattedTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} 分 ${seconds === 0 ? '00' : seconds < 10 ? `0${seconds}` : seconds } 秒`;
  }

  const formatTime = computed(() => formattedTime(timeLeft.value));

  const start = () => {
    if (timer.value) return;
    timer.value = setInterval(() => {
      if (timeLeft.value <= 1) {
        timeLeft.value = 0;
        clear();
        return;
      }
      timeLeft.value -= 1;
    }, 1000)
  }

  const restart = () => {
    clear();
    timeLeft.value = defaultSeconds;
    start();
  }

  const clear = () => {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
  }

  return {
    timeLeft,
    formatTime,
    testFormattedTime: formattedTime(timeLeft.value),
    start,
    restart,
    clear,
  }
}