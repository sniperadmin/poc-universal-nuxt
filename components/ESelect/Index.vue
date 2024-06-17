<script lang="ts" setup>
const emit = defineEmits(['input', 'update:modelValue'])
const props = defineProps({
    modelValue: {
      type: [Object, String, Array, Number],
      required: true
    },
    items: {
      type: Array,
      default: () => []
    },
    rules: {
      type: Array as () => Array<string>,
      default: () => []
    },
    id: {
      type: String,
      default: 'select'
    },
    itemValue: {
      type: String as () => any,
      default: undefined
    },
    itemTitle: {
      type: String as () => any,
      default: undefined
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    menuProps: {
      type: Object,
      default: () => ({})
    },
    multiple: {
      type: Boolean,
      default: false
    }
  })
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ESelect'
})
</script>

<template>
  <v-select
    v-bind="$props"
    :id="id"
    :model-value="modelValue"
    :eager="true"
    density="compact"
    :item-value="itemValue"
    :item-title="itemTitle"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <template
      v-for="(_, inputSlot) in $slots"
      #[inputSlot]="slotScope"
    >
      <slot
        :name="inputSlot"
        v-bind="{ ...slotScope }"
      />
    </template>

    <template #label="{label}">
      <span
        v-if="rules.includes('required')"
        data-test="select-asterisk"
        class="red--text"
        v-text="'* '"
      />
      <span
        data-test="select-label"
        class="text-capitalize text-caption font-weight-bold"
        v-text="label"
      />
    </template>
  </v-select>
</template>

<style scoped>

</style>
