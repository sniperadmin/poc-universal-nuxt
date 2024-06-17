import { describe, it, vi } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { useGetProgress } from './input-progress'

describe('useGetProgress', () => {
  it('should work', async function () {
    const { getProgress } = useGetProgress()
    const meow = await getProgress({ validate: () => false }, ['required'], toRef(0))
    await flushPromises()
    // console.log('input progress => ', meow)
    //   TODO: continue this test
  })
})
