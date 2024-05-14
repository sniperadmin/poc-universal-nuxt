import { defineStore } from 'pinia'
import type { SnackbarMessage } from '@/utils/types'

const getDefaultState = () => ({
  queue: [] as Partial<SnackbarMessage>[],
  timeout: 3000,
  currentSnackbar: null as any | null
})

export const useSnackbarStore = defineStore('snackbar', {
  state: getDefaultState,
  getters: {
    hasNextSnackbar(state) {
      return state.queue.length > 0;
    },
  },
  actions: {
    addSnackbar(snackbar: Partial<SnackbarMessage>) {
      const newSnackbar = {
        color: snackbar.color || 'primary',
        text: snackbar.text,
        location: snackbar.location || 'top',
        timeout: this.timeout
      }
      this.queue.push(newSnackbar)
    },
    showNextSnackbar() {
      // Already showing one
      if (this.currentSnackbar) {
        return
      } else {
        const nextSnackbar = this.queue.shift();
        if (nextSnackbar) {
          this.currentSnackbar = nextSnackbar;
          setTimeout(() => {
            this.currentSnackbar = null;
            if (this.hasNextSnackbar) {
              this.showNextSnackbar();
            }
          }, this.timeout);
        }
      }
    },
  }
})
