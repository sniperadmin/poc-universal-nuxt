import { VueWrapper } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'
import ELangSwitcher from './ELangSwitcher.vue'
import { langs } from '@/utils/languages'

let wrapper: VueWrapper<any>

describe('ELangSwitcher', () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(ELangSwitcher)
  })
  afterEach(() => {
    wrapper.unmount()
  })

  it('should mount', async () => {
    expect(wrapper.exists()).toBeTruthy()
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
