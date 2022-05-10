<template>
    <v-container>
        <v-alert color="primary" variant="outlined">
            <template v-slot:title> 提示 </template>
            拷贝创建使用最新的本店资料。
        </v-alert>
        <v-card class="px-8 py-4 my-4 d-flex align-center">
            <v-card-content>
                <div class="d-flex mb-4 align-center">
                    <v-toolbar-title class="ml-1">单list</v-toolbar-title>
                    <v-btn
                        color="primary"
                        :disabled="selectedRow === null"
                        @click="route('/paper/create/' + selectedRow)"
                    >
                        拷贝创建
                    </v-btn>
                    <v-btn
                        class="ml-4"
                        color="primary"
                        @click="route('/paper/create')"
                    >
                        创建
                    </v-btn>
                </div>
                <a-table
                    :columns="columns"
                    :data-source="paperData"
                    :pagination="pagination"
                    :loading="loading"
                    @change="handleTableChange"
                    :row-selection="rowSelection"
                    bordered
                    :rowKey="(record) => record.id"
                >
                    <template
                        #customFilterDropdown="{
                            setSelectedKeys,
                            selectedKeys,
                            confirm,
                            clearFilters,
                            column,
                        }"
                    >
                        <div style="padding: 8px">
                            <a-input
                                ref="searchInput"
                                :placeholder="`Search ${column.dataIndex}`"
                                :value="selectedKeys[0]"
                                style="
                                    width: 188px;
                                    margin-bottom: 8px;
                                    display: block;
                                "
                                @change="
                                    (e) =>
                                        setSelectedKeys(
                                            e.target.value
                                                ? [e.target.value]
                                                : []
                                        )
                                "
                                @pressEnter="
                                    handleSearch(
                                        selectedKeys,
                                        confirm,
                                        column.dataIndex
                                    )
                                "
                            />
                            <a-button
                                type="primary"
                                size="small"
                                style="width: 90px; margin-right: 8px"
                                @click="
                                    handleSearch(
                                        selectedKeys,
                                        confirm,
                                        column.dataIndex
                                    )
                                "
                            >
                                Search
                            </a-button>
                            <a-button
                                size="small"
                                style="width: 90px"
                                @click="handleReset(clearFilters)"
                            >
                                Reset
                            </a-button>
                        </div>
                    </template>
                    <template #bodyCell="{ text, column, record }">
                        <template v-if="column.dataIndex === 'name'">
                            <a @click="route('/papers/' + record.id)">{{
                                text
                            }}</a>
                        </template>
                        <span
                            v-if="
                                searchText &&
                                searchedColumn === column.dataIndex
                            "
                        >
                            <template
                                v-for="(fragment, i) in text
                                    .toString()
                                    .split(
                                        new RegExp(
                                            `(?<=${searchText})|(?=${searchText})`,
                                            'i'
                                        )
                                    )"
                            >
                                <mark
                                    v-if="
                                        fragment.toLowerCase() ===
                                        searchText.toLowerCase()
                                    "
                                    :key="i"
                                    class="highlight"
                                >
                                    {{ fragment }}
                                </mark>
                                <template v-else>{{ fragment }}</template>
                            </template>
                        </span>
                    </template>
                    <!-- <template #bodyCell="{ column, text }">
                        <template v-if="true">
                            <a>{{ text }}</a>
                        </template>
                    </template> -->
                </a-table>
                <!-- <p>{{paperData[0]}}</p> -->
            </v-card-content>
        </v-card>
    </v-container>
</template>

<script>
import { usePagination } from "vue-request";
import { computed, defineComponent, ref, reactive, toRefs } from "vue";
import { paperStore } from "../../stores/paperStore";
import { PAPER_TYPE, PRICE_UNIT } from "../../constant/constant";

export default {
    data: () => ({
        columns: [
            {
                title: "文件名",
                dataIndex: "name",
                sorter: true,
                customFilterDropdown: true,
                onFilter: (value, record) =>
                    record.name
                        .toString()
                        .toLowerCase()
                        .includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: (visible) => {
                    if (visible) {
                        setTimeout(() => {
                            searchInput.value.focus();
                        }, 100);
                    }
                },
            },
            {
                title: "种类",
                dataIndex: "paper_type",
                filters: [
                    {
                        text: "Quotation",
                        value: PAPER_TYPE.QUOTATION,
                    },
                    {
                        text: "Invoice",
                        value: PAPER_TYPE.INVOICE,
                    },
                ],
                onFilter: (value, record) => record.paper_type == value,
            },
            {
                title: "价格单位",
                dataIndex: "price_unit",
                filters: [
                    {
                        text: "RM",
                        value: PRICE_UNIT.RM,
                    },
                    {
                        text: "SGD",
                        value: PRICE_UNIT.SGD,
                    },
                ],
                onFilter: (value, record) => record.price_unit == value,
            },
            {
                title: "顾客名",
                dataIndex: ["customer", "name"],
            },
            {
                title: "折扣",
                dataIndex: "discount",
            },
            {
                title: "定金",
                dataIndex: "deposit",
            },
            {
                title: "价格",
                dataIndex: "total_price",
            },
        ],
    }),
    setup() {
        // pagination
        const total = ref(0);

        const getPaperWithPagination = (payload) =>
            paperStore()
                .getPaperWithPagination(payload)
                .then((response) => {
                    if (
                        response.data.status == "ok" &&
                        response.data.data != null
                    ) {
                        total.value = response.data.detail.total;
                        return response;
                    }
                    return [];
                });

        const {
            data: paperData,
            run,
            loading,
            current,
            pageSize,
        } = usePagination(getPaperWithPagination, {
            formatResult: (res) => res.data.data,
            pagination: {
                currentKey: "page",
                pageSizeKey: "results",
            },
        });

        var pagination = computed(() => ({
            total: total.value,
            current: current.value,
            pageSize: pageSize.value,
        }));

        const handleTableChange = (pag, filters, sorter) => {
            run({
                results: pag.pageSize,
                page: pag?.current,
                sortField: sorter.field,
                sortOrder: sorter.order,
                ...filters,
            });
        };

        // search
        const state = reactive({
            searchText: "",
            searchedColumn: "",
        });

        const searchInput = ref();

        const handleSearch = (selectedKeys, confirm, dataIndex) => {
            confirm();
            state.searchText = selectedKeys[0];
            state.searchedColumn = dataIndex;
        };

        const handleReset = (clearFilters) => {
            clearFilters({ confirm: true });
            state.searchText = "";
        };

        // select row
        const selectedRow = ref(null);
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) =>
                (selectedRow.value = selectedRowKeys),
            type: "radio",
        };

        return {
            paperData,
            pagination,
            loading,
            handleTableChange,
            handleSearch,
            handleReset,
            searchInput,
            ...toRefs(state),
            selectedRow,
            rowSelection,
        };
    },
    computed: {},
    methods: {
        route(path) {
            this.$router.replace(path);
        },
    },
};
</script>
