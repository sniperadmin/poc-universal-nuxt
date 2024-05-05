// vitest.config.mts
import { fileURLToPath, URL } from "url";
import { defineVitestConfig } from "file:///C:/Users/Nasr/Desktop/poc-universal-nuxt/node_modules/@nuxt/test-utils/dist/config.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/Nasr/Desktop/poc-universal-nuxt/vitest.config.mts";
var vitest_config_default = defineVitestConfig({
  plugins: [],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", __vite_injected_original_import_meta_url)),
      "~": fileURLToPath(new URL("./", __vite_injected_original_import_meta_url))
      // '#components': fileURLToPath(new URL('./.nuxt/components', import.meta.url))
    }
  },
  test: {
    environment: "nuxt",
    // you can optionally set Nuxt-specific environment options
    // environmentOptions: {
    //   nuxt: {
    //     rootDir: fileURLToPath(new URL('./playground', import.meta.url)),
    //     domEnvironment: 'happy-dom', // 'happy-dom' (default) or 'jsdom'
    //     overrides: {
    //       // other Nuxt config you want to pass
    //     }
    //   }
    // }
    globals: true,
    css: true,
    silent: true,
    coverage: {
      enabled: true,
      provider: "istanbul",
      reporter: ["text", "json", "html"]
    },
    server: {
      deps: {
        inline: ["vuetify"]
      }
    },
    setupFiles: [
      "./vitest.setup.ts"
      // '@vitest/web-worker'
    ]
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy5tdHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxOYXNyXFxcXERlc2t0b3BcXFxccG9jLXVuaXZlcnNhbC1udXh0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxOYXNyXFxcXERlc2t0b3BcXFxccG9jLXVuaXZlcnNhbC1udXh0XFxcXHZpdGVzdC5jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9OYXNyL0Rlc2t0b3AvcG9jLXVuaXZlcnNhbC1udXh0L3ZpdGVzdC5jb25maWcubXRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAndXJsJ1xyXG5pbXBvcnQgeyBkZWZpbmVWaXRlc3RDb25maWcgfSBmcm9tICdAbnV4dC90ZXN0LXV0aWxzL2NvbmZpZydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZVZpdGVzdENvbmZpZyh7XHJcbiAgcGx1Z2luczogW10sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgICd+JzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuLycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAvLyAnI2NvbXBvbmVudHMnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vLm51eHQvY29tcG9uZW50cycsIGltcG9ydC5tZXRhLnVybCkpXHJcbiAgICB9XHJcbiAgfSxcclxuICB0ZXN0OiB7XHJcbiAgICBlbnZpcm9ubWVudDogJ251eHQnLFxyXG4gICAgLy8geW91IGNhbiBvcHRpb25hbGx5IHNldCBOdXh0LXNwZWNpZmljIGVudmlyb25tZW50IG9wdGlvbnNcclxuICAgIC8vIGVudmlyb25tZW50T3B0aW9uczoge1xyXG4gICAgLy8gICBudXh0OiB7XHJcbiAgICAvLyAgICAgcm9vdERpcjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3BsYXlncm91bmQnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgIC8vICAgICBkb21FbnZpcm9ubWVudDogJ2hhcHB5LWRvbScsIC8vICdoYXBweS1kb20nIChkZWZhdWx0KSBvciAnanNkb20nXHJcbiAgICAvLyAgICAgb3ZlcnJpZGVzOiB7XHJcbiAgICAvLyAgICAgICAvLyBvdGhlciBOdXh0IGNvbmZpZyB5b3Ugd2FudCB0byBwYXNzXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9XHJcbiAgICBnbG9iYWxzOiB0cnVlLFxyXG4gICAgY3NzOiB0cnVlLFxyXG4gICAgc2lsZW50OiB0cnVlLFxyXG4gICAgY292ZXJhZ2U6IHtcclxuICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgcHJvdmlkZXI6ICdpc3RhbmJ1bCcsXHJcbiAgICAgIHJlcG9ydGVyOiBbJ3RleHQnLCAnanNvbicsICdodG1sJ11cclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgZGVwczoge1xyXG4gICAgICAgIGlubGluZTogWyd2dWV0aWZ5J11cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNldHVwRmlsZXM6IFtcclxuICAgICAgJy4vdml0ZXN0LnNldHVwLnRzJ1xyXG4gICAgICAvLyAnQHZpdGVzdC93ZWItd29ya2VyJ1xyXG4gICAgXVxyXG4gIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwVCxTQUFTLGVBQWUsV0FBVztBQUM3VixTQUFTLDBCQUEwQjtBQURpSyxJQUFNLDJDQUEyQztBQUdyUCxJQUFPLHdCQUFRLG1CQUFtQjtBQUFBLEVBQ2hDLFNBQVMsQ0FBQztBQUFBLEVBQ1YsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxNQUFNLHdDQUFlLENBQUM7QUFBQSxNQUNqRCxLQUFLLGNBQWMsSUFBSSxJQUFJLE1BQU0sd0NBQWUsQ0FBQztBQUFBO0FBQUEsSUFFbkQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixhQUFhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQVdiLFNBQVM7QUFBQSxJQUNULEtBQUs7QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFVBQVU7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLFVBQVUsQ0FBQyxRQUFRLFFBQVEsTUFBTTtBQUFBLElBQ25DO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsUUFDSixRQUFRLENBQUMsU0FBUztBQUFBLE1BQ3BCO0FBQUEsSUFDRjtBQUFBLElBQ0EsWUFBWTtBQUFBLE1BQ1Y7QUFBQTtBQUFBLElBRUY7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
