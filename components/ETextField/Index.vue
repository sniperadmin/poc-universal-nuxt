<script lang="ts" setup>
import { useGetProgress } from '@/composables/input/input-progress'
import { useRules } from '@/composables/input/rules'
import { mdiEye, mdiEyeOff } from '@mdi/js'

const { t } = useI18n()
//  Component Props
const props = defineProps({
  id: {
    type: String,
    default: 'test'
  },
  hint: { type: String as () => any, default: undefined },
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
    default: 'text'
  },
  autoFocus: {
    type: Boolean,
    default: false
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
  counterValue: { type: Function, default: undefined },
  disabled: { type: Boolean, default: false }
})
//  HTML string checker
const checkHTML = computed(() => {
  return (message: any) => /<\/?[a-z][\s\S]*>/i.test(message)
})
//  Emits
defineEmits(['update:modelValue'])
//  Password Icon functionality
const showPass = ref<boolean>(false)
//  Input rules
const { handleRules } = useRules()
//  Input Progress
const progress = ref(0)
const { getProgress } = useGetProgress()
const initProgress = async (inputRef: any, rules: string[]) => await getProgress(inputRef, rules, progress)
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ETextField'
})
</script>

<template>
  <v-text-field
    :id="id"
    :ref="id"
    :model-value="modelValue"
    :append-inner-icon="type === 'password' ? showPass ? mdiEye : mdiEyeOff : appendIcon"
    :type="showPass ? 'text' : type"
    :flat="true"
    :hint="hint"
    :auto-focus="autoFocus"
    :persistent-hint="persistentHint"
    :title="id"
    :loading="loading"
    :rules="handleRules(rules)"
    :max-errors="rules.length"
    :disabled="disabled"
    density="compact"
    variant="outlined"
    @input="$emit('update:modelValue', $event.target.value)"
    @keyup="type === 'password' ? initProgress($refs[id], rules) : false"
    @click:append-inner="showPass = !showPass"
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

    <template #message="{message}">
      <span
        v-if="checkHTML(message)"
        v-html="message"
      />
      <span v-else>
        {{ t(message) }}
      </span>
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
        class="text-capitalize text-caption font-weight-bold"
        v-text="label"
      />
    </template>

    <template
      v-if="type === 'password'"
      #loader
    >
      <v-progress-linear
        :model-value="progress"
        :color="progress === 100 ? 'primary' : progress < 50 ? 'error' : progress < 70 ? 'orange' : 'warning'"
        height="4"
      />
    </template>
  </v-text-field>
</template>

<style scoped>

</style>
