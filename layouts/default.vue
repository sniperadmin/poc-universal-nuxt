<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DefaultLayout'
})
</script>

<script setup lang="ts">
import TheSnackbar from '@/features/confirm/TheSnackbar/Index.vue'

const { locale } = useI18n()
</script>

<template>
  <v-app>
    <molecules-e-nav />
        <v-main>
          <v-locale-provider :rtl="locale === 'ar'">
            <the-snackbar />
            <slot />
          </v-locale-provider>
        </v-main>
  </v-app>
</template>

<style scoped>

</style>
