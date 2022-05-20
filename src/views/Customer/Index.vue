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
        </div>
        <a-table
          :columns="columns"
          :data-source="customerData"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
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
              <div
                v-if="
                  column.dataIndex == 'name' ||
                  column.dataIndex == 'address' ||
                  column.dataIndex == 'phone'
                "
              >
                <a-input
                  ref="searchInput"
                  :placeholder="`Search ${column.dataIndex}`"
                  :value="selectedKeys[0]"
                  style="width: 188px; margin-bottom: 8px; display: block"
                  @change="
                    (e) =>
                      setSelectedKeys(e.target.value ? [e.target.value] : [])
                  "
                  @pressEnter="
                    handleSearch(selectedKeys, confirm, column.dataIndex)
                  "
                />
                <a-button
                  type="primary"
                  size="small"
                  style="width: 90px; margin-right: 8px"
                  @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
                >
                  Search
                </a-button>
                <a-button
                  size="small"
                  style="width: 90px"
                  @click="handleReset(clearFilters, column.dataIndex)"
                >
                  Reset
                </a-button>
              </div>
            </div>
          </template>
          <template #bodyCell="{ text, column, record }">
            <span v-if="searchText && searchedColumn === column.dataIndex">
              <template
                v-for="(fragment, i) in text
                  .toString()
                  .split(
                    new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')
                  )"
              >
                <mark
                  v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                  :key="i"
                  class="highlight"
                >
                  {{ fragment }}
                </mark>
                <template v-else>{{ fragment }}</template>
              </template>
            </span>
            <template v-else-if="column.dataIndex === 'like'">
              <a @click="like(record.id)"
                ><v-icon
                  left
                  class="mr-2"
                  :color="record.like ? 'primary' : ''"
                >
                  mdi-cards-heart</v-icon
                ></a
              >
            </template>
          </template>
          <template #expandedRowRender="{ record }">
            <div
              v-for="paper in record.papers"
              v-bind:key="paper.id"
              style="margin: 0"
            >
              <a class="ml-8" @click="route('/papers/' + paper.id)">
                {{ paper.name }}
              </a>
            </div>
          </template>
        </a-table>
      </v-card-content>
    </v-card>
  </v-container>
</template>

<script>
import moment from "moment";
import { usePagination } from "vue-request";
import { computed, defineComponent, ref, reactive, toRefs } from "vue";
import { customerStore } from "../../stores/customerStore";
import { PAPER_TYPE, PRICE_UNIT } from "../../constant/constant";

export default {
  data: () => ({
    columns: [
      {
        title: "顾客名",
        dataIndex: "name",
        customFilterDropdown: true,
        onFilter: (value, record) =>
          record.name.toString().toLowerCase().includes(value.toLowerCase()),
      },
      {
        title: "地址",
        dataIndex: "address",
        customFilterDropdown: true,
        onFilter: (value, record) =>
          record.address.toString().toLowerCase().includes(value.toLowerCase()),
      },
      {
        title: "电话",
        dataIndex: "phone",
        customFilterDropdown: true,
        onFilter: (value, record) =>
          record.phone.toString().toLowerCase().includes(value.toLowerCase()),
      },
      {
        title: "纸编辑于",
        dataIndex: "updated_at",
        sorter: true,
      },
      {
        title: "操作",
        dataIndex: "like",
        sorter: (a, b) => a.like > b.like,
        defaultSortOrder: "descend",
      },
    ],
  }),
  setup() {
    // pagination
    const total = ref(0);

    const getCustomerWithPagination = (payload) =>
      customerStore()
        .getCustomerWithPagination(payload)
        .then((response) => {
          if (response.data.status == "ok" && response.data.data != null) {
            total.value = response.data.detail.total;
            response.data.data.forEach((value, index) => {
              value.updated_at = new moment(value.updated_at).format(
                "YYYY-MM-DD, hh:mm"
              );
            });
            return response;
          }
          return [];
        });

    const {
      data: customerData,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(getCustomerWithPagination, {
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
      if (dataIndex === "description") state.searchText = selectedKeys[0];
      state.searchedColumn = dataIndex;
    };

    const handleReset = (clearFilters, dataIndex) => {
      clearFilters({ confirm: true });
      if (dataIndex === "description") state.searchText = "";
    };

    return {
      customerData,
      pagination,
      loading,
      handleTableChange,
      handleSearch,
      handleReset,
      searchInput,
      ...toRefs(state),
      run
    };
  },
  computed: {},
  methods: {
    route(path) {
      this.$router.push(path);
    },
    like(id) {
      customerStore()
        .likeCustomer({ id: id })
        .then(() =>
          this.run({
            page: this.pagination.current,
            results: this.pagination.pageSize,
          })
        );
    },
  },
};
</script>
