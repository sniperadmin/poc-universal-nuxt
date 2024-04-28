import {
  createUserWithEmailAndPassword,
  getIdToken,
  signInWithEmailAndPassword,
  signOut as signOutFromFirebase,
  updateProfile,
} from '@firebase/auth'
import { UserCredentialSchema } from '@/utils/types'
import { ZodError } from 'zod'
import { useFirebase } from '@/composables/firebase'

export function useFirebaseAuthHelpers() {
  const { firebaseAuth } = useFirebase()
  const { signIn, signUp, signOut } = useAuth()

  const signUpWithCreds = async (credentials: { name: string, email: string, password: string }) => {
    try {
      //  validate credentails before sending them to firebase
      const validatedCreds = UserCredentialSchema.safeParse(credentials)
      if (!validatedCreds.success) {
        return new ZodError(validatedCreds.error.issues)
      }
      const res = await createUserWithEmailAndPassword(firebaseAuth, credentials.email, credentials.password)
      const { user } = res
      // TODO: update user auth profile
      await updateProfile(firebaseAuth.currentUser!, {
        displayName: credentials.name
      })

      //  SECTION: Token Generation
      const firebaseIdToken = await getIdToken(user)
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
      const res = await signInWithEmailAndPassword(firebaseAuth, credentials.email, credentials.password)
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
      await signOutFromFirebase(firebaseAuth)
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
