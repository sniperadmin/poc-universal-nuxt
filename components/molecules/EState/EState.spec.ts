import { VueWrapper } from '@vue/test-utils'
import { describe, beforeEach, afterEach, it, expect } from 'vitest'
import EState from './Index.vue'
import EBtn from '@/components/EBtn/Index.vue'
import { addPinia, addVuetify, bootstrapVueContext, compositeConfiguration, mountWrapper } from '~/test-utils'

let wrapper: VueWrapper<any>
let vueContext: any

describe('EState', () => {
  vueContext = bootstrapVueContext(compositeConfiguration(addVuetify, addPinia))
  vueContext.components = {
    'e-btn': EBtn
  }
  beforeEach(() => {
    wrapper = mountWrapper(EState, vueContext)
  })

  afterEach(() => { vueContext.teardownVueContext() })

  it('should test the component', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should load elements', () => {
    const image = wrapper.find('[data-test="state-image"]').find('img')
    expect(image.exists()).toBe(true)
    expect(image.attributes('src')).toBe('/svg/empty.svg')
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
