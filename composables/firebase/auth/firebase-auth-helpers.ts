//  Import Types
import {
  UserCredentialSchema,
  type ICreds,
  type ILogin,
  type ILogout,
  type ISignUp
} from '@/utils/types'
import { ZodError } from 'zod'
//  Import methods
import {
  createUserWithEmailAndPassword,
  getIdToken,
  signInWithEmailAndPassword,
  signOut as signOutFromFirebase,
  updateProfile,
} from '@firebase/auth'
import { useFirebase } from '@/composables/firebase'

/**
 * @method useFirebaseAuthComposables
 * returns all the auth composables needed in this project
 */
export function useFirebaseAuthComposables() {
  const { firebaseAuth } = useFirebase()
  const { signIn, signUp, signOut } = useAuth()

  const signUpWithCreds: ISignUp = async (credentials: ICreds) => {
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

  const loginWithCreds: ILogin = async (credentials: ICreds) => {
    try {
      //  validate credentails before sending them to firebase
      const validatedCreds = UserCredentialSchema.safeParse(credentials)
      if (!validatedCreds.success) {
        const zodErr = new ZodError(validatedCreds.error.issues)
        return zodErr
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

  const logout: ILogout = async () => {
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
