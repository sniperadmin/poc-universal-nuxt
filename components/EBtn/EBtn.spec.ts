import { describe, beforeEach, afterEach, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { VueWrapper } from '@vue/test-utils'
import EBtn from './Index.vue'

let wrapper: VueWrapper

const findBtn = () => wrapper.find('[data-test="btn"]')

describe('EBtn', () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(EBtn)
  })
  afterEach(() => {
    wrapper.unmount()
  })

  it('should render label', async () => {
    const btn = findBtn()
    expect(btn.exists()).toBeTruthy()
    await wrapper.setProps({ color: 'primary', iconName: 'mdi-cog' })
    expect(btn.attributes('class')).toContain('primary')
    // expect(btn.find('i').attributes('class')).toContain('mdi-cog')
  })

  it('should render correct classes', async () => {
    const btn = findBtn()
    expect(btn.attributes('class')).toContain('text-body-1 text-capitalize font-weight-thin')
    await wrapper.setProps({
      underline: true
    })
    expect(btn.attributes('class')).toContain('text-decoration-underline pa-0')
  })

  it('should emit click', async () => {
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
