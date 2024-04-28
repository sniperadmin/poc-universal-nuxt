import { VueWrapper } from '@vue/test-utils'
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'
import ELangSwitcher from './ELangSwitcher.vue'
import {
  addVuetify,
  bootstrapVueContext,
  compositeConfiguration,
  addI18n,
  addPinia,
  mountWrapper,
} from '@/test-utils'
import { langs } from '@/utils/languages'

let wrapper: VueWrapper<typeof ELangSwitcher & { localeSelection: any, font: string }>
let vueContext: any

describe('ELangSwitcher', () => {
  beforeEach(() => {
    vueContext = bootstrapVueContext(compositeConfiguration(addVuetify, addI18n, addPinia))
    wrapper = mountWrapper(ELangSwitcher, vueContext)
  })
  afterEach(() => {
    vueContext.teardownVueContext()
  })

  it('should mount', async () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should try methods', async function () {
    const component = wrapper.findComponent('.v-select')

    await component.setValue(langs[1])
    await component.trigger('select')

    const selection = wrapper.find('.v-select__selection').find('.v-list-item-title')
    expect(selection.text()).toEqual('العربية')
  })

  it.todo('cover the handleClick method')
})
