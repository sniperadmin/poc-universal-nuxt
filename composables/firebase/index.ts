import { useFirebaseJournalists } from '~/composables/firebase/journalists'
import { useFirebaseAuthHelpers } from '~/composables/firebase/auth/firebase-auth-helpers'

export function initFirebaseApi() {
  const {getAllFirebaseJournalists} = useFirebaseJournalists()
  const {loginWithCreds, signUpWithCreds} = useFirebaseAuthHelpers()
  return {
    getAllFirebaseJournalists,
    loginWithCreds,
    signUpWithCreds
  }
}
