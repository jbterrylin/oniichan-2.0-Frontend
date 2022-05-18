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
          :data-source="itemData"
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
              <div v-if="column.dataIndex == 'unit'" style="width: 188px">
                <a-slider
                  v-model:value="unit_range"
                  range
                  :max="unit_preRange[1]"
                  :min="unit_preRange[0]"
                  :step="1"
                  class="align-center"
                  thumb-size="8"
                  @change="(e) => setSelectedKeys(e ? [e] : [])"
                  @pressEnter="
                    handleSearch(selectedKeys, confirm, column.dataIndex)
                  "
                />
                <div class="mt-2">
                  <a-button
                    type="primary"
                    size="small"
                    style="
                      width: 90px;
                      margin-right: 8px;
                    "
                    @click="
                      handleSearch(selectedKeys, confirm, column.dataIndex)
                    "
                  >
                    Filter
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
              <div v-if="column.dataIndex == 'unit_price'" style="width: 188px">
                <a-slider
                  v-model:value="unit_price_range"
                  range
                  :max="unit_price_preRange[1]"
                  :min="unit_price_preRange[0]"
                  :step="100"
                  class="align-center"
                  thumb-size="8"
                  @change="(e) => setSelectedKeys(e ? [e] : [])"
                  @pressEnter="
                    handleSearch(selectedKeys, confirm, column.dataIndex)
                  "
                >
                </a-slider>
                <div class="mt-2">
                  <a-button
                    type="primary"
                    size="small"
                    style="
                      width: 90px;
                      margin-right: 8px;
                    "
                    @click="
                      handleSearch(selectedKeys, confirm, column.dataIndex)
                    "
                  >
                    Filter
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
              <div v-if="column.dataIndex == 'description'">
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
                  style="
                    width: 90px;
                    margin-right: 8px;
                  "
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
            <template v-if="column.dataIndex === 'papers_id'">
              <a class="" @click="route('/papers/' + record.papers_id)">{{ text }}</a>
            </template>
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
import { itemStore } from "../../stores/itemStore";
import { PAPER_TYPE, PRICE_UNIT } from "../../constant/constant";

export default {
  data: () => ({
    columns: [
      {
        title: "产品名",
        dataIndex: "description",
        customFilterDropdown: true,
        onFilter: (value, record) =>
          record.description
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
      },
      {
        title: "单价",
        dataIndex: "unit_price",
        sorter: true,
        customFilterDropdown: true,
        onFilter: (value, record) =>
          record.unit_price >= value[0] && record.unit_price <= value[1],
      },
      {
        title: "单位",
        dataIndex: "unit",
        sorter: true,
        customFilterDropdown: true,
        onFilter: (value, record) =>
          record.unit >= value[0] && record.unit <= value[1],
      },
      {
        title: "纸编号",
        dataIndex: "papers_id",
        sorter: true,
      },
      {
        title: "纸编辑于",
        dataIndex: "updated_at",
        sorter: true,
      },
    ],
  }),
  setup() {
    const unit_price_preRange = ref([0, 0]);
    const unit_price_range = ref([0, 0]);

    const unit_preRange = ref([0, 0]);
    const unit_range = ref([0, 0]);
    // pagination
    const total = ref(0);

    const getItemWithPagination = (payload) =>
      itemStore()
        .getItemWithPagination(payload)
        .then((response) => {
          if (response.data.status == "ok" && response.data.data != null) {
            total.value = response.data.detail.total;
            unit_price_preRange.value = [
              parseFloat(response.data.detail.unit_price[0]),
              parseFloat(response.data.detail.unit_price[1]),
            ];

            unit_preRange.value = [
              parseFloat(response.data.detail.unit[0]),
              parseFloat(response.data.detail.unit[1]),
            ];
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
      data: itemData,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(getItemWithPagination, {
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
      else if (dataIndex === "unit_price") unit_price_range.value = [0, 0];
      else if (dataIndex === "unit") unit_range.value = [0, 0];
    };

    return {
      itemData,
      unit_price_range,
      unit_price_preRange,
      unit_range,
      unit_preRange,
      pagination,
      loading,
      handleTableChange,
      handleSearch,
      handleReset,
      searchInput,
      ...toRefs(state),
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
