<template>
  <div class="waterfall-container">
    <v-card
      variant="outlined"
      color="primary"
      class="item"
      v-for="(alphabet, index) in alphabets"
      :key="index"
      style="minHeight: 140px"
    >
      <v-card-title> {{ alphabet }} </v-card-title>
      <v-card-text class="pb-0"
        ><v-list-item class="p-0">
          <v-list-item-header>
            <v-list-item-title
              ><div class="d-inline-block" @click="copyURL('abc')">
                {{ "abc" }}
              </div>
              <div class="float-right d-inline-block" @click="copyURL('abc')">
                {{ "abc" }}
              </div></v-list-item-title
            >
          </v-list-item-header>
        </v-list-item></v-card-text
      >
    </v-card>
    <v-card
      variant="outlined"
      color="primary"
      class="item"
      style="minHeight: 140px"
    >
      <v-card-title> 分类 </v-card-title>
      <v-card-text class="text-center p-0">
      <v-btn-toggle
        v-model="type"
        variant="outlined"
        divided
        rounded="xl"
        mandatory
        color="primary"
      >
        <v-btn value="cn"> 中文 </v-btn>
        <v-btn value="en"> 英文 </v-btn>
        <v-btn value="cat"> 种类 </v-btn>
      </v-btn-toggle>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { computed, defineComponent, ref, reactive, toRefs } from "vue";

// 种类，英文，拼音

// cupboard

export default {
  data: () => ({
    alphabets: "abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""),
    type: "en",
  }),
  methods: {
    async copyURL(mytext) {
      try {
        await navigator.clipboard.writeText(mytext);
        alert("Copied");
      } catch ($e) {
        alert("Cannot copy");
      }
    },
  },
};
</script>

<style scoped>
.waterfall-container {
  display: flex;
  flex-flow: column wrap;
  align-content: space-between;
  /* 容器必须有固定高度
   * 且高度大于最高的列高 */
  height: 100vh;
  column-gap: 16px;

  /* 非必须 */
  background-color: #f7f7f7;
  border-radius: 3px;
  padding: 20px;
  overflow-x: auto;
}

.item {
  width: 30%;
  /* 非必须 */
  position: relative;
  margin-bottom: 16px;
  border-radius: 3px;
  /* background-color: #a1cbfa;
  border: 1px solid #4290e2; */
  /* box-shadow: 0 2px 2px rgba(0,90,250,0.05),
    0 4px 4px rgba(0,90,250,0.05),
    0 8px 8px rgba(0,90,250,0.05),
    0 16px 16px rgba(0,90,250,0.05); */
  /* color: #fff; */
  padding: 15px;
  box-sizing: border-box;
}

/* 强制换列 */
.container::before,
.container::after {
  content: "";
  flex-basis: 100%;
  width: 0;
  order: 2;
}
h3 {
  text-align: center;
}
</style>
