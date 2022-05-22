<template>
  <v-container>
    <v-card class="px-8 py-4 my-4 d-flex align-center">
      <v-card-content>
        <v-file-input
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          chips
          multiple
          label="上传文件（可多）"
          @update:modelValue="onChange"
        ></v-file-input>
        {{ this.file }}
      </v-card-content>
    </v-card>
    <v-card class="px-8 py-4 my-4 d-flex align-center">
      <v-card-content>
        <h3>Import XLSX</h3>
        <div></div>
      </v-card-content>
    </v-card>
  </v-container>
</template>

<script>
import { computed, defineComponent, ref, reactive, toRefs } from "vue";
import * as XLSX from 'xlsx';

export default {
  data: () => ({
    file: null,
  }),
  methods: {
    async onChange(files) {
      this.file = files ? files[0] : null;
      const data = await this.file.arrayBuffer();
      /* data is an ArrayBuffer */
      const workbook = XLSX.read(data);
      
      console.log(workbook)
    },
  },
};
</script>
