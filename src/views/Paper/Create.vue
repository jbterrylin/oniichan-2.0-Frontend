<template>
    <v-container>
        <v-card class="px-8 py-4 mt-4 mb-8">
            <v-card-title
                ><v-toolbar-title>创建新单</v-toolbar-title
                ><v-btn color="primary" class="float-right" @click="submit" :disabled="disabledBtn">
                    {{ btnText }}
                </v-btn></v-card-title
            >
            <v-card-content>
                <v-row>
                    <v-col cols="4" class="d-flex align-end mb-2">
                        <v-list-item-title> 文件名: </v-list-item-title>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field
                            v-model="paper.name"
                            variant="underlined"
                            color="primary"
                            hide-details
                            single-line
                        />
                    </v-col>
                    <v-col cols="4" />
                    <v-col cols="4">
                        <v-checkbox
                            v-model="paper.isQuotation"
                            :label="`种类: ${
                                paper.isQuotation ? 'Quotation' : 'Invoice'
                            }`"
                            v-on:change="
                                paper.isQuotation
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
                            v-model="paper.isMYR"
                            :label="`价格单位: ${paper.isMYR ? 'RM' : 'SGD'}`"
                            color="primary"
                            class="checkbox-text-opacity-1"
                            hide-details
                        />
                    </v-col>
                </v-row>
            </v-card-content>
        </v-card>

        <customerCard ref="customerData" class="mb-8" />

        <ItemList
            v-on:getTotal="getTotal($event)"
            ref="itemData"
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
    components: {
        ItemList: ItemList,
        customerCard: customerCard,
    },
    data: () => ({
        paper: {
            name: "",
            isQuotation: true,
            isMYR: true,
            customer: null,
            items: null,
        },
        isDepositNumber: false,
        depositSelect: "50%",
        depositItems: ["20%", "30%", "40%", "50%", "60%"],
        tails: [
            { subheader: "共", value: 0, disabled: true },
            { subheader: "折扣", value: 0, disabled: false },
            { subheader: "订金", value: 0, disabled: false },
            { subheader: "总共", value: 0, disabled: true },
        ],
        disabledBtn: false,
    }),
    computed: {
        btnText() {
            return this.$router.currentRoute.value.name === "paper_show"
                ? "更改"
                : "增加";
        },
    },
    beforeMount() {
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
        this.paper.name = timestamp;

        if (this.$router.currentRoute.value.name === "paper_show") {
            paperStore()
                .getPaper(this.$router.currentRoute.value.params.id)
                .then((response) => {
                    if (response.status === "ok") {
                        this.paper = response.data;
                        this.paper.isQuotation =
                            this.paper.paper_type === PAPER_TYPE.QUOTATION
                                ? true
                                : false;
                        this.paper.isMYR =
                            this.paper.price_unit === PRICE_UNIT.RM
                                ? true
                                : false;

                        this.$refs.customerData.data = this.paper.customer;

                        this.$refs.itemData.data = this.paper.items;
                        this.$refs.itemData.calculateTotal();

                        this.tails[1].value = this.paper.discount;
                        this.tails[2].value = this.paper.deposit;

                        // if deposit same with % in depositItems, isDepositNumber = false and change to that %
                        // else isDepositNumber = true
                        this.depositItems
                            .map((val) =>
                                ((this.tails[0].value - this.tails[1].value) *
                                    parseFloat(val.replace("%", ""))) /
                                    100 ==
                                this.tails[2].value
                                    ? true
                                    : false
                            )
                            .indexOf(true) === -1
                            ? (this.isDepositNumber = true)
                            : (this.depositSelect =
                                  this.depositItems[
                                      this.depositItems
                                          .map((val) =>
                                              ((this.tails[0].value -
                                                  this.tails[1].value) *
                                                  parseFloat(
                                                      val.replace("%", "")
                                                  )) /
                                                  100 ==
                                              this.tails[2].value
                                                  ? true
                                                  : false
                                          )
                                          .indexOf(true)
                                  ]);
                        this.calculateTails();
                    }
                });
            this.disabledAll = true;
        }
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
            if (this.paper.isQuotation) {
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
            this.disabledBtn = true;
            var payload = {
                name: this.paper.name,
                paper_type: this.paper.isQuotation
                    ? PAPER_TYPE.QUOTATION
                    : PAPER_TYPE.INVOICE,
                price_unit: this.paper.isMYR ? PRICE_UNIT.RM : PRICE_UNIT.SGD,
                customer: this.$refs.customerData.data,
                discount: this.tails[1].value,
                deposit: this.tails[2].value,
                items: this.$refs.itemData.data,
            };
            if (this.$router.currentRoute.value.name === "paper_create") {
                paperStore()
                    .postPaper(payload)
                    .then((response) => {
                        console.log("hello");
                        console.log(response);
                        if (response.status == "ok") {
                            this.$router.replace({
                                path: "/papers/" + response.data.id,
                            });
                        }
                    }).finally(() => this.disabledBtn = false);
            } else {
                paperStore().putPaper(
                    this.$router.currentRoute.value.params.id,
                    payload
                ).finally(() => this.disabledBtn = false);
            }
        },
    },
};
</script>
