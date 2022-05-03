import { defineStore } from "pinia";
import axios from "axios";
import { ref, computed } from "vue";
import { userStore } from "./userStore";

export const shopStore = defineStore(
    "shopStore",
    () => {
        const shop = ref(null);

        const getShop = computed(() => shop.value);

        const getUserShop = async (payload) => {
            const { data } = await axios.get(
                `/user_shop/` + userStore().user.id
            );
            shop.value = data.data;
            return data;
        };

        const postUserShop = async (payload) => {
            const data = await axios.post(`/user_shop`, {
                ...payload,
                user_id: userStore().user.id,
            });
            shop.value = data.data;
            return data;
        };

        return { shop, getShop, getUserShop, postUserShop };
    },
    {
        persist: true,
    }
);
