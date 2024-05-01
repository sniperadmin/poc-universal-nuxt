import { bench, vi, describe } from 'vitest'
import { useGetProgress } from '@/composables/input/input-progress'
import { mockInputRef } from '@/composables/input/mock-ref'

describe('input-progress', () => {
  const { getProgress } = useGetProgress()
  bench('input-progress', () => {
    const progress = ref(0)
    const rules = ['required', 'hasLowercase', 'hasUppercase', 'hasNumber', 'hasSpecial', 'minchars']
    rules.forEach((rule) => {
      getProgress(mockInputRef, rules, progress)
    })
  })
})
