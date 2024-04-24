import FirebaseServer from '~/server/utils/firebase-server'
import { getFirestore } from 'firebase-admin/firestore'

export default defineEventHandler(async () => {
  FirebaseServer()
  const firestore = getFirestore()

  const userC = await firestore.collection('TestUserCollection').limit(4).get()
  if (!userC.empty) {
    return userC.docs.map(doc => doc.data())
  }
})
