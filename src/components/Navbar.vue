<template>
  <v-layout style="height:100wh">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      style="height:100wh"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>John Leider</v-list-item-title>

        <!-- <v-btn
          icon
          @click.stop="mini = !mini"
        > -->
          <!-- <v-icon>mdi-chevron-left</v-icon> -->
        <!-- </v-btn> -->
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="route(item.path)"
          link
        >
          <v-list-item-icon>
            <!-- <v-icon>{{ item.icon }}</v-icon> -->
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <v-container class="grey lighten-5">
      <slot name="content">
      </slot>
    </v-container>
  </v-layout>
</template>

<script>
  export default {
    props: ['content'],
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Shop', icon: 'mdi-store', path: "Routes.shops_path()" },
          { title: 'Papers', icon: 'mdi-receipt', path: "Routes.papers_path()" },
          { title: 'Items', icon: 'mdi-cart', path: "Routes.shops_path()" },
          { title: 'Account', icon: 'mdi-account', path: "Routes.shops_path()" },
        ],
        mini: true,
      }
    },
    methods: {
      route(path) {
        Turbolinks.visit(path);
      }
    }
  }
</script>