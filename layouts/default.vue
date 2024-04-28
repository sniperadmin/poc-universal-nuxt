<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DefaultLayout'
})
</script>

<script setup lang="ts">
import TheSnackbarProvider from '@/features/confirm/TheSnackbarProvider/Index.vue'

const { locale } = useI18n()
</script>

<template>
  <v-app>
    <molecules-e-nav />

      <the-snackbar-provider>
        <v-main>
          <v-locale-provider :rtl="locale === 'ar'">
            <slot />
          </v-locale-provider>
        </v-main>
      </the-snackbar-provider>
  </v-app>
</template>

<style scoped>

</style>
