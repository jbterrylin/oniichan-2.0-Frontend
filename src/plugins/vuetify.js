// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import colors from 'vuetify/lib/util/colors'

      

export default createVuetify({
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides{}
  colors: {
    primary: colors.cyan.base,
    secondary: "#607D8B",
    accent: colors.lime.base,
    error: colors.red.base,
    warning: colors.orange.base,
    info: "#03A9F4",
    success: colors.green.base
    }
})
