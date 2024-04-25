import FirebaseServer from '~/server/utils/firebase-server'
import { createPinia, setActivePinia } from 'pinia'
import { useApiServiceStore } from '~/store/api-service'
import { TokenCredentialSchema } from '~/utils/types'

setActivePinia(createPinia())
const { isFirebase } = useApiServiceStore()
// const config = useRuntimeConfig()
// function generateLoginEndpoint() {
//   console.log('calling strapi')
//   return `${config.serverBaseUrl}/auth/local/`
// }

export default eventHandler(async (event) => {
  FirebaseServer()
  if (isFirebase) {
    const validationResult = TokenCredentialSchema.safeParse(await readBody(event))
    console.log(validationResult)
    if (!validationResult.success) {
      throw createError({ statusCode: 403, statusMessage: 'Unauthorized, invalid token sent' })
    }

    return validationResult.data
  }

  //  TODO: support rest api
})
