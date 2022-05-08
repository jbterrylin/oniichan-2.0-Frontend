<template>
    <v-data-table
        :headers="headers"
        :items="data"
        item-key="sort_id"
        :must-sort="true"
        :sort-by="['sort_id']"
        class="elevation-1 pa-2 ma-4"
        :hide-default-footer="true"
        :calculate-widths="true"
    >
        <template v-slot:top>
            <v-toolbar
                flat
            >
                <v-toolbar-title>商品列表</v-toolbar-title>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog
                v-model="dialog"
                max-width="500px"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            v-bind="attrs"
                            v-on="on"
                        >
                            New Item
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-form v-model="isFormValid">
                                    <v-row>
                                        <v-col
                                            v-for="(value, name,index) in editedItem"
                                            :key="name"
                                            cols="12"
                                        >
                                            <v-text-field
                                                v-model="editedItem[name]"
                                                :label="name"
                                                required
                                                :rules="(index == 0) ? rules : onlyNumbers"
                                            />
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="close"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="save"
                                :disabled="!isFormValid"
                            >
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="changeOrderItem(item,-1)"
            >
                mdi-arrow-up-thick
            </v-icon>
            <v-icon
                small
                class="mr-2"
                @click="changeOrderItem(item,+1)"
            >
                mdi-arrow-down-thick
            </v-icon>
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                class="mr-2"
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
            <!-- <v-icon TODO:
                small
                @click="space(item)"
            >
                mdi-keyboard-space
            </v-icon> -->
        </template>
    </v-data-table>
</template>

<script>
export default {
    props: ["itemData"],
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: '操作', value: 'actions', sortable: false, align: 'start', width: "180px" },
            // { text: '编号', value: 'sort_id', sortable: false, align: 'start' },
            { text: '产品', value: 'description', sortable: false, align: 'start', width: "60%" },
            { text: '单价', value: 'unit_price', sortable: false, align: 'end', width: "10%" },
            { text: '单位', value: 'unit', sortable: false, align: 'end', width: "10%" },
            { text: '价格', value: 'price', sortable: false, align: 'end', width: "20%" },
        ],
        data: [],
        editedIndex: -1,
        editedItem: {
            description: '',
            unit_price: 0,
            unit: 0,
        },
        defaultItem: {
            description: '',
            unit_price: 0,
            unit: 0,
        },
        total: 0,
        isFormValid: false,
        rules: [v => !!v || '必填内容'],
        onlyNumbers: [v => parseFloat(v) >= 0 || '请输入数字']
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? '输入产品内容' : '更改产品内容'
        },
    },

    watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
    },

    beforeMount() {
        if(this.itemData) {
            this.data = JSON.parse(this.itemData);
            this.data.forEach(element => {
                element["price"] = (element.unit_price * element.unit).toFixed(2);
            });
        }
        this.calculateTotal();
        console.log(this.data);
    },

    created () {
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
        changeOrderItem (item, number) {
            this.editedIndex = this.data[this.data.indexOf(item)].sort_id;
            if((number == -1 && this.editedIndex == 0) || (number == 1 && this.editedIndex == this.data.length-1))
                return;
            this.data[this.data.indexOf(item)].sort_id = this.data[this.data.indexOf(item)].sort_id + number;
            this.data[this.data.indexOf(item)].eddited = true;
            this.data.forEach((value) =>
                value.sort_id == this.editedIndex + number && !value.eddited ?
                    value.sort_id = value.sort_id - number : null
            );
            this.data.forEach((value) => this.$delete(value, 'eddited'));
            this.editedIndex = -1;
        },

        editItem (item) {
            this.editedIndex = this.data.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.$delete(this.editedItem, 'price')
            this.$delete(this.editedItem, 'sort_id')
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.data.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.data.splice(this.editedIndex, 1)
            this.data.forEach(element => {
                if(element.sort_id > this.editedIndex)
                    element.sort_id = element.sort_id-1;
            });
            this.closeDelete()
            this.calculateTotal()
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        save () {
            this.editedItem.price = this.editedItem.unit_price * this.editedItem.unit;
            this.editedItem.unit_price = parseFloat(this.editedItem.unit_price).toFixed(2);
            this.editedItem.price = parseFloat(this.editedItem.price).toFixed(2);
            if (this.editedIndex > -1) {
                Object.assign(this.data[this.editedIndex], this.editedItem)
            } else {
                if (this.data.length != 0)
                    this.editedItem.sort_id = (this.data.reduce((a,b) => Number(a.sort_id) > Number(b.sort_id) ? a : b).sort_id) + 1
                else
                    this.editedItem.sort_id = 0
                this.data.push(this.editedItem)
            }
            this.close()
            this.calculateTotal()
        },

        calculateTotal () {
            this.total = this.data.reduce((sum, item) => sum += parseFloat(item.price), 0);
            this.$emit('getTotal', this.total)
        },
    },
}
</script>