import FirebaseServer from '~/server/utils/firebase-server'
import { createPinia, setActivePinia } from 'pinia'
import { useApiServiceStore } from '~/store/api-service'

setActivePinia(createPinia())
const { isRest, isFirebase } = useApiServiceStore()
const config = useRuntimeConfig()

function generateLoginEndpoint() {
  console.log('calling strapi')
  return `${config.serverBaseUrl}/auth/local/`
}

export default eventHandler(async (event) => {
  FirebaseServer()
  const payload = await readBody(event)
  if (isFirebase) {
    return { token: payload.token }
  }

  //  TODO: support rest api
  // if (isRest) {
  //   //  validate password
  //   //  send it
  //   const response = await fetch(generateLoginEndpoint(), {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(payload)
  //   })
  //
  //   const responseData = await response.json()
  //
  //   if (response.ok) {
  //     const token = responseData.jwt
  //     return { token }
  //   } else {
  //     throw createError(responseData.error)
  //   }
  // }
})
