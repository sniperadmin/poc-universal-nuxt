import { defineStore } from 'pinia'

const getDefaultState = () => ({
  isRest: false,
  isFirebase: true
})

type RootState = ReturnType<typeof getDefaultState>;

export const useApiServiceStore = defineStore('api-service', {
  state: getDefaultState,
  getters: {
    getIsRest: (state: RootState) => state.isRest,
    getIsFirebase: (state: RootState) => state.isFirebase
  },
  actions: {
    getConfig() {
      //  setup getting the config from a database
    },
    setRest(value: boolean) {
      this.isRest = value
    },
    setIdFirebase(value: boolean) {
      this.isFirebase = value
    },
    saveChanges() {
      //  saveChanges logic
    }
  }
})
