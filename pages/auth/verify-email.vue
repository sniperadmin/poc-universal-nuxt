<script setup lang="ts">
import { useApiServices } from '@/composables/api-services'

const { status, data } = useAuth()
const { state, send } = useMachine(verifyemailMachine, {
  services: {
    sendEmail: async (context, event) => {
      //  Handle verification through server
      await $fetch('/api/auth/verify', { method: 'post', body: { email: event.value } })
        .then(() => {
          context.emailSent = true
          return Promise.resolve()
        }).catch(() => {
          return Promise.reject()
        })
    }
  }
})

const handleSend = () => {
  const type = state.value.matches('failed') ? 'RESEND_EMAIL' : state.value.context.emailSent === true ? 'RESEND_EMAIL' : 'SEND_EMAIL'
  send({ type, value: data.value!.email })
}

const signOutUser = async () => {
  const {logout} = useApiServices()
  await logout()
}
</script>

<template>
  <pre>
    Verify email address here
    pending: {{ state.matches('pending') }}
    sending: {{ state.matches('sending') }}
    failed: {{ state.matches('failed') }}
    cooldown: {{ state.matches('cooldown') }}
  </pre>
  <v-btn :loading="state.matches('sending')"
    :text="state.matches('pending') ? 'Send' : 'Resend'"
    :disabled="state.matches('cooldown')"
    @click="handleSend"
  />
  <v-btn v-if="status === 'authenticated'"
    :loading="state.matches('sending')"
    :disabled="state.matches('cooldown')"
    @click="signOutUser"
  >
    logout
  </v-btn>
</template>

<style scoped>

</style>
