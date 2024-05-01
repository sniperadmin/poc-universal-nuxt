<script setup lang="ts">
import { reactive } from 'vue'
import { EAuthTitle, EAuthSubtitle, EAuthPassword } from '@/features/authentication/components/partials'
import ETextField from '@/components/ETextField/Index.client.vue'
const {mobile} = useDisplay()
// import ESelect from '@/components/ESelect/Index.vue'

import { useDisplay } from 'vuetify'
import { ZodError } from 'zod'
import { FirebaseError } from '@firebase/util'
import { ConfirmEventKey, createConfirm, injectStrict } from '@/utils/types'

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

const form = reactive({
  email: '',
  name: '',
  password: '',
  surveyValue: {id: null, data: null}
})
const openTerms = ref(false)
const firestoreListener = ref(null as any)
const valid = ref(true)
const loading = ref(false)
const error = ref(null as any)

const { show } = injectStrict(ConfirmEventKey)

const handleAuthUsingEmailAndPassword = async () => {
  const { loginWithCreds, signUpWithCreds } = useApiServices()
  if (props.isRegister) {
    console.log('registering user')
    await signUpWithCreds(form)
  } else {
    console.log('logging in user')
    const res = await loginWithCreds(form)
    if (res instanceof ZodError) {
      const issue = res.issues[0]
      show({ color: 'secondary', message: issue.message })
      //  TODO: show the error in the UI somehow
    } else if (res instanceof FirebaseError) {
      show(createConfirm({ color: 'secondary', message: res.message }))
    }
  }
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EAuth',
})
</script>

<template>
  <v-card
    data-test="auth-wrapper"
    class="rounded-xl mx-auto"
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
        :form="form"
        :is-editor="isEditor"
        :is-register="isRegister"
        @loading="loading = $event"
        @error="error = $event"
      />
      <!-- SECTION ./Subheader with social media login -->

      <!--      <v-alert v-if="error" data-test="error" type="error">-->
      <!--        {{ error }}-->
      <!--      </v-alert>-->

      <!-- SECTION: Form -->
      <!--
        * NOTE: Current implementation is experimental
        * I am using one form entity for (register/login)
        * within each, a simple data structure is used
      -->
      <v-form
        ref="auth"
        v-model="valid"
        data-test="form"
      >
        <v-card-text>
          <v-row no-gutters>
            <!-- SECTION: Email field -->
            <v-col cols="12">
              <client-only>
                <e-text-field
                  id="email"
                  v-model="form.email"
                  data-test="email"
                  type="email"
                  :hint="isRegister && isEditor ? $t('auth.form.email.hint', { openTag: '<a>', closeTag: '</a>' }) : undefined"
                  :label="$t('auth.form.email.label', { type: isRegister ? isEditor ? $t('auth.status.work') : $t('auth.status.contact') : $t('auth.status.your') })"
                  persistent-hint
                  dense
                  :rules="['required', 'email']"
                />
              </client-only>
            </v-col>

            <v-col cols="12">
              <e-text-field
                v-if="isRegister"
                id="name"
                v-model="form.name"
                data-test="name-input"
                autocomplete="name"
                type="text"
                persistent-hint
                :label="$t('auth.form.name.label')"
                counter
                :counter-value="v => v.trim().split(' ').length"
                :rules="['required', 'alpha', 'fullNameMinChars']"
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
              <client-only>
                <e-auth-password
                  v-model="form.password"
                  type="password"
                  data-test="password"
                  :is-register="isRegister"
                />
              </client-only>
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
            :loading="loading"
            :text="isRegister ? $t('auth.form.actions.continue') : $t('auth.form.actions.login')"
            @click="handleAuthUsingEmailAndPassword"
          />
        </v-card-actions>
      </v-form>
      <!-- SECTION: Form -->
    </v-container>
  </v-card>
</template>

<style scoped>

</style>
