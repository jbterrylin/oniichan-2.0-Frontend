import { defineStore } from "pinia";
import axios from "axios";
import { ref, computed } from "vue";
import { userStore } from "./userStore";

export const itemStore = defineStore(
    "itemStore",
    () => {
        const itemlist = ref([]);

        const getItemWithPagination = async (payload) => {
            console.log(payload);
            const data = await axios.post(`/items_with_pagination`, payload);
            itemlist.value = data.data;
            return data;
        };

        return {
            itemlist,
            getItemWithPagination,
        };
    },
    {
        persist: true,
    }
);
