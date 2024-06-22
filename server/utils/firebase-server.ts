import {initializeApp, getApps, cert } from 'firebase-admin/app'
import sgmail from "@sendgrid/mail";

const { firebaseServiceAccount, sgMailKey } = useRuntimeConfig()
sgmail.setApiKey(sgMailKey)

export const sgMail = sgmail

const data = firebaseServiceAccount
export function FirebaseServer() {
  let app

  if (getApps().length === 0) {
    app = initializeApp({
      credential: cert(data)
    })
  }
  return { app }
}
