import { describe, beforeEach, afterEach, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { VueWrapper } from '@vue/test-utils'
import EArticle from './Index.vue'

let wrapper: VueWrapper

const text = 'this is a normal text to test the truncate'
const findArticle = () => wrapper.find('[data-testid="article"]')

describe('EArticle', () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(EArticle, {
      props: {
        article: text
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should mount', () => {
    expect(wrapper.exists()).toBeTruthy()
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
