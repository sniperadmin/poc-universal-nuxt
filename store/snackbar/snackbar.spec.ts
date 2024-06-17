import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useSnackbarStore } from './index'

describe('snackbar store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('should add snackbar to queue', () => {
    const { queue, timeout, addSnackbar } = useSnackbarStore()
    const snackToAdd = { color: 'primary', location: 'botoom', text: 'hello from vitest' }
    expect(timeout).toBe(3000)
    expect(queue.length).toEqual(0)
    addSnackbar(snackToAdd)
    expect(queue.length).toEqual(1)
    // vi.advanceTimersByTime(timeout)
    expect(queue[0].timeout).toEqual(timeout)
  });

  it('should check showNextSnackbar with one message', () => {
    const { queue, timeout, addSnackbar, showNextSnackbar, currentSnackbar } = useSnackbarStore()
    const snackToAdd = { text: 'hello from vitest' }
    addSnackbar(snackToAdd)
    expect(queue[0].color).toEqual('primary')
    expect(queue[0].location).toEqual('top')
    expect(queue[0].text).toEqual(snackToAdd.text)
    showNextSnackbar()
    expect(queue.length).toEqual(0)
    expect(currentSnackbar).toBeNull()
  });

  it('should check showNextSnackbar with multiple messages', () => {
    const { queue, timeout, addSnackbar, showNextSnackbar, currentSnackbar } = useSnackbarStore()
    const snackOne = { text: 'hello from vitest' }
    const snackTwo = { text: 'second hello from vitest' }
    addSnackbar(snackOne)
    addSnackbar(snackTwo)
    expect(queue.length).toEqual(2)
    vi.advanceTimersByTime(timeout)
    showNextSnackbar()
    expect(queue.length).toEqual(1)
    expect(queue[0].text).toBe(snackTwo.text)
  });
})
