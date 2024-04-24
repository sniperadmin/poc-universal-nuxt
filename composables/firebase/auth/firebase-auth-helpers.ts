import { createUserWithEmailAndPassword, getIdToken, signInWithEmailAndPassword } from '@firebase/auth'

export function useFirebaseAuthHelpers() {
  const { $firebaseAuth } = useNuxtApp()
  const { signIn, signUp } = useAuth()

  const signUpWithCreds = async (credentials: { email: string, password: string }) => {
    try {
      const res = await createUserWithEmailAndPassword($firebaseAuth, credentials.email, credentials.password)
      const firebaseIdToken = await getIdToken(res.user)
      //  send token to server
      await signUp({ token: firebaseIdToken }, { redirect: true, callbackUrl: '/protected/home' })
    } catch (error) {
      console.error('composables/firebase/auth/signupWithCreds - res => ', error)
    }
  }

  const loginWithCreds = async (credentials: any) => {
    try {
      const res = await signInWithEmailAndPassword($firebaseAuth, credentials.email, credentials.password)
      const firebaseIdToken = await getIdToken(res.user)
      //  send token to server
      const serverLoginRes = await signIn({ token: firebaseIdToken }, { redirect: true, callbackUrl: '/protected/home' })
      console.log('composables/firebase/auth/signin/loginWithCreds - res => ', serverLoginRes)
    } catch (error) {
      console.error('composables/firebase/auth/signin/loginWithCreds - res => ', error)
    }
  }
  return {
    loginWithCreds,
    signUpWithCreds
  }
}
