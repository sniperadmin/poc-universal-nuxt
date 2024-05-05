<script lang="ts" setup>
import { useDisplay } from 'vuetify'

const { t } = useI18n()
const { mobile } = useDisplay()

defineProps({
  isRegister: {
    type: Boolean,
      required: true
  },
  isEditor: {
    type: Boolean,
      required: true
  }
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'EAuthTitle'
})
</script>

<template>
  <v-card-title
    data-test="auth-title"
    class="font-weight-bold text-capitalize"
    :class="mobile ? 'text-subtitle-1' : 'text-h5'"
  >
    <p
      v-if="isRegister"
      class="mx-auto text-break text-center"
    >
      {{
        t('auth.title', {
          status: t('auth.status.signup'),
          persona: isEditor ? t('auth.personas.editor') : t('auth.personas.user')
        })
      }}
    </p>

    <p
      v-else
      class="mx-auto text-break text-center"
    >
      {{ t('auth.title', { status: t('auth.status.login'), persona: isEditor ? t('auth.personas.editor') : t('auth.personas.user') }) }}
    </p>
  </v-card-title>
</template>

<style scoped>

</style>
