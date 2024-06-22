<script setup lang="ts">
import { EAuthTitle, EAuthSubtitle, EAuthPassword } from '@/features/authentication/components/partials'
import ETextField from '@/components/ETextField/Index.vue'
import { useDisplay } from 'vuetify'
import { useAuthWithMachine } from '@/features/authentication/composables/auth-with-machine'
// import { ConfirmEventKey, createConfirm, injectStrict } from '@/utils/types'
// import ESelect from '@/components/ESelect/Index.vue'

const {mobile} = useDisplay()
const { t } = useI18n()
const props = defineProps({
  isRegister: {
    type: Boolean,
    default: true,
  },
  isEditor: {
    type: Boolean,
    default: true,
  }
})

// const openTerms = ref(false)

//  TODO: Replace provide/inject flow with XState
// const { show } = injectStrict(ConfirmEventKey)

//  Using auth with auth machine to strongly handle the states of the form
const { send, state, err, authForm } = useAuthWithMachine(props.isRegister)
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EAuth'
})
</script>

<template>
  <v-card
    data-test="auth-wrapper"
    class="rounded-xl"
    :class="mobile ? '' : 'px-6'"
    width="600"
  >
    <v-container fluid>
      <!-- SECTION: Title -->
      <e-auth-title
        :is-editor="isEditor"
        :is-register="isRegister"
      />
      <!-- SECTION ./Title -->

      <!-- SECTION Subheader with social media login -->
      <e-auth-subtitle
        :is-editor="isEditor"
        :is-register="isRegister"
        @error="err = $event"
      />
      <!-- SECTION ./Subheader with social media login -->

      <!-- SECTION: Form -->
      <!--
        * NOTE: Current implementation is experimental
        * I am using one form entity for (register/login)
        * within each, a simple data structure is used
      -->
      <v-form
        ref="authForm"
        data-test="form"
        validate-on="submit"
      >
        <v-alert
          v-if="err"
          type="error"
          :text="err"
          variant="outlined"
          closable
          :icon="false"
        />
        <v-card-text>
          <v-row no-gutters>
            <!-- SECTION: Email field -->
            <v-col cols="12">
              <e-text-field
                id="email"
                :model-value="state.context.email"
                data-test="email"
                type="email"
                :rules="['required', 'email']"
                :hint="isRegister && isEditor ? t('auth.form.email.hint', { openTag: '<a>', closeTag: '</a>' }) : undefined"
                :label="t('auth.form.email.label', { type: isRegister ? isEditor ? t('auth.status.work') : t('auth.status.contact') : t('auth.status.your') })"
                persistent-hint
                dense
                :loading="state.matches('pending')"
                :disabled="state.matches('pending')"
                @input="send({ type: 'FILL_EMAIL', value: $event.target.value })"
              />
            </v-col>

            <v-col cols="12">
              <e-text-field
                v-if="isRegister"
                id="name"
                :model-value="state.context.name"
                data-test="name-input"
                autocomplete="name"
                type="text"
                :label="t('auth.form.name.label')"
                counter
                :loading="state.matches('pending')"
                :disabled="state.matches('pending')"
                :counter-value="v => v.trim().split(' ').length"
                :rules="['required', 'alpha', 'fullNameMinChars']"
                @input="send({ type: 'FILL_NAME', value: $event.target.value })"
              />
            </v-col>

            <!--
              NOTE:
              * All rules are registered in the ETextField component.
                This empowers the validation scenarios & progress calculation.
                For more information, @see @/components/ETextField.vue

              * Id must be assigned as it will be used as a reference for progress calculation
            -->
            <v-col cols="12">
              <e-auth-password
                :model-value="state.context.password"
                type="password"
                data-test="password"
                :disabled="state.matches('pending')"
                :is-register="isRegister"
                @auth="send({ type: 'submit' })"
                @input="send({ type: 'FILL_PASSWORD', value: $event.target.value })"
              />
            </v-col>

<!--            <e-select-->
<!--              v-if="isRegister"-->
<!--              id="survey"-->
<!--              v-model="form.surveyValue"-->
<!--              type="select"-->
<!--              data-test="survey-select"-->
<!--              :label="$t('auth.form.survey.label')"-->
<!--              return-object-->
<!--              :items="[-->
<!--                { title: 'search', value: $t('auth.form.survey.option1') },-->
<!--                { title: 'referral', value: $t('auth.form.survey.option2') },-->
<!--                { title: 'social', value: $t('auth.form.survey.option3') },-->
<!--                { title: 'blog', value: $t('auth.form.survey.option4') },-->
<!--                { title: 'other', value: $t('auth.form.survey.option5'), data: '' }-->
<!--              ]"-->
<!--              :placeholder="$t('auth.form.survey.placeholder')"-->
<!--              :rules="['required']"-->
<!--              class="mt-5"-->
<!--            />-->

<!--            <e-select-->
<!--              v-if="isRegister && (form.surveyValue.id === 'other')"-->
<!--              id="survey"-->
<!--              v-model="form.surveyValue.data"-->
<!--              data-test="survey-other"-->
<!--              :label="$t('auth.form.survey.other.label')"-->
<!--              :placeholder="$t('auth.form.survey.other.placeholder')"-->
<!--              persistent-hint-->
<!--              :rules="['required']"-->
<!--            />-->
          </v-row>

          <!--          <v-row v-if="isRegister" data-test="disclaimer" class="text-body-2" align="center">-->
          <!--            <span class="mx-1">{{ $t('privacy.text') }}</span>-->
          <!--            <e-terms-->
          <!--                class="mx-1"-->
          <!--            />-->
          <!--            <span class="mx-1">{{ $t('privacy.and') }}</span>-->
          <!--            <e-privacy-policy />-->
          <!--          </v-row>-->
        </v-card-text>

        <v-card-actions>
          <e-btn
            data-test="action-btn"
            large
            block
            color="primary"
            rounded
            :loading="state.matches('pending')"
            :text="isRegister ? t('auth.form.actions.continue') : t('auth.form.actions.login')"
            @click="send({ type: 'submit' })"
          />
        </v-card-actions>
      </v-form>
      <!-- SECTION: Form -->
    </v-container>
  </v-card>
</template>

<style scoped>

</style>
