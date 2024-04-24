import { useRestJournalists } from '~/composables/rest/journalists'

export function initRestApi() {
  const restJournalists = useRestJournalists()
  return {
    restJournalists
  }
}
