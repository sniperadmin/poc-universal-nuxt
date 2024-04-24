import { useApiServiceStore } from '~/store/api-service'
import { initFirebaseApi } from '~/composables/firebase'
import { initRestApi } from '~/composables/rest'

export function useApiServices() {
  const { isFirebase, isRest } = useApiServiceStore()
  const loaderFunction = () => {
    const firebaseComposables = () => initFirebaseApi()
    const restComposables = () => initRestApi()
    return isFirebase ? firebaseComposables() : restComposables()
  }
  return {
    loaderFunction
  }
}
