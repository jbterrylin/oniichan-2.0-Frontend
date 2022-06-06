<template>
  <div class="waterfall-container">
    <v-card
      variant="outlined"
      color="primary"
      class="item"
      v-for="(words, index) in wordList"
      :key="index"
      style="minheight: 140px"
    >
      <v-card-title> {{ words[0] }} </v-card-title>
      <v-card-text class="pb-0"
        ><v-list-item class="p-0">
          <v-list-item-header>
            <v-list-item-title v-for="(word, index1) in words[1]" :key="index1"
              ><v-row no-gutters>
                <v-col @click="copyURL('word.en')">
                  {{ word.en }}
                </v-col>
                <v-col
                  v-if="type != WORD_FILTER.CAT"
                  @click="copyURL('word.cn')"
                >
                  {{ word.cn }}
                </v-col>
                <v-col @click="copyURL('abc')">
                  <div class="float-right d-inline-block">
                    {{ type != WORD_FILTER.CAT ? word.category : word.cn }}
                  </div>
                </v-col></v-row
              ></v-list-item-title
            >
          </v-list-item-header>
        </v-list-item></v-card-text
      >
    </v-card>
    <v-card
      variant="outlined"
      color="primary"
      class="item"
      style="minheight: 140px"
    >
      <v-card-title> 分类 </v-card-title>
      <v-card-content>
        <v-card-text class="text-center p-0">
          <v-btn-toggle
            v-model="type"
            variant="outlined"
            divided
            rounded="xl"
            mandatory
            color="primary"
            @update:modelValue="updateType(a)"
          >
            <v-btn :value="WORD_FILTER.CN"> 中文 </v-btn>
            <v-btn :value="WORD_FILTER.EN"> 英文 </v-btn>
            <v-btn :value="WORD_FILTER.CAT"> 种类 </v-btn>
          </v-btn-toggle>
        </v-card-text>
      </v-card-content>
    </v-card>
  </div>
</template>

<script>
import { computed, defineComponent, ref, reactive, toRefs } from "vue";
import { wordStore } from "../stores/wordStore";
import { WORD_FILTER } from "../constant/constant";
import pinyin from "js-pinyin";

export default {
  data: () => ({
    alphabets: "abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""),
    WORD_FILTER: WORD_FILTER,
  }),
  setup() {
    const type = ref(WORD_FILTER.EN);

    const wordList = ref([]);

    const compareChinese = (a, b) => {
      return pinyin
        .getFullChars(a)
        .toUpperCase()
        .localeCompare(pinyin.getFullChars(b).toUpperCase());
    };

    const getUserWords = () =>
      wordStore()
        .getUserWords()
        .then((value) => {
          if (value.status == "ok") {
            wordList.value = value.data.reduce(function (r, a) {
              var filter_header = "";
              if (type.value == WORD_FILTER.EN) {
                filter_header = a.en[0].toUpperCase();
              } else if (type.value == WORD_FILTER.CN) {
                console.log(pinyin.getFullChars(a.cn));
                filter_header = pinyin.getFullChars(a.cn)[0];
              } else {
                filter_header = a.category;
              }
              r[filter_header] = r[filter_header] || [];
              r[filter_header].push(a);
              return r;
            }, Object.create(null));
            console.log(wordList.value);

            Object.entries(wordList.value).forEach((words) => {
              wordList.value[words[0]] = words[1]
                .sort((a, b) => a.en.localeCompare(b.en))
                .sort((a, b) =>
                  type.value == WORD_FILTER.CAT
                    ? 0
                    : compareChinese(a.category, b.category)
                );
            });

            wordList.value = Object.entries(wordList.value).sort((a, b) =>
              type.value == WORD_FILTER.CAT
                ? compareChinese(a[0], b[0])
                : a[0].localeCompare(b[0])
            );
          }
        });

    getUserWords();

    return {
      type,
      wordList,
      getUserWords,
    };
  },
  methods: {
    async copyURL(mytext) {
      try {
        await navigator.clipboard.writeText(mytext);
        alert("Copied");
      } catch ($e) {
        alert("Cannot copy");
      }
    },
    updateType() {
      this.getUserWords();
    },
  },
};
</script>

<style scoped>
.waterfall-container {
  display: flex;
  flex-flow: column wrap;
  /* align-content: space-between; */
  align-content: baseline;
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
