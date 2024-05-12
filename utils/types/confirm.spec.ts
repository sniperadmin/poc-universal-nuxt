import { describe, it, expect } from 'vitest'
import type { SnackbarMessage } from './confirm'

describe('SnackbarMessage interface', () => {
  it('should have required properties', () => {
    const snackbarMessage: SnackbarMessage = {
      text: 'Test message'
    }

    expect(snackbarMessage.text).toBe('Test message')
  })

  it('should have optional properties', () => {
    const snackbarMessage: SnackbarMessage = {
      text: 'Test message',
      multiLine: true,
      timer: '5s',
      color: 'blue'
    }

    expect(snackbarMessage.multiLine).toBe(true)
    expect(snackbarMessage.timer).toBe('5s')
    expect(snackbarMessage.color).toBe('blue')
  })

  it('should handle edge cases', () => {
    const snackbarMessage: SnackbarMessage = {
      text: 'Test message',
      timer: false,
      timeout: 5000
    }

    expect(snackbarMessage.timer).toBe(false)
    expect(snackbarMessage.timeout).toBe(5000)
  })

  it('should have default values for optional properties', () => {
    const snackbarMessage: SnackbarMessage = {
      text: 'Test message'
    }

    expect(snackbarMessage.multiLine).toBeUndefined()
    expect(snackbarMessage.timer).toBeUndefined()
    expect(snackbarMessage.color).toBeUndefined()
  })
})
