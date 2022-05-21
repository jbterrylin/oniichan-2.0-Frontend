<template>
  <v-card class="px-8 py-4 my-4">
    <v-card-title>创建新单</v-card-title>

    <v-card-content>
      <v-row align="center" class="mb-8">
        <v-col cols="4">
          <v-list-item-title class="pa-0"> 喜爱顾客 </v-list-item-title>
        </v-col>

        <v-col cols="8">
          <v-Select
            v-model="customerSelect"
            :items="this.customerList"
            color="primary"
            @update:modelValue="this.selectLikeCustomer"
            hide-details
            clearable
          />
        </v-col>
      </v-row>
      <v-form ref="form">
        <v-text-field
          v-model="data.name"
          label="顾客姓名/公司名"
          :rules="requiredRules()"
          color="primary"
          @click:input="this.$refs.form.validate()"
          :disabled="disabledInput"
        />
        <v-textarea
          v-model="data.address"
          label="地址"
          :rules="requiredRules()"
          color="primary"
          @click="this.$refs.form.validate()"
          :disabled="disabledInput"
        />
        <v-text-field
          v-model="data.phone"
          label="顾客电话"
          :rules="requiredRules()"
          color="primary"
          @click:input="this.$refs.form.validate()"
          :disabled="disabledInput"
        />
      </v-form>
    </v-card-content>
  </v-card>
</template>

<script>
import { computed, defineComponent, ref, reactive, toRefs } from "vue";
import { customerStore } from "../../../stores/customerStore";
import vSelectMapper from "../../../helper/vSelectMapper";

export default {
  data: () => ({
    customerSelect: null,
    data: {
      name: "",
      address: "",
      phone: "",
    },
    disabledInput: false,
  }),
  setup() {
    const customerList = ref([]);

    customerStore()
      .getCustomers({ like: true })
      .then((value) => {
        value.status == "ok"
          ? (customerList.value = vSelectMapper(value.data, "name", "id"))
          : null;
      });

    return {
      customerList,
    };
  },
  methods: {
    requiredRules() {
      return [
        (v) =>
          !(
            this.data.name == "" &&
            this.data.address == "" &&
            this.data.phone == ""
          ) || "必填内容",
      ];
    },
    selectLikeCustomer() {
      if (this.customerSelect) {
        customerStore()
          .getCustomer(this.customerSelect)
          .then((value) => {
            value.status == "ok" ? (this.data = value.data) : null;
          });
        this.disabledInput = true;
      } else {
        this.disabledInput = false;
      }
    },
  },
};
</script>
