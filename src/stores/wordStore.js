import { defineStore } from "pinia";
import axios from "axios";
import { ref, computed } from "vue";

export const wordStore = defineStore(
  "wordStore",
  () => {
    const words = ref(null);

    const getWords = computed(() => words.value);

    const getUserWords = async (sorter) => {
      const { data } = await axios.get(`/words`);
      words.value = data.data;
      return data;
    };

    return { words, getWords, getUserWords };
  },
  {
    persist: true,
  }
);
