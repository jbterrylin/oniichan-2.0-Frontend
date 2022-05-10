<template>
    <v-card class="px-8 py-4 my-4">
        <v-card-title>创建新单</v-card-title>

        <v-card-content>
            <v-form>
                <v-text-field
                    v-model="data.name"
                    label="顾客姓名/公司名"
                    required
                    :rules="rules"
                    color="primary"
                />
                <v-textarea
                    v-model="data.address"
                    label="地址"
                    required
                    :rules="rules"
                    color="primary"
                />
                <v-text-field
                    v-model="data.phone"
                    label="顾客电话"
                    required
                    :rules="rules"
                    color="primary"
                />
            </v-form>
        </v-card-content>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        data: {
            name: "123",
            address: "456",
            phone: "7890",
        },
        rules: [(v) => !!v || "必填内容"],
    }),
};
</script>
