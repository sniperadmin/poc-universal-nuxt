<script lang="ts" setup>
defineEmits(['update:modelValue'])
defineProps({
  id: {
    type: String,
  default: 'test'
  },
  hint: { type: String, default: undefined },
  persistentHint: { type: Boolean, default: false },
  modelValue: {
    type: String,
  default: ''
  },
  rules: {
    type: Array as () => Array<string>,
  default: () => []
  },
  type: {
    type: String,
  default: 'textarea',
      validator: val => val === 'textarea'
  },
  loading: {
    type: Boolean,
  default: false
  },
  appendIcon: {
    type: String,
  default: ''
  },
  counter: { type: Boolean, default: false },
  counterValue: { type: Function, default: undefined }
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ETextarea'
})
</script>

<template>
  <v-textarea
    v-bind="$props"
    :id="id"
    :model-value="modelValue"
    flat
    :title="id"
    density="compact"
    variant="outlined"
    @input="$emit('update:modelValue', $event.target.value)"
  >
    <template
      v-for="(_, inputSlot) in $slots"
      #[inputSlot]="slotScope"
    >
      <slot
        :name="inputSlot"
        v-bind="slotScope"
      />
    </template>

    <template #label="{label}">
      <span
        v-if="rules.includes('required')"
        data-test="input-asterisk"
        class="red--text"
        v-text="'* '"
      />
      <span
        data-test="input-label"
        v-text="label"
      />
    </template>
  </v-textarea>
</template>

<style scoped>

</style>
