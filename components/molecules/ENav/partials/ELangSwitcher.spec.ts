import { VueWrapper } from '@vue/test-utils'
import { beforeEach, afterEach, describe, it, expect } from 'vitest'
import ELangSwitcher from './ELangSwitcher.vue'
import {
  addVuetify,
  bootstrapVueContext,
  compositeConfiguration,
  addI18n,
  addPinia,
  mountWrapper,
} from '~/test-utils'
import { langs } from '~/utils/languages'

let wrapper: VueWrapper<typeof ELangSwitcher>
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
    wrapper.vm.localeSelection = langs[0]
    await nextTick()
    const selection = wrapper.find('.v-select__selection').find('.v-list-item-title')
    expect(selection.text()).toEqual('English')
    expect(wrapper.vm.font).toEqual('Panton')

    wrapper.vm.localeSelection = langs[1]
    await nextTick()
    const selection2 = wrapper.find('.v-select__selection').find('.v-list-item-title')
    expect(selection2.text()).toEqual('العربية')
  })

  it('should try methods', async function () {
    expect(wrapper.html()).toMatchSnapshot()
    const select = wrapper.find('.v-select__selection')
    // const languageItems = wrapper.findAll('[data-test="language-item"]')

    await select.trigger('click')
    // wrapper.vm.useI18n().setLocale('en')
    // const selection = wrapper.find('.v-select__selection').find('.v-list-item-title')
    // expect(selection.text()).toEqual('English')
    // const input = wrapper.find('.v-select')
    // wrapper.vm.handleClick()
    // expect(wrapper.html()).toMatchSnapshot()
  })
})
