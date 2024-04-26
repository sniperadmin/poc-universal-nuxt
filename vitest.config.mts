import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'

import vuetify from 'vite-plugin-vuetify'
import Components from 'unplugin-vue-components/vite'
// import AutoImport from 'unplugin-auto-import/vite'
// import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

export default {
  plugins: [
    vue(
      {
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('e-'),
        }
      }
    }
    ),
    tsconfigPaths(),
    vuetify(),
    Components({
      dirs: ['~/components'],
      directoryAsNamespace: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.stories\.ts$/, /\.[tj]s$/]
    }),
    // AutoImport({
    //   include: [/\.vue$/, /\.vue\?vue/, /\.stories\.ts$/, /\.[tj]s$/],
    //   imports: ['vue', 'vue-router'],
    //   dirs: ['~/components'],
    //   vueTemplate: true
    // }),
    // VueI18nPlugin({
    //   globalSFCScope: false,
    //   fullInstall: false,
    //   runtimeOnly: false,
    //   useVueI18nImportName: true,
    //   allowDynamic: true,
    //   forceStringify: false,
    //   include: fileURLToPath(new URL('./locales/**', import.meta.url)) // provide a path to the folder where you'll store translation data (see below)
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
      '~': fileURLToPath(new URL('./', import.meta.url)),
      // '#components': fileURLToPath(new URL('./.nuxt/components', import.meta.url))
    }
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    css: true,
    silent: true,
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['text', 'json', 'html']
    },
    server: {
      deps: {
        inline: ['vuetify']
      }
    }
    // setupFiles: ['@vitest/web-worker']
  }
}
