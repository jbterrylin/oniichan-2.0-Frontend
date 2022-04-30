<template>
    <navbar
        :content= "content"
    />
    
    <v-container>
    </v-container>
</template>

<script>
import axios from "axios";
import navbar from "../components/Navbar.vue"
export default {
  components: {
    'navbar': navbar,
  },
  data: () => ({
    items: [
      { title: 'Papers', icon: 'mdi-receipt' },
      { title: 'Shop', icon: 'mdi-store' },
      { title: 'Items', icon: 'mdi-cart' },
    ],
  })
};
</script>