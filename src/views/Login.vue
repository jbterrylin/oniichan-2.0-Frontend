<template>
  <div class="container-sm mx-auto vh-100 row col-6">
    <div class="my-auto">
      <form>
        <img
          class="rounded mx-auto d-block mb-5"
          max-height="240"
          max-width="240"
          src="@/assets/images/fanlimao.png"
        />
        <div class="form-floating mb-3">
          <input
            v-model="username"
            type="text"
            class="form-control"
            color="primary"
            id="floatingInput1"
            placeholder="Username"
          />
          <label for="floatingInput1">用户名</label>
        </div>
        <div class="input-group mb-3">
          <div class="form-floating flex-grow-1">
            <input
              v-model="password"
              :type="show ? 'text' : 'password'"
              class="form-control"
              color="primary"
              id="floatingInput2"
              placeholder="Username"
            />
            <label for="floatingInput2">密码</label>
          </div>
          <span class="input-group-text bg-primary"
            ><font-awesome-icon
              @click="show = !show"
              :icon="show ? 'eye' : 'eye-slash'"
              fixed-width
              class="text-white"
          /></span>
        </div>
        <div v-if="isError" class="alert alert-danger" role="alert">
          用户名或密码错误
        </div>
        <button type="button" class="btn btn-primary btn-lg" @click="submit">
          submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, maxLength } from "@vuelidate/validators";
import axios from "axios";

export default {
  validations: {
    username: { required, maxLength: maxLength(6) },
    password: { required },
  },

  data: () => ({
    username: "",
    password: "",
    show: false,
    isError: false,
  }),

  computed: {},

  methods: {
    submit() {
      axios
        .post(`/login`, {
          name: this.username,
          password: this.password,
          isLogin: true,
        })
        .then((response) => {
          console.log(response);
          if (response.data.status == "ok") {
            console.log("hi111");
            this.$router.push("/home");
          }
        })
        .catch((error) => {
          this.isError = true;
          console.log(error);
        });
    },
    clear() {
      this.$v.$reset();
      this.username = "";
      this.password = "";
    },
  },
};
</script>
