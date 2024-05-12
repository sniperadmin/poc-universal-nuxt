import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { VueWrapper } from '@vue/test-utils'
import TheSnackbar from './Index.vue'

let wrapper: VueWrapper

describe('TheSnackbarProvider', () => {
  const mockComponent = {
    template: `
      <v-app>
        <TheSnackbar>
          <v-btn @click="show({ message: 'some message here', color: 'primary' })"></v-btn>
        </TheSnackbar>
      </v-app>
    `,
    components: {
      TheSnackbar
    }
  }

  beforeEach(async () => {
    wrapper = await mountSuspended(mockComponent)
  })
  afterEach(() => {
    wrapper.unmount()
  })

  it('should mount', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it.todo('cover provide and inject')
})
