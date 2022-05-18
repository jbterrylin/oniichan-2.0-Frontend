<template>
    <v-container>
        <form>
            <v-row class="mb-6" justify="center" no-gutters>
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
            <v-btn color="primary" rounded="lg" size="x-large" @click="submit">
                submit
            </v-btn>
        </form>
    </v-container>
</template>

<script>
import { required, maxLength } from "@vuelidate/validators";
import { userStore } from "../stores/userStore";

export default {
    validations: {
        username: { required, maxLength: maxLength(6) },
        password: { required },
    },
    data: () => ({
        username: "",
        password: "",
        show: false,
    }),
    computed: {},
    methods: {
        submit() {
            userStore()
                .login({
                    name: this.username,
                    password: this.password,
                })
                .then((response) => {
                    if (response.status == "ok") {
                        this.$router.push("/home");
                    }
                });
        },
    },
};
</script>
