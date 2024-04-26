import { VueWrapper } from '@vue/test-utils'
import { describe, beforeEach, afterEach, it, expect } from 'vitest'
import EAvatar from './Index.client.vue'
import { addVuetify, bootstrapVueContext, compositeConfiguration, mountWrapper } from '~/test-utils'

let wrapper: VueWrapper
let vueContext: any

describe('EAvatar', () => {
  vueContext = bootstrapVueContext(compositeConfiguration(addVuetify))
  beforeEach(() => {
    wrapper = mountWrapper(EAvatar, vueContext)
  })
  afterEach(() => { vueContext.teardownVueContext() })

  it('should mount', async () => {
    expect(wrapper.vm).toBeTruthy()
    await wrapper.setProps({ imgSrc: 'https://placehold.co/600x400' })
    expect(wrapper.find('img').attributes('src')).toEqual('https://placehold.co/600x400')
  })
})
