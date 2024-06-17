import { defineStore } from 'pinia'

export type ApiService = 'firebase' | 'rest'

interface State {
  apiService: ApiService
}
const getDefaultState = (): State => ({
  apiService: 'firebase'
})

export const useApiServiceStore = defineStore('api-service', {
  state: getDefaultState,
  actions: {
    enableService(serviceName: ApiService) {
      this.apiService = serviceName
    }
  }
})
