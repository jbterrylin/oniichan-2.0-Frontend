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
          title="John Leider"
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
export default {
  props: ["content"],
  data() {
    return {
      drawer: true,
      items: [
        { title: "Papers", icon: "mdi-receipt", path: "paper" },
        { title: "Items", icon: "mdi-cart", path: "item" },
        { title: "Shop", icon: "mdi-store", path: "shop" },
        { title: "Account", icon: "mdi-account", path: "account" },
      ],
      rail: true,
    };
  },
  methods: {
    route(path) {
      this.$router.push(path);
    },
  },
};
</script>
