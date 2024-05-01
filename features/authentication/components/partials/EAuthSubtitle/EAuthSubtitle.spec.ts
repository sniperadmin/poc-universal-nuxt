import { VueWrapper } from '@vue/test-utils'
import { expect, it, describe, vi, beforeEach, afterEach } from 'vitest'
import EAuthSubtitle from './Index.vue'
import { addI18n, addPinia, addVuetify, bootstrapVueContext, compositeConfiguration, mountWrapper } from '@/test-utils'
import EBtn from '@/components/EBtn/Index.vue'

let wrapper: VueWrapper
let vueContext: any

const findSubtitle = () => wrapper.find('[data-test="subtitle"]')
const findGoogleBtn = () => wrapper.find('[data-test="google-btn"]')

describe('EAuthSubtitle', () => {
  vueContext = bootstrapVueContext(compositeConfiguration(addVuetify, addI18n, addPinia))
  vueContext.propsData = {
    isEditor: true,
    isRegister: true,
    form: {
      email: '',
      name: '',
      password: '',
      surveyValue: ''
    }
  }
  vueContext.components = {
    'e-btn': EBtn
  }

  beforeEach(() => {
    wrapper = mountWrapper(EAuthSubtitle, vueContext)
  })

  afterEach(() => { vueContext.teardownVueContext() })

  it('should not load subtitle', async () => {
    expect(findSubtitle().exists()).toBe(false)
    await wrapper.setProps({
      isEditor: false
    })
    await nextTick()
    expect(findSubtitle().exists()).toBe(true)
    expect(findSubtitle().attributes('class')).toContain('text-subtitle-2')
    //  mobile responsiveness here
    wrapper.vm.$vuetify.display.mobile = false
    await nextTick()
    expect(findSubtitle().attributes('class')).toContain('text-subtitle-1')
  })

  describe('google sign in btn', () => {
    it('should test btn design specs', async () => {
      expect(findGoogleBtn().exists()).toBeFalsy()
      await wrapper.setProps({
        isEditor: false
      })
      await nextTick()
      //  Design specs from figma
      expect(findGoogleBtn().text()).toEqual('google')
      console.log(findGoogleBtn().attributes())
      expect(findGoogleBtn().attributes('class')).toContain('bg-grey')
      expect(findGoogleBtn().attributes()).toHaveProperty('outlined')
      expect(findGoogleBtn().attributes()).toHaveProperty('x-large')
      expect(findGoogleBtn().attributes('x-large')).toEqual("true")
    })

    it('should check mobile responsiveness', async () => {
      await wrapper.setProps({
        isEditor: false
      })
      wrapper.vm.$vuetify.display.mobile = false
      await nextTick()
      expect(findGoogleBtn().attributes('x-large')).toEqual("true")
    })

    it('should cover subtitle', async () => {
      expect(findSubtitle().exists()).toBeFalsy()
      await wrapper.setProps({ isEditor: false })
      expect(findSubtitle().exists()).toBeTruthy()
      expect(findSubtitle().text()).toEqual('create with your google account')
      await wrapper.setProps({ isRegister: false })
      expect(findSubtitle().text()).toEqual('login with your google account')
    })
  })
})
