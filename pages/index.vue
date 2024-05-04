<script setup lang="ts">
import ETextField from '@/components/ETextField/Index.vue'

const text = ref('');
const showPass = ref(false);
const type = ref('password');
const show = ref(true)
</script>

<template>
  <v-card width="50%">
    <v-card-text>
      <e-text-field
        v-model="text"
        v-if="show"
        label="password field"
        :label="$t('auth.form.name.label')"
        counter
        hint="pass should be filled"
        persistent-hint
        :counter-value="v => v.trim().split(' ').length"
        :rules="['required', 'alpha', 'fullNameMinChars']"
      />
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
