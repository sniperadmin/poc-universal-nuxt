import { VueWrapper } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import { it, expect, describe, afterEach, beforeEach, vi } from 'vitest'
import ESelect from './Index.vue'

let wrapper: VueWrapper<unknown>

const findLabelWrapper = () => wrapper.find('.v-label')
const findAsterisk = () => wrapper.find('[data-test="select-asterisk"]')
const findSelectLabel = () => wrapper.find('[data-test="select-label"]')
const findSelectInput = () => wrapper.getComponent('.v-select')

describe('ESelect', () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(ESelect, {
      props: {
        modelValue: 'test',
        items: ['test', 'vitest'],
        persistHint: true
      },
      slots: {
        message: 'hi from vitest'
      }
    })
  })
  afterEach(() => {
    wrapper.unmount()
  })

  describe('label', () => {
    it('should render label', async () => {
      await wrapper.setProps({
        label: 'jest label'
      })
      const label = findLabelWrapper()
      expect(label.exists()).toBeTruthy()
      expect(label.text()).toEqual('jest label')
    })

    it('should render asterisk if required', async () => {
      await wrapper.setProps({
        label: 'jest label',
        rules: ['required']
      })
      const labelWrapper = findLabelWrapper()
      const asterisk = findAsterisk()
      expect(asterisk.exists()).toBeTruthy()
      expect(asterisk.text()).toEqual('*')
      expect(labelWrapper.text().replace(/\s+/, '')).toEqual('*jest label')
    })

    it('should display the correct label font', async () => {
      await wrapper.setProps({
        label: 'jest label'
      })
      const label = findSelectLabel()
      expect(label.attributes('class')).toContain('text-capitalize text-caption font-weight-bold')
    })
  })

  describe.todo('select input', function () {
    it.todo('should pass chips prop', async () => {
      expect(findSelectInput().attributes('chips')).toEqual(false)
      await wrapper.setProps({
        chips: true
      })
      await nextTick()
      expect(findSelectInput().attributes('chips')).toEqual(true)
    })

    it('should pass deletableChips prop', async () => {
      expect(findSelectInput().attributes('deletableChips')).toEqual(false)
      await wrapper.setProps({
        deletableChips: true
      })
      await nextTick()
      expect(findSelectInput().attributes('deletableChips')).toEqual(true)
    })

    it.todo('should pass smallChips prop', async () => {
      expect(findSelectInput().attributes('smallChips')).toEqual(false)
      await wrapper.setProps({
        smallChips: true
      })
      await nextTick()
      expect(findSelectInput().attributes('smallChips')).toEqual(true)
    })
  })
})
