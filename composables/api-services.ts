import { useApiServiceStore } from '@/store/api-service'
import { initFirebaseApi } from '@/composables/firebase'
import { initRestApi } from '@/composables/rest'

let initialized = false

export function useApiServices() {
  const { isFirebase, isRest } = useApiServiceStore()
  const loaderFunction = () => {
    const firebaseComposables = () => initFirebaseApi()
    const restComposables = () => initRestApi()
    if (!initialized) {
      initialized = true
      return isFirebase ? firebaseComposables() : restComposables()
    }
  }
  return {
    loaderFunction
  }
}
