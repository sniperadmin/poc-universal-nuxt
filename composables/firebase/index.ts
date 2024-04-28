import { useFirebaseJournalists } from '@/composables/firebase/journalists'
import { useFirebaseAuthHelpers } from '@/composables/firebase/auth/firebase-auth-helpers'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import type { FirebaseOptions } from '@firebase/app-types'
import { getAuth } from 'firebase/auth'

export const useFirebase = () => {
  const config = useRuntimeConfig()
  const { firebase } = config.public
  const firebaseApp = initializeApp(firebase as FirebaseOptions)
  const firebaseAuth = getAuth(firebaseApp)
  const firestore = getFirestore(firebaseApp)

  return {
    firebaseApp,
    firebaseAuth,
    firestore
  }
}

export function initFirebaseApi() {
  const {getAllFirebaseJournalists} = useFirebaseJournalists()
  const {loginWithCreds, signUpWithCreds, logout} = useFirebaseAuthHelpers()
  return {
    getAllFirebaseJournalists,
    loginWithCreds,
    signUpWithCreds,
    logout
  }
}
