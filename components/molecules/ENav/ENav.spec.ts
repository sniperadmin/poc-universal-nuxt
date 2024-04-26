import { VueWrapper } from '@vue/test-utils'
import { describe, beforeEach, afterEach, it, expect } from 'vitest'
import { VApp } from 'vuetify/components/VApp'
import ENav from './Index.vue'
import { addI18n, addVuetify, bootstrapVueContext, compositeConfiguration, mountWrapper } from '@/test-utils'
// import { debug } from 'vitest-preview';

let wrapper: VueWrapper<any>
let vueContext: any

const Component = {
  template: `
    <v-app>
      <e-nav />
    </v-app>
  `
}

describe('ENav', () => {
  vueContext = bootstrapVueContext(compositeConfiguration(addVuetify, addI18n))
  vueContext.components = {
    'v-app': VApp,
    'e-nav': ENav
  }
  beforeEach(() => {
    vueContext.stubs = ['v-lazy']
    wrapper = mountWrapper(Component, vueContext)
  })
  afterEach(() => {
    vueContext.teardownVueContext()
  })

  it('should test the component', () => {
    expect(wrapper.vm).toBeTruthy()
  })
})
