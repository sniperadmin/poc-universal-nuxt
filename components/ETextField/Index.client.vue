<script lang="ts" setup>
import { mdiEye, mdiEyeOff } from '@mdi/js'
// import { useGetProgress } from '~/composables/input-progress'
// const { getProgress } = useGetProgress()

import { useRules } from '~/composables/input/rules'
const { handleRules } = useRules()

defineEmits(['update:modelValue'])
//  TODO: add the following to the text field
// @keyup="type === 'password' ? initProgress($refs[id], rules) : false"
// TODO: Enable the following when vuetify update the validate function for refs
// const progress = ref(0)
// const initProgress = async (inputRef: any, rules: string[]) => await getProgress(inputRef, rules, progress)
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ETextField',

  props: {
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
      default: 'text'
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
  },

  data: () => ({
    showPass: false
  })
})
</script>

<template>
  <v-text-field
    v-bind="$props"
    :id="id"
    :ref="id"
    :model-value="modelValue"
    :append-inner-icon="type === 'password' ? `svg:${type === 'password' ? showPass ? mdiEye : mdiEyeOff : appendIcon}` : undefined"
    density="compact"
    :type="showPass ? 'text' : type"
    :flat="true"
    :title="id"
    variant="outlined"
    :rules="handleRules(rules)"
    @input="$emit('update:modelValue', $event.target.value)"
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
        v-for="(_rule, index) in rules"
        :key="index"
        :model-value="progress"
        :color="progress === 100 ? 'primary' : progress < 50 ? 'error' : progress < 70 ? 'orange' : 'warning'"
        :absolute="true"
        height="5"
        style="margin-top: 5px;"
      />
    </template>
  </v-text-field>
</template>

<style scoped>

</style>
