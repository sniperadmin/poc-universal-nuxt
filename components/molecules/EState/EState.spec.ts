import { VueWrapper } from '@vue/test-utils'
import { describe, beforeEach, afterEach, it, expect } from 'vitest'
import EState from './Index.vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'

let wrapper: VueWrapper<any>

describe('EState', () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(EState)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should test the component', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('should load elements', () => {
    const image = wrapper.find('[data-test="state-image"]').find('img')
    expect(image.exists()).toBe(true)
    expect(image.attributes('src')).toBe('https://fakeimg.pl/400x400/cccccc/b8b8b8?text=Journalist&font=bebas')
  })

  it('should load btn', async () => {
    const btn = () => wrapper.find('[data-test="state-btn"]')
    expect(btn().exists()).toBeFalsy()
    await wrapper.setProps({ withButton: true })
    expect(btn().exists()).toBeTruthy()

    await btn().trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  it('should render state text col', async () => {
    const textCol = () => wrapper.find('[data-test="state-text-col"]')
    expect(textCol().attributes().class).toContain('v-col-7')
    await wrapper.setProps({ textCols: 3 })
    expect(textCol().attributes().class).toContain('v-col-3')
  })

  it('should render state btn col', async () => {
    const btnCol = () => wrapper.find('[data-test="state-btn-col"]')
    expect(btnCol().attributes().class).toContain('v-col-4')
    await wrapper.setProps({ btnCols: 3 })
    expect(btnCol().attributes().class).toContain('v-col-3')
  })
})
