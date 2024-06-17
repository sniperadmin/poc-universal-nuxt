// import FirebaseServer from '~/server/utils/firebase-server'
import { createPinia, setActivePinia } from 'pinia'
import { useApiServiceStore } from '~/store/api-service'
import { TokenCredentialSchema } from '~/utils/types'

setActivePinia(createPinia())
const { apiService } = useApiServiceStore()

export default eventHandler(async (event) => {
  // FirebaseServer()
  if (apiService === 'firebase') {
    const validationResult = TokenCredentialSchema.safeParse(await readBody(event))
    if (!validationResult.success) {
      throw createError({ statusCode: 403, statusMessage: 'Unauthorized, invalid token sent' })
    }

    return validationResult.data
  }

  //  TODO: support rest api
})
