//  Import types
import type { FirebaseOptions } from '@firebase/app-types'
import { type IFirebaseApi } from '@/utils/types'
//  Import methods
import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { useFirebaseAuthComposables } from '@/composables/firebase/auth/firebase-auth-helpers'

/**
 * @method useFirebase
 * Initializes Firebase client SDK
 * @typeDef {Object} firebaseApp
 * @typeDef {Object} firebaseAuth
 * @typeDef {Object} firestore
 * @return firebaseApp
 * @return firebaseAuth
 * @return firestore
 */
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

export function initFirebaseApi(): IFirebaseApi {
  return {
    ...useFirebaseAuthComposables()
  }
}
