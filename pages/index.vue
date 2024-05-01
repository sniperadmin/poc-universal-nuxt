<script setup lang="ts">
import { ConfirmEventKey, createConfirm, injectStrict } from '@/utils/types'

const { show } = injectStrict(ConfirmEventKey)

const pass = ref('')
definePageMeta({
  auth: {
    unauthenticatedOnly: true
  }
})
</script>

<template>
  <h1>{{ $t('welcome.title') }}</h1>
  <h3>{{ $t('welcome.text') }}</h3>
  <v-btn class="mb-3" @click="show(createConfirm({ message: 'Yay! fired notification!', location: 'right' }))">
    fire snackbar notification
  </v-btn>

  <v-card width="50%">
    <v-card-text>
      <e-text-field
        v-model="pass"
        type="password"
        label="password"
        :rules="['required', 'minchars']"
      />
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
