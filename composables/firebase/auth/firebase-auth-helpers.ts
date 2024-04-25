import { createUserWithEmailAndPassword, getIdToken, signInWithEmailAndPassword, signOut as signOutFromFirebase } from '@firebase/auth'
import { UserCredentialSchema } from '~/utils/types'
import { ZodError } from 'zod'

export function useFirebaseAuthHelpers() {
  const { $firebaseAuth } = useNuxtApp()
  const { signIn, signUp, signOut } = useAuth()

  const signUpWithCreds = async (credentials: { email: string, password: string }) => {
    try {
      //  validate credentails before sending them to firebase
      const validatedCreds = UserCredentialSchema.safeParse(credentials)
      if (!validatedCreds.success) {
        return new ZodError(validatedCreds.error.issues)
      }
      const res = await createUserWithEmailAndPassword($firebaseAuth, credentials.email, credentials.password)
      const firebaseIdToken = await getIdToken(res.user)
      //  send token to server
      await signUp({ token: firebaseIdToken }, { redirect: true, callbackUrl: '/protected/home' })
      return true
    } catch (error) {
      return error
    }
  }

  const loginWithCreds = async (credentials: any) => {
    try {
      //  validate credentails before sending them to firebase
      const validatedCreds = UserCredentialSchema.safeParse(credentials)
      if (!validatedCreds.success) {
        return new ZodError(validatedCreds.error.issues)
      }
      const res = await signInWithEmailAndPassword($firebaseAuth, credentials.email, credentials.password)
      const firebaseIdToken = await getIdToken(res.user)
      //  send token to server
      const serverLoginRes = await signIn({ token: firebaseIdToken }, { redirect: true, callbackUrl: '/protected/home' })
      console.log('composables/firebase/auth/signin/loginWithCreds - res => ', serverLoginRes)
      return true
    } catch (error) {
      return error
    }
  }

  const logout = async () => {
    try {
      await signOutFromFirebase($firebaseAuth)
      await signOut({ callbackUrl: '/auth/signin', external: true })
    } catch (error) {
      console.error('composables/firebase/auth/logout ERROR => ', error)
    }
  }

  return {
    loginWithCreds,
    signUpWithCreds,
    logout
  }
}
