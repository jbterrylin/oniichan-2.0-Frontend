import { defineStore } from "pinia";
import axios from "axios";
import { ref, computed } from "vue";
import { userStore } from "./userStore";

export const paperStore = defineStore(
    "paperStore",
    () => {
        const paperlist = ref([]);

        const getPapers = computed(() => paperlist.paperlist);

        const getPaperList = async (payload) => {
            const { data } = await axios.get(`/papers`, payload);
            paperlist.value = data.data;
            return data;
        };

        const getPaperWithPagination = async (payload) => {
            console.log(payload)
            const data = await axios.post(`/papers_with_pagination`, payload);
            await console.log(data.data.data.map((data) => data.customers_id));
            paperlist.value = data.data;
            return data;
        };

        const postPaper = async (payload) => {
            const data = await axios.post(`/papers`, payload);
            return data;
        };

        return {
            paperlist,
            getPapers,
            getPaperList,
            getPaperWithPagination,
            postPaper,
        };
    },
    {
        persist: true,
    }
);
