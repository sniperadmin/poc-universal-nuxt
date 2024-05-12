<script setup lang="ts">
import ETextField from '@/components/ETextField/Index.vue'
import { useSnackbarStore } from '@/store/snackbar'

const text = ref('');
// const showPass = ref(false);
const type = ref('password');
const show = ref(true)
const selected = ref('California')
const { addSnackbar, queue } = useSnackbarStore()
const { send, state } = useMachine(snackbarMachine)
</script>

<template>
  <v-card width="50%">
    <v-card-text>

      <e-select
        v-model="selected"
        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
        label="select"
      />
      <e-text-field
        v-model="text"
        label="text here"
        counter
      />
    </v-card-text>
    <v-card-actions>
      <v-btn @click="addSnackbar({ text }); text = ''">add from pinia</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>
