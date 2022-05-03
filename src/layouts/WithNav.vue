<template>
  <v-layout style="height: 100wh">
    <v-card>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
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

        <v-list density="compact" v-for="item in items" :key="item.title" nav>
          <v-list-item
            :prepend-icon="item.icon"
            :title="item.title"
            value="home"
            @click="route(item.path)"
          />
        </v-list>
      </v-navigation-drawer>
    </v-card>

    <v-main class="grey lighten-5">
      <slot />
    </v-main>
  </v-layout>
</template>

<script>
import { mapWritableState } from 'pinia';
import { userStore } from "../stores/userStore";
import {ref} from 'vue';

export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "单", icon: "mdi-receipt", path: "paper" },
        { title: "产品", icon: "mdi-cart", path: "item" },
        { title: "本店资料", icon: "mdi-store", path: "shop" },
        { title: "账户", icon: "mdi-account", path: "account" },
      ],
      rail: true,
    };
  },
  setup() {
    const user = ref(userStore().user)

    return { user }
  },
  methods: {
    route(path) {
      this.$router.push(path);
    },
  },
};
</script>
