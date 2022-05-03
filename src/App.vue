<template>
    <component :is="layout">
        <router-view />
    </component>
    <vToast ref="vToast" />
</template>

<script>
import vToast from "./components/vToast.vue";

const default_layout = "default";

export default {
    name: "App",
    components: {
        vToast,
    },
    mounted() {
        this.$root.vToast = this.$refs.vToast;
    },
    beforeMount() {
        this.$http.interceptors.response.use(
            (response) => {
                if (response.data.showToast) {
                    this.vToast.show({
                        message: response.data.showToast.message,
                        color: response.data.showToast.color,
                        timer: response.data.showToast.timer,
                        icon: response.data.showToast.icon,
                    });
                }
                return response;
            },
            (err) => {
                console.log(err);
                this.vToast.show({
                    message:
                        "出现错误请通知工具人<br/>" +
                        err.response.status +
                        ":" +
                        err.response.data.message,
                    icon: "mdi-alert-octagon-outline",
                });
                return Promise.reject(err);
            }
        );
    },
    computed: {
        layout() {
            return (this.$route.meta.layout || default_layout) + "-layout";
        },
    },

    data: () => ({
        //
    }),
};
</script>
