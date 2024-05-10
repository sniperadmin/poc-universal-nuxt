import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia, storeToRefs } from 'pinia'
import { useApiServiceStore } from './index'

describe('api-service', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('initial state should be as expected', () => {
    const { apiService } = useApiServiceStore()
    expect(apiService).toBe('firebase')
  });

  it('should enableRest should set to rest', () => {
    const { enableService } = useApiServiceStore()
    const { apiService } = storeToRefs(useApiServiceStore())
    enableService('rest')
    expect(apiService.value).toBe('rest')
  })
})
