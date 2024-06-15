import {initializeApp, getApps, cert } from 'firebase-admin/app'

const { firebaseServiceAccount } = useRuntimeConfig()
const data = firebaseServiceAccount

export default function FirebaseServer() {
  let app

  if (getApps().length === 0) {
    app = initializeApp({
      credential: cert(data)
    })
  }
  return { app }
}
