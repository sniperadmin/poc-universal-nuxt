import type { IRestApi } from '@/utils/types'
import { useRestAuthComposables } from '@/composables/rest/auth/rest-auth-helpers'

/**
 * @method initRestApi
 * returns all the rest API composables
 */
export function initRestApi(): IRestApi {
  return {
    ...useRestAuthComposables()
  }
}
