import {initializeApp, getApps, cert } from 'firebase-admin/app'
import data from '../../service-account.json';

export default function FirebaseServer() {
  let app

  if (getApps().length === 0) {
    app = initializeApp({
      credential: cert(data)
    })
  }
  return { app }
}
