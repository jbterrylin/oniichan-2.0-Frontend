<template>
    <div class="container-fluid">
            <!-- <listTable
                :columns="columns"
                :data="shops"
                tableName="店列表"
                v-on:addLink="addLink()"
                v-on:editLink="editLink($event)"
            /> -->
    </div>
</template>

<script>
import axios from "axios";
// import listTable from "../../components/listTable.vue"

export default {
    components: {
        // listTable: listTable,
    },
    methods: {
        addLink(event) {
            Turbolinks.visit(Routes.new_shop_path());
        },
        editLink(event) {
            Turbolinks.visit(Routes.edit_shop_path(event));
        },
    },
};
</script>