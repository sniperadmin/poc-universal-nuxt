import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useRules } from './index'

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
    d: (key: string) => key
  })
}))

describe('rules', function () {
  beforeEach(() => {})
  afterEach(() => {})

  it('should test', function () {
    const { handleRules } = useRules()
    expect(handleRules(['required'])[0]()).toBe('auth.form.validation.required')
    expect(handleRules(['email'])[0]()).toBe('auth.form.validation.email')
    expect(handleRules(['blank'])[0]('')).toBe('cannot be blank')
    expect(handleRules(['alpha'])[0]('')).toBe('auth.form.validation.alpha')
    expect(handleRules(['titleMinChars'])[0]('')).toBe('auth.form.validation.titleMinChars')
    expect(handleRules(['fullNameMinChars'])[0]('')).toBe('auth.form.validation.fullNameMinChars')
    expect(handleRules(['hasLowercase'])[0]('')).toBe('auth.form.validation.hasLowercase')
    expect(handleRules(['hasUppercase'])[0]('')).toBe('auth.form.validation.hasUppercase')
    expect(handleRules(['hasNumber'])[0]('')).toBe('auth.form.validation.hasNumber')
    expect(handleRules(['hasSpecial'])[0]('')).toBe('auth.form.validation.hasSpecial')
    expect(handleRules(['minchars'])[0]('')).toBe('auth.form.validation.minchars')
    expect(handleRules(['url'])[0]('')).toBe('* Wrong facebook url format')
  })
})
