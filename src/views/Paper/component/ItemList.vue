<template>
    <v-card class="px-8 py-4 mt-4 mb-8">
        <v-card-title
            ><v-toolbar-title>商品单</v-toolbar-title
            ><v-dialog v-model="dialog" min-width="1200px">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props"> 增加 </v-btn>
                </template>
                <v-card class="px-8 py-4" min-width="1200px">
                    <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-content>
                        <v-form
                            ref="form"
                            lazy-validation
                        >
                            <v-row>
                                <v-col
                                    v-for="(value, name, index) in editedItem"
                                    :key="name"
                                    cols="12"
                                >
                                    <v-text-field
                                        v-model="editedItem[name]"
                                        :label="
                                            {
                                                description: '产品名',
                                                unit_price: '单价',
                                                unit: '单位',
                                            }[name]
                                        "
                                        required
                                        :rules="
                                            index == 0 ? rules : onlyNumbers
                                        "
                                        color="primary"
                                    />
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-content>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary darken-1" text @click="close()">
                            取消
                        </v-btn>
                        <v-btn color="primary darken-1" text @click="save()">
                            保存
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog></v-card-title
        >
        <v-card-content>
            <a-table
                :columns="columns"
                :data-source="data"
                :pagination="false"
                :showSorterTooltip="false"
                bordered
            >
                <template #headerCell="{ column }">
                    <template v-if="column.dataIndex === 'actions'">
                        <div v-html="column.title"></div>
                    </template>
                </template>
                <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex === 'actions'">
                        <v-icon
                            x-small
                            class="mr-1 cursor-pointer"
                            @click="changeOrderItem(record, -1)"
                        >
                            mdi-arrow-up-thick
                        </v-icon>
                        <v-icon
                            x-small
                            class="mr-1 cursor-pointer"
                            @click="changeOrderItem(record, +1)"
                        >
                            mdi-arrow-down-thick
                        </v-icon>
                        <v-icon x-small class="mr-1 cursor-pointer" @click="editItem(record)">
                            mdi-pencil
                        </v-icon>
                        <v-icon
                            x-small
                            class="mr-1 cursor-pointer"
                            @click="deleteItem(record)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                </template>
            </a-table>
            <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card class="px-8 py-4">
                    <v-card-title>你确定要删除此产品吗？</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary darken-1" text @click="closeDelete">Cancel</v-btn>
                        <v-btn color="primary darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card-content>
    </v-card>
</template>

<script>
export default {
    props: ["itemData"],
    data: () => ({
        dialog: false,
        dialogDelete: false,
        columns: [
            {
                title: "操作",
                dataIndex: "actions",
                align: "start",
                sorter: (a, b) => a.sort_id - b.sort_id,
                sortOrder: "ascend",
            },
            {
                title: "产品名",
                dataIndex: "description",
                sortable: false,
                align: "start",
                width: "47%",
            },
            {
                title: "单价",
                dataIndex: "unit_price",
                sortable: false,
                align: "end",
                width: "10%",
            },
            {
                title: "单位",
                dataIndex: "unit",
                sortable: false,
                align: "end",
                width: "10%",
            },
            {
                title: "价格",
                dataIndex: "price",
                sortable: false,
                align: "end",
                width: "20%",
            },
        ],
        data: [
            {
                sort_id: 0,
                description: "1",
                unit_price: "2",
                unit: "3",
                price: "4",
            },
            {
                sort_id: 1,
                description: "5",
                unit_price: "6",
                unit: "7",
                price: "8",
            },
            {
                sort_id: 2,
                description: "1",
                unit_price: "2",
                unit: "3",
                price: "4",
            },
        ],
        editedIndex: -1,
        editedItem: {
            description: "",
            unit_price: 0,
            unit: 0,
        },
        defaultItem: {
            description: "",
            unit_price: 0,
            unit: 0,
        },
        total: 0,
        rules: [(v) => !!v || "必填内容"],
        onlyNumbers: [(v) => parseFloat(v) >= 0 || "请输入数字"],
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "输入产品内容" : "更改产品内容";
        },
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },

    beforeMount() {
        if (this.itemData) {
            this.data = this.itemData;
            this.data.forEach((element) => {
                element["price"] = (element.unit_price * element.unit).toFixed(
                    2
                );
            });
        }
        this.calculateTotal();
        console.log(this.data);
    },

    created() {
        // this.data = [
        //     {
        //     sort_id: 0,
        //     description: '12',
        //     unit_price: 0,
        //     unit: 0,
        //     price: 0,
        //     },
        //     {
        //     sort_id: 1,
        //     description: '34',
        //     unit_price: 2,
        //     unit: 3,
        //     price: 0,
        //     },
        //     {
        //     sort_id: 2,
        //     description: '56',
        //     unit_price: 0,
        //     unit: 0,
        //     price: 0,
        //     },
        //     {
        //     sort_id: 3,
        //     description: '78',
        //     unit_price: 0,
        //     unit: 0,
        //     price: 0,
        //     },
        //     {
        //     sort_id: 4,
        //     description: '90',
        //     unit_price: 0,
        //     unit: 0,
        //     price: 0,
        //     },
        //     {
        //     sort_id: 5,
        //     description: 'ab',
        //     unit_price: 0,
        //     unit: 0,
        //     price: 0,
        //     },
        // ]
    },

    methods: {
        changeOrderItem(item, number) {
            this.editedIndex = this.data[this.data.indexOf(item)].sort_id;
            if (
                (number == -1 && this.editedIndex == 0) ||
                (number == 1 && this.editedIndex == this.data.length - 1)
            )
                return;
            this.data[this.data.indexOf(item)].sort_id =
                this.data[this.data.indexOf(item)].sort_id + number;
            this.data[this.data.indexOf(item)].eddited = true;
            this.data.forEach((value) =>
                value.sort_id == this.editedIndex + number && !value.eddited
                    ? (value.sort_id = value.sort_id - number)
                    : null
            );
            this.data.forEach((value) => delete value["eddited"]);
            this.editedIndex = -1;
        },

        editItem(item) {
            this.editedIndex = this.data.indexOf(item);
            this.editedItem = Object.assign({}, item);
            // this.$delete(this.editedItem, "price");
            // this.$delete(this.editedItem, "sort_id");
            delete this.editedItem["price"];
            delete this.editedItem["sort_id"];
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.data.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.data.splice(this.editedIndex, 1);
            this.data.forEach((element) => {
                if (element.sort_id > this.editedIndex)
                    element.sort_id = element.sort_id - 1;
            });
            this.closeDelete();
            this.calculateTotal();
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            this.$refs.form.validate().then((value) => {
                if (value.valid) {
                    this.editedItem.price =
                        this.editedItem.unit_price * this.editedItem.unit;
                    this.editedItem.unit = parseFloat(
                        this.editedItem.unit
                    )
                    this.editedItem.unit_price = parseFloat(
                        this.editedItem.unit_price
                    ).toFixed(2);
                    this.editedItem.price = parseFloat(
                        this.editedItem.price
                    ).toFixed(2);
                    if (this.editedIndex > -1) {
                        Object.assign(
                            this.data[this.editedIndex],
                            this.editedItem
                        );
                    } else {
                        if (this.data.length != 0)
                            this.editedItem.sort_id =
                                this.data.reduce((a, b) =>
                                    Number(a.sort_id) > Number(b.sort_id)
                                        ? a
                                        : b
                                ).sort_id + 1;
                        else this.editedItem.sort_id = 0;
                        this.data.push(this.editedItem);
                    }
                    console.log("reach");
                    this.close();
                    this.calculateTotal();
                }
            });
        },

        calculateTotal() {
            this.total = this.data.reduce(
                (sum, item) => (sum += parseFloat(item.price)),
                0
            );
            this.$emit("getTotal", this.total);
        },
    },
};
</script>
