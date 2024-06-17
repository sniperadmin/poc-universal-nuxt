// @ts-ignore
import colors from 'vuetify/lib/util/colors.mjs'
// vuetify.config.ts
import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'

export default defineVuetifyConfiguration({
  /* vuetify options */
    directives: [],
    icons: {
      defaultSet: 'mdi-svg'
    },
    theme: {
      defaultTheme: 'dark',
      themes: {
        light: {
          dark: true,
          colors: {
            /**
             * use primary darken-1 for luminescent-green-800
             * use primary lighten-2 for luminescent-green-400
             * use primary-50 for luminescent-green-50
             * use primary-100 for luminescent-green-100
             */
            primary: '#77A11D',
            'primary-20': '#ACCD53',
            'primary-50': '#F4F8E7',
            'primary-100': '#e3edc3',
            accent: colors.grey.darken3,
            secondary: '#C76758',
            info: '#4AA1B3',
            warning: '#F89A35',
            error: '#DA756C',
            success: colors.green.accent3
          }
        },
        dark: {
          dark: true,
          colors: {
            primary: '#77A11D',
            'primary-20': '#ACCD53',
            'primary-50': '#F4F8E7',
            'primary-100': '#e3edc3',
            accent: colors.grey.darken3,
            secondary: '#C76758',
            info: '#4AA1B3',
            warning: colors.amber.base,
            error: '#DA756C',
            success: colors.green.accent3
          }
        }
      }
    }
})
