import { ZodError } from 'zod'
import { FirebaseError } from '@firebase/util'

export const useAuthWithMachine = (isRegister: boolean) => {
  const err = ref(null as any)
  const authForm = ref(null)

  const { state, send } = useMachine(authformMachine, {
    services: {
      submitForm: async () => {
        err.value = null
        return await handleAuthUsingEmailAndPassword()
      }
    }
  })

  const handleAuthUsingEmailAndPassword = async () => {
    //  Here you can call the composables you want
    if (!(authForm.value as any)?.validate()) { throw new Error('validation failure') }

    const { loginWithCreds, signUpWithCreds } = useApiServices()
    if (isRegister) {
      console.log('registering user')
      await signUpWithCreds({ name: state.value.context.name, email: state.value.context.email, password: state.value.context.password })
      //  TODO: add error handling
    } else {
      console.log('logging in user')
      const res = await loginWithCreds({ email: state.value.context.email, password: state.value.context.password })
      if (res instanceof ZodError) {
        const issue = res.issues[0]
        err.value = issue.message
        throw new Error(issue.message)
        // show({ color: 'secondary', message: issue.message, location: 'bottom' })
        //  TODO: show the error in the UI somehow
      } else if (res instanceof FirebaseError) {
        // show(createConfirm({ color: 'secondary', message: res.message, location: 'bottom' }))
        err.value = res.message
        throw new Error(res.name)
      } else {
        return true
      }
    }
  }

  return {
    state,
    send,
    err,
    authForm
  }
}
