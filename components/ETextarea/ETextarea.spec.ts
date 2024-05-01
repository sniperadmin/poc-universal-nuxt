import { VueWrapper } from '@vue/test-utils'
import { beforeEach, afterEach, describe, it, expect } from 'vitest'
import ETextarea from './Index.vue'
import { addI18n, addVuetify, bootstrapVueContext, compositeConfiguration, mountWrapper } from '@/test-utils'

let wrapper: VueWrapper<typeof ETextarea>
let vueContext: any

const findAsterisk = () => wrapper.find('[data-test="input-asterisk"]')

describe('ETextArea', () => {
  vueContext = bootstrapVueContext(compositeConfiguration(addVuetify, addI18n))
  vueContext.propsData = { id: 'vi' }

  beforeEach(() => {
    wrapper = mountWrapper(ETextarea, vueContext)
  })

  afterEach(() => { vueContext.teardownVueContext() })

  it('should load the component', function () {
    expect(wrapper.vm).toBeTruthy()
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
