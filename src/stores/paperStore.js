import { defineStore } from "pinia";
import axios from "axios";
import { ref, computed } from "vue";
import { userStore } from "./userStore";

export const paperStore = defineStore(
    "paperStore",
    () => {
        const paperlist = ref([]);
        const paper = ref(null);

        const getPapers = computed(() => paperlist.paperlist);

        const getPaperList = async (payload) => {
            const { data } = await axios.get(`/papers`, payload);
            paperlist.value = data.data;
            return data;
        };

        const getPaperWithPagination = async (payload) => {
            const data = await axios.post(`/papers_with_pagination`, payload);
            paperlist.value = data.data;
            return data;
        };

        const postPaper = async (payload) => {
            const { data } = await axios.post(`/papers`, payload);
            return data;
        };

        const putPaper = async (id, payload) => {
            const { data } = await axios.put(`/papers/` + id, payload);
            return data;
        };

        const getPaper = async (id) => {
            const { data } = await axios.get(`/papers/` + id);
            paper.value = data.data;
            return data;
        };

        return {
            paperlist,
            getPapers,
            getPaperList,
            getPaperWithPagination,
            postPaper,
            putPaper,
            getPaper,
        };
    },
    {
        persist: true,
    }
);
