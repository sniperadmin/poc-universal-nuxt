<script setup lang="ts">
import ETextField from '@/components/ETextField/Index.vue'

const text = ref('');
// const showPass = ref(false);
const type = ref('password');
const show = ref(true)
const selected = ref('California')

const { state, send } = useMachine(authformMachine, {
  services: {
    submitForm: () => {
      //  Here you can call the composables you want
      return new Promise((resolve, reject) => setTimeout(() => reject(true), 1500))
    }
  }
})
</script>

<template>
  <v-card width="50%">
    <v-card-text>
      <h1>Current state: {{ state.value }}</h1>
      <button @click="send('SUBMIT')">
        CLICK
      </button>
    </v-card-text>
  </v-card>
  <v-card width="50%">
    <v-card-text>
      <e-text-field
        v-model="text"
        v-if="show"
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
  </v-card>
</template>

<style scoped>

</style>
