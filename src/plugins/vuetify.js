// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";
import colors from "vuetify/lib/util/colors";

const myCustomLightTheme = {
    dark: false,
    colors: {
        background: "#FFFFFF",
        surface: "#FFFFFF",
        // "surface-variant": "#6200EE",
        // "on-surface-variant": "#6200EE",
        primary: "#6200EE",
        "primary-darken-1": "#3700B3",
        secondary: "#03DAC6",
        "secondary-darken-1": "#018786",
        error: "#B00020",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00",
    },
};

export default createVuetify({
    // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides{}
    // colors: {
    //   primary: colors.cyan.base,
    //   // secondary: "#607D8B",
    //   secondary: "FFFFFF",
    //   accent: colors.lime.base,
    //   error: colors.red.base,
    //   warning: colors.orange.base,
    //   info: "#03A9F4",
    //   success: colors.green.base
    //   }
    theme: {
        defaultTheme: "myCustomLightTheme",
        themes: {
            myCustomLightTheme,
        },
    },
});

// colors: {
//   background: '#FFFFFF',
//   surface: '#FFFFFF',
//   'surface-variant': '#424242',
//   'on-surface-variant': '#EEEEEE',
//   primary: '#6200EE',
//   'primary-darken-1': '#3700B3',
//   secondary: '#03DAC6',
//   'secondary-darken-1': '#018786',
//   error: '#B00020',
//   info: '#2196F3',
//   success: '#4CAF50',
//   warning: '#FB8C00'
// },
