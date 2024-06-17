import { VueWrapper } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { expect, it, describe, beforeEach, afterEach } from 'vitest'
import EAuthTitle from './Index.vue'

let wrapper: VueWrapper

const findTitle = () => wrapper.find('[data-test="auth-title"]')

describe('EAuthTitle', () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(EAuthTitle, {
      props: {
        isRegister: true,
        isEditor: false
      }
    })
  })
  afterEach(() => { wrapper.unmount() })

  it('should render title attributes correctly', async () => {
    const title = findTitle()

    expect(title.exists()).toBe(true)
    // expect(title.attributes('class')).toContain('text-subtitle-1')
    // expect(title.attributes('class')).toContain('text-capitalize')
    // expect(title.text().toLowerCase()).toEqual('create editor account')
    //
    // // Mobile responsiveness
    // wrapper.vm.$vuetify.display.mobile = false
    // await nextTick()
    // expect(title.attributes('class')).toContain('text-h5')
  })

  it.todo('should render correct title text per status/role', async () => {
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
