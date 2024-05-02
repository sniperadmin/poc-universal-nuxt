import { nextTick } from 'vue'
import { expect, it, describe, vi, beforeEach, afterEach } from 'vitest'
import { flushPromises, VueWrapper } from '@vue/test-utils'
import EAuth from './Index.vue'
import {
  addI18n, addPinia,
  addVuetify,
  bootstrapVueContext,
  compositeConfiguration,
  mountWrapper, shallowMount
} from '@/test-utils'
// import { useAuth } from '@/features/authentication'

type RelaxedVue = typeof EAuth & {
  form: {
    email: string
    name: string
  }
}

let wrapper: VueWrapper<RelaxedVue>

const findAuthWrapper = () => wrapper.find('[data-test="auth-wrapper"]')
const findEmailInput = () => wrapper.find('[data-test="email"]')
const findNameInput = () => wrapper.find('[data-test="name-input"]')
const findCta = () => wrapper.find('[data-test="action-btn"]')

let vueContext: any

describe('EAuth', () => {
  vueContext = bootstrapVueContext(compositeConfiguration(addVuetify, addI18n, addPinia))
  vueContext.propsData = {
    isRegister: true,
    isEditor: true
  }

  vueContext.mocks = {
    $fireModule: {
      auth: {
        GoogleAuthProvider: class GoogleAuthProvider {}
      }
    },
    $fire: {
      auth: {
        signInWithPopup: vi.fn(() => new Promise(
          (resolve, _reject) => resolve({
            email: 'test@jest.io',
            userId: '123',
            isEmailVerified: false
          }))
        )
      }
    },
    $route: {
      params: {
        persona: 'journalist'
      },
      query: {
        action: 'login'
      }
    },
    registerWithEmailAndPassword: vi.fn()
  }
  vueContext.vueTestUtils.config.global.stubs = ['e-btn', 'molecules-e-input-wrapper', 'molecules-e-input-wrapper-partials-e-text-field']

  beforeEach(() => {
    wrapper = mountWrapper(EAuth, vueContext)
  })

  afterEach(() => {
    vueContext.teardownVueContext()
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
