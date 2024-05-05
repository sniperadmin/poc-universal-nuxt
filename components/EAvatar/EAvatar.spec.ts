import { VueWrapper } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, beforeEach, afterEach, it, expect } from 'vitest'
import EAvatar from './Index.client.vue'

let wrapper: VueWrapper

describe('EAvatar', () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(EAvatar)
  })
  afterEach(() => {
    wrapper.unmount()
  })

  it('should mount', async () => {
    expect(wrapper.exists()).toBeTruthy()
    await wrapper.setProps({ imgSrc: 'https://placehold.co/600x400' })
    expect(wrapper.find('img').attributes('src')).toEqual('https://placehold.co/600x400')
  })
})
