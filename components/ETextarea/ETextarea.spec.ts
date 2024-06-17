import { VueWrapper } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { beforeEach, afterEach, describe, it, expect } from 'vitest'
import ETextarea from './Index.vue'

let wrapper: VueWrapper<any>

const findAsterisk = () => wrapper.find('[data-test="input-asterisk"]')

describe('ETextArea', () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(ETextarea)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should load the component', function () {
    expect(wrapper.exists()).toBeTruthy()
  })

  describe('Label', () => {
    it('should render asterisk', async () => {
      expect(findAsterisk().exists()).toBe(false)
      await wrapper.setProps({
        rules: ['required']
      })
      // Must research asterisk again in the new DOM
      expect(findAsterisk().exists()).toBe(true)
      expect(findAsterisk().text()).toEqual('*')
      expect(findAsterisk().attributes('class')).toEqual('red--text')
    })
  })
})
