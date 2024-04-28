<script lang="ts" setup>
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
</script>

<script lang="ts">
export default defineComponent({
  name: 'EAuthTitle',

  props: {
    isRegister: {
      type: Boolean,
      required: true
    },
    isEditor: {
      type: Boolean,
      required: true
    }
  }
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
        $t('auth.title', {
          status: $t('auth.status.create'),
          persona: isEditor ? $t('auth.personas.editor') : $t('auth.personas.journalist')
        })
      }}
    </p>

    <p
      v-else
      class="mx-auto text-break text-center"
    >
      {{ $t('auth.title', { status: $t('auth.status.login'), persona: isEditor ? $t('auth.personas.editor') : $t('auth.personas.journalist') }) }}
    </p>
  </v-card-title>
</template>

<style scoped>

</style>
