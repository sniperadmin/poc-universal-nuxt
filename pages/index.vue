<script setup lang="ts">
import ETextField from '@/components/ETextField/Index.vue'
import { useSnackbarStore } from '@/store/snackbar'

const text = ref('');
// const showPass = ref(false);
const type = ref('password');
const show = ref(true)
const selected = ref('California')
const { addSnackbar } = useSnackbarStore()
</script>

<template>
  <v-card width="50%">
    <v-card-text>
      <e-text-field
        v-if="show"
        v-model="text"
        label="password field"
        :label="$t('auth.form.name.label')"
        counter
        :counter-value="v => v.trim().split(' ').length"
        :rules="['required', 'alpha', 'fullNameMinChars']"
      />

      <e-select
        v-model="selected"
        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
        label="select"
      />
    </v-card-text>
    <v-card-actions>
      <v-btn @click="addSnackbar({ text: 'some message' })">add from pinia</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>
