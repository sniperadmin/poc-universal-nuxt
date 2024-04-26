import { VueWrapper } from '@vue/test-utils'
import { it, expect, describe, afterEach, beforeEach, vi } from 'vitest'
import ETextField from './Index.client.vue'
import {
  addI18n,
  addVuetify,
  bootstrapVueContext,
  compositeConfiguration,
  mountWrapper
} from '~/test-utils'

let wrapper: VueWrapper<typeof ETextField>
let vueContext: any

const findAsterisk = () => wrapper.find('[data-test="input-asterisk"]')

describe('Global ETextField', () => {
  vueContext = bootstrapVueContext(compositeConfiguration(addVuetify, addI18n))
  vueContext.mocks = { $worker: {} }
  vueContext.propsData = { id: 'vi' }
  // vueContext.stubs = ['v-progress-linear']
  beforeEach(() => {
    /**
         * SECTION: only for vue-phone-input plugin
         * mockIntersectionObserver is used to support polyfill
         */
    // const mockIntersectionObserver = vi.fn()
    // mockIntersectionObserver.mockReturnValue({
    //     observe: () => null,
    //     unobserve: () => null,
    //     disconnect: () => null
    // })
    // window.IntersectionObserver = mockIntersectionObserver

    wrapper = mountWrapper(ETextField, vueContext)
  })

  afterEach(() => {
    vueContext.teardownVueContext()
  })

  describe('rendering component', () => {
    it('should load the component', () => {
      expect(wrapper.vm).toBeTruthy()
    })
  })

  describe('TextField Label', () => {
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

  // adds 20% branching cover
  describe('password', () => {
    it('should render pass', async function () {
      const input = wrapper.find('input')
      expect(input.attributes('type')).toEqual('text')
      await wrapper.setProps({ type: 'password', label: 'password' })
      expect(input.attributes('type')).toEqual('password')
      await wrapper.setData({
        showPass: true
      })
      expect(wrapper.find('input').attributes('type')).toEqual('text')
      expect(wrapper.find('label').text()).toBe('password')
    })

    it('should render icons', async function () {
      let iconWrapper
      iconWrapper = () => wrapper.find('.v-field__append-inner')
      expect(iconWrapper().exists()).toBeFalsy()

      await wrapper.setProps({ type: 'password' })
      expect(iconWrapper().exists()).toBeTruthy()
      expect(wrapper.vm.appendIcon).toEqual('')
      iconWrapper = wrapper.find('.v-field__append-inner')
      expect(iconWrapper.exists()).toBeTruthy()
      await iconWrapper.find('i').trigger('click')
      expect(wrapper.vm.showPass).toBe(true)
      await iconWrapper.find('i').trigger('click')
      expect(wrapper.vm.showPass).toBe(false)
    })
  })

  describe.todo('keyup event', () => {
    it('should test keyup', async function () {
      const spy = vi.spyOn(wrapper.vm, 'initProgress')
      const input = wrapper.find('input')
      await input.trigger('keyup')
      expect(spy).not.toHaveBeenCalled()

      await wrapper.setProps({ type: 'password', rules: ['required', 'alpha'] })
      await input.setValue('ee')
      await input.trigger('keyup')
      expect(spy).toHaveBeenCalled()
    })
  })

  describe.todo('progress bar', () => {
    // Eliminates 14% of branching
    it('should render the progress correctly', async function () {
      await wrapper.setProps({ type: 'password', rules: ['required', 'hasSpecial'] })
      wrapper.vm.progress = 100
      await nextTick()

      const progressBar = wrapper.find('.v-progress-linear')
      const innerBar = progressBar.find('.v-progress-linear__determinate')
      expect(progressBar.attributes('aria-valuenow')).toEqual('100')
      expect(innerBar.attributes('class')).toContain('bg-primary')

      wrapper.vm.progress = 50
      await nextTick()
      expect(progressBar.attributes('aria-valuenow')).toEqual('50')
      expect(innerBar.attributes('class')).toContain('bg-orange')

      wrapper.vm.progress = 80
      await nextTick()
      expect(progressBar.attributes('aria-valuenow')).toEqual('80')
      expect(innerBar.attributes('class')).toContain('bg-warning')
    })

    it.todo('should test the composable', async function () {
      await wrapper.setProps({ type: 'password', rule: ['required'] })
    })
  })
})
