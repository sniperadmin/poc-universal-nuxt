import FirebaseServer from '~/server/utils/firebase-server'
import { createPinia, setActivePinia } from 'pinia'
import { useApiServiceStore } from '~/store/api-service'
import { getAuth } from 'firebase-admin/auth'

export default eventHandler(async (event) => {
  FirebaseServer()
  setActivePinia(createPinia())
  const { apiService } = useApiServiceStore()

  const payload = await readBody(event)
  if (apiService === 'firebase') {
    const verifyToken = await getAuth().verifyIdToken(payload.token)
    await getAuth().setCustomUserClaims(verifyToken.uid, {
      journalist: true
    })
    return { token: payload.token }
  }
})
