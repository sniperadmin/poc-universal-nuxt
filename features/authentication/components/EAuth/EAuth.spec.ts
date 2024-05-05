import { nextTick } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { expect, it, describe, vi, beforeEach, afterEach } from 'vitest'
import { VueWrapper } from '@vue/test-utils'
import EAuth from './Index.vue'

let wrapper: VueWrapper<any>

const findAuthWrapper = () => wrapper.find('[data-test="auth-wrapper"]')
const findEmailInput = () => wrapper.find('[data-test="email"]')
const findNameInput = () => wrapper.find('[data-test="name-input"]')
const findCta = () => wrapper.find('[data-test="action-btn"]')


describe('EAuth', () => {
  beforeEach(async() => {
    wrapper = await mountSuspended(EAuth)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('DOM', () => {
    describe('Mounting', () => {
      it('should test wrapper', async () => {
        expect(findAuthWrapper().attributes('class')).not.toContain('px-6')
        wrapper.vm.$vuetify.display.mobile = false
        wrapper.vm.$vuetify.display.lg = true
        await nextTick()
        expect(findAuthWrapper().attributes('class')).toContain('px-6')
      })
      it('should render correct options', function () {
        expect(wrapper.vm.$options.name).toEqual('EAuth')
        expect(wrapper.vm.$options.props.isRegister).toEqual({ type: Boolean, default: true })
        expect(wrapper.vm.$options.props.isEditor).toEqual({ type: Boolean, default: true })
      })
    })

    describe('form', () => {
      it('should load the email input', async () => {
        expect(findEmailInput().exists()).toBe(true)
        expect(findEmailInput().attributes('label')).toBe('work email')
        // expect(findEmailInput().find('.v-messages__message').text()).toBe('Can\'t find your company? Please,  register here')
        // await wrapper.setProps({
        //   isEditor: false
        // })
        // await nextTick()
        // expect(findEmailInput().find('label').text()).toBe('* contact email')
        // await wrapper.setProps({
        //   isRegister: false
        // })
        // await nextTick()
        // expect(findEmailInput().find('label').text()).toBe('* your email')
        // await findEmailInput().find('input').setValue('meow@me.com')
        // expect(wrapper.vm.form.email).toBe('meow@me.com')
      })

      it('should load name input', async function () {
        expect(findNameInput().exists()).toBeTruthy()
        expect(findNameInput().attributes('label')).toEqual('first and last name')
        expect(findNameInput().attributes('modelvalue')).toBe('')
        await wrapper.setData({
          form: {
            name: 'vitest'
          }
        })
        expect(findNameInput().attributes('modelvalue')).toBe('vitest')
      })

      it.todo('should call signIn', async () => {
        const spy = vi.spyOn(wrapper.vm.$options.methods, 'handleAuthUsingEmailAndPassword')
        await findCta().trigger('click')
        expect(spy).toHaveBeenCalled()
      })
    })
  })
})
