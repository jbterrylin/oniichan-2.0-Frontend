<template>
    <v-container>
        <v-card class="px-8 py-4 mt-4 mb-8">
            <v-card-title
                ><v-toolbar-title>创建新单</v-toolbar-title
                ><v-btn color="primary" class="float-right" @click="submit">
                    submit
                </v-btn></v-card-title
            >
            <v-card-content>
                <v-row>
                    <v-col cols="4" class="d-flex align-end mb-2">
                        <v-list-item-title> 文件名: </v-list-item-title>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field
                            v-model="filename"
                            variant="underlined"
                            color="primary"
                            hide-details
                            single-line
                        />
                    </v-col>
                    <v-col cols="4" />
                    <v-col cols="4">
                        <v-checkbox
                            v-model="isQuotation"
                            :label="`种类: ${
                                isQuotation ? 'Quotation' : 'Invoice'
                            }`"
                            v-on:change="
                                isQuotation
                                    ? (tails[3].subheader = '总共')
                                    : (tails[3].subheader = '尾款')
                            "
                            @change="calculateTails"
                            color="primary"
                            class="checkbox-text-opacity-1"
                            hide-details
                        />
                    </v-col>
                    <v-col cols="4">
                        <v-checkbox
                            v-model="isMYR"
                            :label="`价格单位: ${isMYR ? 'RM' : 'SGD'}`"
                            color="primary"
                            class="checkbox-text-opacity-1"
                            hide-details
                        />
                    </v-col>
                </v-row>
            </v-card-content>
        </v-card>

        <customerCard
            ref="customerData"
            :customerData="customer"
            class="mb-8"
        />

        <ItemList
            v-on:getTotal="getTotal($event)"
            ref="itemData"
            :itemData="items"
            class="mb-8"
        />

        <v-row no-gutters>
            <v-col>
                <v-card class="px-8 py-4">
                    <v-card-content>
                        <v-checkbox
                            v-model="isDepositNumber"
                            :label="`订金种类: ${
                                isDepositNumber ? '数字' : '巴仙'
                            }`"
                            @click="isDepositNumberChange"
                            color="primary"
                            class="checkbox-text-opacity-1 mb-2"
                            hide-details
                            :style="{ marginLeft: '-12px' }"
                        />
                        <v-row align="center">
                            <v-col cols="4">
                                <v-list-item-title class="pa-0">
                                    订金预设
                                </v-list-item-title>
                            </v-col>

                            <v-col cols="8">
                                <v-select
                                    v-model="depositSelect"
                                    :items="depositItems"
                                    @update:modelValue="calculateTails"
                                    :disabled="isDepositNumber"
                                    color="primary"
                                    hide-details
                                />
                            </v-col>
                        </v-row>
                    </v-card-content>
                </v-card>
            </v-col>

            <v-spacer />

            <v-col>
                <v-card class="px-8 py-4">
                    <v-card-content>
                        <v-row
                            align="center"
                            v-for="t in tails"
                            :key="t.subheader"
                        >
                            <v-col>
                                <v-list-item-title>
                                    {{ t.subheader }}
                                </v-list-item-title>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="t.value"
                                    :disabled="t.disabled"
                                    reverse
                                    class="pa-0"
                                    @update:modelValue="calculateTails"
                                    color="primary"
                                    hide-details
                                />
                            </v-col>
                        </v-row>
                    </v-card-content>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ItemList from "./component/ItemList.vue";
import customerCard from "./component/customerCard.vue";
import { paperStore } from "../../stores/paperStore";
import { PAPER_TYPE, PRICE_UNIT } from "../../constant/constant";

export default {
    props: ["paper", "customer", "items"],
    components: {
        ItemList: ItemList,
        customerCard: customerCard,
    },
    data: () => ({
        filename: "",
        isQuotation: true,
        isMYR: true,

        isDepositNumber: false,
        depositSelect: "50%",
        depositItems: ["20%", "30%", "40%", "50%", "60%"],
        tails: [
            { subheader: "共", value: 0, disabled: true },
            { subheader: "折扣", value: 0, disabled: false },
            { subheader: "订金", value: 0, disabled: false },
            { subheader: "总共", value: 0, disabled: true },
        ],
    }),
    beforeMount() {
        this.shopItems = [];

        const today = new Date();
        const date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();
        const time =
            today.getHours() +
            "." +
            today.getMinutes() +
            "." +
            today.getSeconds();
        const timestamp = date + "~" + time;
        this.filename = timestamp;

        // if(this.$router.currentRoute.value.path === "/paper/create") {

        // }

        // if (this.paper) {
        //     const paperdata = this.paper;
        //     this.filename = paperdata.name;
        //     this.isQuotation =
        //         paperdata.paper_type == "quotation" ? true : false;
        //     this.shopSelect = paperdata.shop_id;
        //     this.isMYR = paperdata.price_unit == "MYR" ? true : false;
        //     this.tails[1].value = paperdata.discount;
        //     this.tails[2].value = paperdata.deposit;
        // }
    },
    methods: {
        isDepositNumberChange() {
            this.tails[2].disabled = this.isDepositNumber;
            this.calculateTails();
        },
        getTotal(event) {
            this.tails[0].value = event;
            this.calculateTails();
        },
        calculateTails() {
            if (!this.isDepositNumber) {
                this.tails[2].value = (
                    (this.tails[0].value - this.tails[1].value) *
                    (this.depositSelect.slice(0, -1) / 100)
                ).toFixed(2);
            }
            if (this.isQuotation) {
                this.tails[3].value = this.tails[0].value - this.tails[1].value;
            } else {
                this.tails[3].value =
                    this.tails[0].value -
                    this.tails[1].value -
                    this.tails[2].value;
            }
            this.tails.forEach((_, index) => {
                this.tails[index].value = parseFloat(
                    this.tails[index].value
                ).toFixed(2);
            });
        },
        submit() {
            if (this.$router.currentRoute.value.path === "/paper/create") {
                paperStore()
                    .postPaper({
                        name: this.filename,
                        paper_type: this.isQuotation
                            ? PAPER_TYPE.QUOTATION
                            : PAPER_TYPE.RECEIPT,
                        price_unit: this.isMYR ? PRICE_UNIT.RM : PRICE_UNIT.SGD,
                        customer: this.$refs.customerData.data,
                        discount: this.tails[1].value,
                        deposit: this.tails[2].value,
                        items: this.$refs.itemData.data,
                    })
                    .then((response) => {
                        if (response.status == "ok") {
                            this.$router.replace({ path: "/papers" });
                        }
                    });
            } else {
                // axios
                //     .put(`/papers/` + JSON.parse(this.paper).id, {
                //         name: this.filename,
                //         paper_type: this.isQuotation
                //             ? PAPER_TYPE.QUOTATION
                //             : PAPER_TYPE.RECEIPT,
                //         shop_id: this.shopSelect,
                //         price_unit: this.isMYR ? PRICE_UNIT.RM : PRICE_UNIT.SGD,
                //         customer: this.$refs.customerData.data,
                //         discount: this.tails[1].value,
                //         deposit: this.tails[2].value,
                //         items: this.$refs.itemData.data,
                //     })
                //     .then((response) => {
                //         if (response.data.status == "ok")
                //             Turbolinks.visit(Routes.papers_path());
                //     });
            }
        },
    },
};
</script>
