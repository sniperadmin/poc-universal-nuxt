import { bench } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSnackbarStore } from '@/store/snackbar/index'

setActivePinia(createPinia())

bench(() => {
  const { addSnackbar } = useSnackbarStore()
  const snackToAdd = { color: 'primary', location: 'botoom', text: 'hello from vitest' }
  addSnackbar(snackToAdd)
})

/**
 *  ✓ store/snackbar/snackbar.bench.ts (1) 4455ms
 *      name                    hz     min     max    mean     p75     p99    p995    p999     rme  samples
 *    · <anonymous>  10,504,069.90  0.0000  0.7584  0.0001  0.0001  0.0003  0.0003  0.0004  ±0.61%  5252036
 */
