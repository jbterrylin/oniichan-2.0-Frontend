<template>
    <v-container>
        <v-card class="px-8 py-4 mx-8 my-4">
            <v-row no-gutters>
                <v-col md="auto" class="d-flex align-center">
                    <v-card-title class="pa-0"> 您的公司 </v-card-title>
                </v-col>
                <v-spacer />
                <v-col md="auto" class="d-flex align-center">
                    <v-btn right color="primary" @click="submit" :disabled="disabledBtn">
                        submit
                    </v-btn>
                </v-col>
            </v-row>
            <v-form ref="form" :v-model="this.isFormValid" lazy-validation>
                <v-text-field
                    class="pa-0 pt-4"
                    v-model="this.shopData.nick_name"
                    label="简称"
                    required
                    :rules="[rules.required]"
                    color="primary"
                />
                <v-text-field
                    class="pa-0"
                    v-model="this.shopData.name"
                    label="店名"
                    required
                    :rules="[rules.required]"
                    color="primary"
                />
                <v-textarea
                    class="pa-0"
                    v-model="this.shopData.address"
                    label="地址"
                    required
                    :rules="[rules.required]"
                    auto-grow
                    rows="5"
                    color="primary"
                />
                <v-text-field
                    class="pa-0"
                    v-model="this.shopData.ssm"
                    label="准证编号"
                    required
                    :rules="[rules.required]"
                    color="primary"
                />
                <v-text-field
                    class="pa-0"
                    v-model="this.shopData.boss_name"
                    label="联络人名"
                    required
                    :rules="[rules.required]"
                    color="primary"
                />
                <v-text-field
                    class="pa-0"
                    v-model="this.shopData.boss_phone"
                    label="联络人电话"
                    required
                    :rules="[rules.required]"
                    color="primary"
                />
                <v-textarea
                    class="pa-0"
                    v-model="this.shopData.comment"
                    label="备注"
                    auto-grow
                    rows="5"
                    color="primary"
                />
            </v-form>
        </v-card>
    </v-container>
    <vToast ref="vToast" />
</template>

<script>
import vToast from "../components/vToast.vue";
import { shopStore } from "../stores/shopStore";
import { ref } from "vue";

export default {
    components: {
        vToast,
    },
    data: () => ({
        isFormValid: false,
        rules: {
            required: (value) => !!value || "必填项",
        },
        disabledBtn: false,
    }),
    setup() {
        const shopData = ref({
            nick_name: "",
            name: "",
            address: "",
            ssm: "",
            boss_name: "",
            boss_phone: "",
            comment: "",
        });

        shopStore()
            .getUserShop()
            .then((response) => {
                if (response.status == "ok" && response.data != null) {
                    shopData.value = response.data;
                }
            });

        const postUserShop = (payload) =>
            shopStore()
                .postUserShop(shopData.value)
                .then((response) => {
                    if (response.status == "ok") {
                        shopData.value = response.data;
                    }
                });

        return { shopData, postUserShop };
    },
    methods: {
        submit() {
            this.disabledBtn = true;
            this.$refs.form.validate().then((value) => {
                if (value.valid) this.postUserShop();
            }).finally(() => this.disabledBtn = false);
        },
    },
};
</script>
