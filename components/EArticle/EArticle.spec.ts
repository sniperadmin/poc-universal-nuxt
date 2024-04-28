import { describe, beforeEach, afterEach, it, expect } from 'vitest'
import { VueWrapper } from '@vue/test-utils'
import { addI18n, addVuetify, bootstrapVueContext, compositeConfiguration, mountWrapper } from '@/test-utils'
import EArticle from './Index.vue'

let wrapper: VueWrapper<typeof EArticle>
let vueContext: any

const text = 'this is a normal text to test the truncate'
const findArticle = () => wrapper.find('[data-testid="article"]')

describe('EArticle', () => {
  vueContext = bootstrapVueContext(compositeConfiguration(addVuetify, addI18n))
  vueContext.propsData = {
    article: text
  }
  beforeEach(() => {
    wrapper = mountWrapper(EArticle, vueContext)
  })
  afterEach(() => {
    vueContext.teardownVueContext()
  })

  it('should mount', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it.each`
  a       |   expected
  ${0}    |   ${'...'}
  ${10}   |   ${'this is a ...'}
  ${20}   |   ${'this is a normal tex...'}
  `('should return `$expected` given truncateLength is `$a`',
    async ({ a, expected }) => {
      await wrapper.setProps({ truncateLength: a })
      expect(findArticle().text()).toEqual(expected)
    })
})
