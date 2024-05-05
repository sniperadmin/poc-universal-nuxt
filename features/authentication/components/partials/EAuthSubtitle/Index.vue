<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const { t } = useI18n()

const props = defineProps({
  isRegister: {
    type: Boolean,
    required: true
  },
  isEditor: {
    type: Boolean,
    required: true
  },
  form: {
    type: Object,
    required: true
  }
})

const signinOrUpWithGoogle = () => {}

defineExpose({ t })
</script>

<script lang="ts">
export default defineComponent({
  name: 'EAuthSubtitle'
})
</script>

<template>
  <v-card-text v-if="!isEditor">
    <v-row
      justify="center"
      align="center"
    >
      <v-list-subheader
        data-test="subtitle"
        class="text-center mx-auto"
        :class="mobile ? 'text-subtitle-2' : 'text-subtitle-1'"
      >
        {{ t('auth.subtitle', { status: isRegister ? t('auth.status.signup') : t('auth.status.login') }) }}
      </v-list-subheader>

      <v-col
        cols="12"
        class="mb-1"
      >
        <e-btn
          data-test="google-btn"
          rounded
          block
          :x-large="!mobile"
          outlined
          class="font-weight-bold text-body-1"
          color="grey"
          :text="t('auth.google')"
          @click="signinOrUpWithGoogle"
        />
      </v-col>

      <v-divider class="mx-2" />
      <v-list-subheader
        data-test="subheader"
        class="text-center mx-auto"
        :class="mobile ? 'text-body-2' : 'text-body-1'"
      >
        {{ t('auth.subtitle1') }}
      </v-list-subheader>
      <v-divider class="mx-2" />
    </v-row>
  </v-card-text>
</template>

<style scoped>

</style>
