import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest'
import { VueWrapper } from '@vue/test-utils'
import { addI18n, addVuetify, bootstrapVueContext, compositeConfiguration, mountWrapper } from '@/test-utils'
import TheSnackbarProvider from './Index.vue'
import { ConfirmEventKey, injectStrict } from '@/utils/types'

let wrapper: VueWrapper<typeof TheSnackbarProvider>
let vueContext: any;

describe('TheSnackbarProvider', () => {
  vueContext = bootstrapVueContext(compositeConfiguration(addVuetify, addI18n))
  vueContext.provide = {
    snack: {
      show: vi.fn(),
      hide: vi.fn()
    }
  }
  const mockComponent = {
    template: `
      <v-app>
        <TheSnackbarProvider>
          <v-btn @click="show({ message: 'some message here', color: 'primary' })"></v-btn>
        </TheSnackbarProvider>
      </v-app>
    `,
    components: {
      TheSnackbarProvider
    }
  }

  beforeEach(() => {
    wrapper = mountWrapper(mockComponent, vueContext)
  })
  afterEach(() => {
    vueContext.teardownVueContext()
  })

  it('should mount', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it.todo('cover provide and inject')
})
