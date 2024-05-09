import { defineStore } from 'pinia'
import type { SnackbarMessage } from '@/utils/types'

const getDefaultState = () => ({
  queue: [] as Partial<SnackbarMessage>[],
  timeout: 3000,
  timeoutFn: {} as any
})

export const useSnackbarStore = defineStore('snackbar', {
  state: getDefaultState,
  actions: {
    addSnackbar(snackbar: Partial<SnackbarMessage>) {
      this.queue.push({
        color: snackbar.color || 'primary',
        text: snackbar.text,
        location: snackbar.location || 'top',
        timeout: this.timeout
      })
      this.timeoutFn = setTimeout(() => {
        this.removeSnackbar()
      }, this.timeout)
    },
    removeSnackbar() {
      this.queue.shift()
      clearTimeout(this.timeoutFn)
    }
  }
})
