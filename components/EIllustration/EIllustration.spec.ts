import { VueWrapper } from '@vue/test-utils'
import { describe, beforeEach, afterEach, it, expect } from 'vitest'
import EIllustration from './Index.client.vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'

let wrapper: VueWrapper<any>

describe('EIllustration', () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(EIllustration)
  })
  afterEach(() => {
    wrapper.unmount()
  })

  it('should load', () => {
    expect(wrapper.exists()).toBeTruthy()
    const image = wrapper.find('img')
    expect(image.attributes('src')).toEqual('/svg/empty.svg')
  })
})
