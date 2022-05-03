import { defineStore } from "pinia";
import axios from "axios";
import { ref, computed } from "vue";

export const userStore = defineStore(
  "userStore",
  () => {
    const user = ref(null);

    const getUser = computed(() => user.value);

    const login = async (payload) => {
      const { data } = await axios.post(`/login`, payload);
      user.value = data.data;
      return data;
    };

    return { user, getUser, login };
  },
  {
    persist: true,
  }
);
