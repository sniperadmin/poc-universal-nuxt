<script lang="ts" setup>
defineEmits(['input', 'update:modelValue'])
const handleUpdateMenu = (open: boolean) => {
  if (open) {
    setTimeout(
      () => window.dispatchEvent(new Event('resize')),
      100
    )
  }
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ESelect',
  props: {
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
    itemText: {
      type: String,
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
  },
  emits: ['update:modelValue'],
  computed: {
    reactiveModelValue: {
      get () {
        return this.modelValue
      },
      set (value: any) {
        this.$emit('update:modelValue', value)
      }
    }
  }
})
</script>

<template>
  <v-select
    v-bind="$props"
    :id="id"
    :model-value="reactiveModelValue"
    :eager="true"
    density="compact"
    :item-value="itemValue"
    :item-text="itemText"
    @update:menu="handleUpdateMenu"
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
