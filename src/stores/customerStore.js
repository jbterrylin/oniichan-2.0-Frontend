import { defineStore } from "pinia";
import axios from "axios";
import { ref, computed } from "vue";
import { userStore } from "./userStore";

export const customerStore = defineStore(
  "customerStore",
  () => {
    const customerlist = ref([]);

    const getCustomer = async (id) => {
      const { data } = await axios.get(`/customers/` + id);
      return data;
    };

    const getCustomers = async (payload) => {
      const { data } = await axios.get(
        `/customers${payload.like ? "/like" : ""}`
      );
      customerlist.value = data.data;
      return data;
    };

    const getCustomerWithPagination = async (payload) => {
      const data = await axios.post(`/customers_with_pagination`, payload);
      customerlist.value = data.data;
      return data;
    };

    const likeCustomer = async (payload) => {
      const data = await axios.put(`/like_customer`, payload);
    };

    return {
      customerlist,
      getCustomer,
      getCustomers,
      getCustomerWithPagination,
      likeCustomer,
    };
  },
  {
    persist: true,
  }
);
