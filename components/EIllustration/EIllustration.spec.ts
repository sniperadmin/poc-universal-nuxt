import { VueWrapper } from '@vue/test-utils'
import { describe, beforeEach, afterEach, it, expect } from 'vitest'
import EIllustration from './Index.client.vue'
import { addVuetify, bootstrapVueContext, compositeConfiguration, mountWrapper } from '~/test-utils'

let wrapper: VueWrapper<typeof EIllustration>
let vueContext: any

describe('EIllustration', () => {
  vueContext = bootstrapVueContext(compositeConfiguration(addVuetify))
  beforeEach(() => {
    wrapper = mountWrapper(EIllustration, vueContext)
  })
  afterEach(() => { vueContext.teardownVueContext() })

  it('should load', () => {
    expect(wrapper.vm).toBeTruthy()
    const image = wrapper.find('img')
    expect(image.attributes('src')).toEqual('/svg/empty.svg')
  })
})
