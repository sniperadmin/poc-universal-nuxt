import type { Ref } from 'vue'

export function useGetProgress() {
  /**
   * DO NOT DELETE!
   * @method getProgress
   * Uses a web worker to calculate the progress for passing password requirements
   * This is engineered to ensure that there is no stress on the main browser thread,
   * So it is preferable to assign this to another browser thread to avoid performance issues
   * @returns progress
   */
  async function getProgress(inputRef: any, rules: string[], progress: Ref) {
    if (process.client) {
      let errs: any[] = []
      if (inputRef) {
        const cached = await inputRef.validate()
        errs = toRaw(cached)
      }

      const worker = new Worker('/js/password-progress.worker.js')
      // Listening
      worker.addEventListener('message', (event: { data: number }) => {
        progress.value = event.data
        worker.terminate()
      })

      // initiating
      worker.postMessage({
        rules,
        errs,
      })
      return progress
    }
  }

  return {getProgress}
}
