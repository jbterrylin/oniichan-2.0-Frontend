import { defineStore } from "pinia";
import axios from "axios";
import { ref, computed } from "vue";
import { userStore } from "./userStore";

export const customerStore = defineStore(
    "customerStore",
    () => {
        const customerlist = ref([]);

        const getCustomerWithPagination = async (payload) => {
            const data = await axios.post(`/customers_with_pagination`, payload);
            customerlist.value = data.data;
            return data;
        };

        const likeCustomer = async (payload) => {
            const data = await axios.put(`/like_customer`, payload);
        }

        return {
          customerlist,
          getCustomerWithPagination,
          likeCustomer,
        };
    },
    {
        persist: true,
    }
);
