import { VueWrapper } from '@vue/test-utils'
import { describe, beforeEach, afterEach, it, expect } from 'vitest'
import { VApp } from 'vuetify/components/VApp'
import ENav from './Index.vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
// import { debug } from 'vitest-preview';

let wrapper: VueWrapper<any>

const Component = {
  template: `
    <v-app>
      <e-nav />
    </v-app>
  `,
  components: { VApp, ENav }
}

describe('ENav', () => {
  beforeEach(async() => {
    wrapper = await mountSuspended(Component)
  })
  afterEach(() => {
    wrapper.unmount()
  })

  it('should test the component', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
})
