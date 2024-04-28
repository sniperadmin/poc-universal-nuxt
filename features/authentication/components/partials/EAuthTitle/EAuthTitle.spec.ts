import { VueWrapper } from '@vue/test-utils'
import { expect, it, describe, vi, beforeEach, afterEach } from 'vitest'
import EAuthTitle from './Index.vue'
import { addI18n, addVuetify, bootstrapVueContext, compositeConfiguration, mountWrapper } from '~/test-utils'

let wrapper: VueWrapper
let vueContext: any

const findTitle = () => wrapper.find('[data-test="auth-title"]')

describe('EAuthTitle', () => {
  vueContext = bootstrapVueContext(compositeConfiguration(addVuetify, addI18n))
  vueContext.propsData = {
    isEditor: true,
    isRegister: true
  }

  beforeEach(() => {
    wrapper = mountWrapper(EAuthTitle, vueContext)
  })
  afterEach(() => { vueContext.teardownVueContext() })

  it('should render title attributes correctly', async () => {
    const title = findTitle()

    expect(title.exists()).toBe(true)
    expect(title.attributes('class')).toContain('text-subtitle-1')
    expect(title.attributes('class')).toContain('text-capitalize')
    expect(title.text().toLowerCase()).toEqual('create editor account')

    // Mobile responsiveness
    wrapper.vm.$vuetify.display.mobile = false
    await nextTick()
    expect(title.attributes('class')).toContain('text-h5')
  })

  it('should render correct title text per status/role', async () => {
    // status => login
    await wrapper.setProps({
      isRegister: false
    })
    await nextTick()
    expect(findTitle().text().toLowerCase()).toEqual('login editor account')
    //  role => journalist
    await wrapper.setProps({
      isEditor: false
    })
    await nextTick()
    expect(findTitle().text().toLowerCase()).toEqual('login journalist account')
    //  status => register (role: journalist)
    await wrapper.setProps({
      isRegister: true
    })
    expect(findTitle().text().toLowerCase()).toEqual('create journalist account')
  })
})
