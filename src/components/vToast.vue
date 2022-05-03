<template>
    <v-snackbar
        :color="color"
        :timeout="timer"
        v-model="showSnackbar"
        bottom
        left
    >
        <div class="d-flex align-center justify-space-between">
            <div class="d-inline-flex">
                <v-icon
                    left
                    class="mr-2"
                    v-show="icon == 'mdi' ? false : true"
                    >{{ icon }}</v-icon
                >
                <div v-html="message"></div>
                <!-- <p>
          {{ message }}
        </p> -->
            </div>
            <v-btn variant="outlined" text @click="showSnackbar = false">
                Close
            </v-btn>
        </div>
    </v-snackbar>
</template>

<script>
export default {
    name: "vToast",
    data() {
        return {
            showSnackbar: false,
            message: "",
            color: "error",
            icon: "mdi-check",
            timer: 10000,
        };
    },
    methods: {
        show(data) {
            this.message = data.message || "奇怪 为什么没有error";
            this.color = data.color || "error";
            this.timer = data.timer || 20000;
            this.icon = data.icon || "";
            this.showSnackbar = true;
        },
    },
};
</script>
