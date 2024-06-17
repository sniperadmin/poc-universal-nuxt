<script lang="ts" setup>
import ETextField from '@/components/ETextField/Index.vue'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['auth', 'update:modelValue', 'input'])
const props = defineProps({
  modelValue: {
    type: String,
      required: true,
  },
  isRegister: {
    type: Boolean,
      required: true,
  },
  disabled: { type: Boolean, default: false }
})

const svgTest = `
  <svg data-test="question" style="width:15px;height:15px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
  </svg>
`

const checkHTML = computed(() => {
  return (message: any) => /<\/?[a-z][\s\S]*>/i.test(message)
})

const reactivePassword = computed({
  get: () => props.modelValue,
  set: (newVal) => emit('update:modelValue', newVal)
})

const { t } = useI18n()
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'EAuthPassword'
})
</script>

<template>
  <e-text-field
    id="password"
    v-model="reactivePassword"
    data-test="password"
    type="password"
    autocomplete="new-password"
    :hint="isRegister ?  t('auth.form.password.hint.register', { icon: svgTest }) : t('auth.form.password.hint.login', { openTag: `<a href='/auth/reset-password' target='_blank'>`, closeTag: '</a>' })"
    persistent-hint
    loading
    :label="t('auth.form.password.label')"
    :rules="isRegister ? [
      'required',
      'hasLowercase',
      'hasUppercase',
      'hasNumber',
      'hasSpecial',
      'minchars'
    ] : ['required']"
    :disabled="disabled"
    @keyup.enter="$emit('auth', $event)"
    @input="$emit('input', $event)"
  >
    <template #message="{ message }">
<!--                TODO: work on tooltips later -->
      <v-tooltip
        v-if="isRegister"
        data-test="password-tips"
        right
      >
        <template #activator="{ on, attrs }">
          <span
            v-if="checkHTML(message)"
            v-bind="attrs"
            v-on="on"
            v-html="message"
          />
          <span v-else>
            {{ t(message) }}
          </span>
        </template>

        <span>{{ $t('auth.form.password.guides.title') }}</span>
        <ul>
          <li>{{ $t('auth.form.password.guides.one') }}</li>
          <li>{{ $t('auth.form.password.guides.two') }}</li>
          <li>{{ $t('auth.form.password.guides.three') }}</li>
          <li>{{ $t('auth.form.password.guides.four') }}</li>
        </ul>
      </v-tooltip>

      <div
        v-else
      >
        <span
          v-if="checkHTML(message)"
          v-html="message"
        />
        <span v-else>{{ t(message) }}</span>
      </div>
    </template>
  </e-text-field>
</template>

<style scoped>

</style>
