//  Import types
import type { IFirebaseApi, IRestApi } from '@/utils/types'
//  Import methods
import { useApiServiceStore } from '@/store/api-service'
import { initFirebaseApi } from '@/composables/firebase'
import { initRestApi } from '@/composables/rest'
import { createGlobalState } from '@vueuse/core'
import { createPinia, setActivePinia } from 'pinia'

//  Create a union type for Api
type IApi = IFirebaseApi & IRestApi
//  Initializing config store
setActivePinia(createPinia())
const { apiService } = storeToRefs(useApiServiceStore())
//  Create the main composables
const useFirebaseApi = createGlobalState((): IApi => ({ ...initFirebaseApi() }))
const useRestApi = createGlobalState((): IApi => ({ ...initRestApi() }))
//  Return the initializer
export function useApiServices() {
  return apiService.value === 'firebase' ? useFirebaseApi() : useRestApi()
}
