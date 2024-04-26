import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { VBtn } from 'vuetify/components/VBtn'
import { Intersect } from 'vuetify/directives'
// @ts-ignore
import colors from 'vuetify/lib/util/colors.mjs'
// import { IconProps, IconSet } from 'vuetify/dist/vuetify-labs'
// import EIconGoogle from '~/components/icons/EIconGoogle/Index.vue'

// const customSVGs: any = {
//   EIconGoogle
// }
// const custom: IconSet = {
//   component: (props: IconProps) => h(props.tag, [h(customSVGs[props.icon])])
// }

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    aliases: { VBtnPrimary: VBtn },
    directives: [Intersect],
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
        // custom
      }
    },
    theme: {
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

  nuxtApp.vueApp.use(vuetify)
})
