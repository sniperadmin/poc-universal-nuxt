<script setup lang="ts">
import { EAuth } from '@/features/authentication'

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/protected/home'
  }
})
</script>

<template>
  <v-row justify="center">
    <v-col cols="6">
      <e-auth class="mx-auto" :is-editor="false" :is-register="false" />
      <v-row class="my-3" justify="center" align="end">
        <span class="mx-2">{{ $t('auth.new') }}</span>
        <e-btn
          variant="text"
          color="primary"
          :text="$t('auth.signup-here')"
          @click="navigateTo('/auth/signup')"
        />
      </v-row>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
