<template>
    <v-layout class="min-vw-100">
        <!-- v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false" -->
        <v-navigation-drawer
            expand-on-hover
            rail
        >
            <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
                :title="this.user.name"
            >
                <template v-slot:append>
                    <v-btn
                        variant="text"
                        icon="mdi-chevron-left"
                        @click.stop="rail = !rail"
                    ></v-btn>
                </template>
            </v-list-item>

            <v-divider></v-divider>

            <v-list
                density="compact"
                v-for="item in items"
                :key="item.title"
                nav
            >
                <v-list-item
                    :prepend-icon="item.icon"
                    :title="item.title"
                    :value="item.title"
                    @click="route(item.path)"
                />
            </v-list>

            <template v-slot:append>
                <v-list density="compact" nav>
                    <v-list-item
                        prepend-icon="mdi-logout"
                        title="登出"
                        value="home"
                        @click="logout"
                    />
                </v-list>
            </template>
        </v-navigation-drawer>

        <v-main style="height: 100wh">
            <slot />
        </v-main>
    </v-layout>
</template>

<script>
import { mapWritableState } from "pinia";
import { userStore } from "../stores/userStore";
import { ref } from "vue";

export default {
    data() {
        return {
            drawer: true,
            items: [
                { title: "单", icon: "mdi-receipt", path: "/papers" },
                { title: "本店资料", icon: "mdi-store", path: "/shop" },
                { title: "产品", icon: "mdi-cart", path: "/items" },
                {
                    title: "顾客",
                    icon: "mdi-account-multiple",
                    path: "/customers",
                },
                { title: "账户", icon: "mdi-account", path: "/account" },
            ],
            rail: true,
        };
    },
    setup() {
        const user = ref(userStore().user);

        return { user };
    },
    methods: {
        route(path) {
            this.rail = !this.rail;
            this.$router.push({ path: path });
        },
        logout() {
            localStorage.removeItem("token");
            this.$router.push({ path: "/" });
        },
    },
};
</script>
