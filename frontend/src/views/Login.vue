<template>
  <v-container>
    <form>
      <v-row
        class="mb-6"
        justify="center"
        no-gutters
      >
        <v-col md="auto">
          <img
            max-height="240"
            max-width="240" 
            src="@/assets/images/fanlimao.png"
          />
        </v-col>
      </v-row>
      <v-text-field
        v-model="username"
        label="用户名"
        variant="underlined"
        color="primary"
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="密码"
        variant="underlined"
        color="primary"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
      ></v-text-field>
      <v-alert
        v-if="isError"
        type="error"
      >
        用户名或密码错误
      </v-alert>
      <v-btn
        class="mr-4"
        @click="submit"
      >
        submit
      </v-btn>
    </form>
  </v-container>
</template>

<script>
  import { required, maxLength } from '@vuelidate/validators';
  import axios from "axios";

  export default {
    validations: {
      username: { required, maxLength: maxLength(6) },
      password: { required },
    },

    data: () => ({
      username: '',
      password: '',
      show: false,
      isError: false,
    }),

    computed: {
    },

    methods: {
      submit () {
        axios
          .post(`/login`, {
              name: this.username,
              password: this.password,
              isLogin: true
          })
          .then(response => {
            console.log(response)
            if (response.data.status == "ok") {
                console.log("hi");
                this.$router.push('/home');
            }
          })
          .catch(error => {
            this.isError = true;
            console.log(error);
        });
      },
      clear () {
        this.$v.$reset()
        this.username = ''
        this.password = ''
      },
    },
  }
</script>
