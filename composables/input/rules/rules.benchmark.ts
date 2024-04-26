import { bench, vi, describe } from 'vitest'
import { useRules } from './index'

describe('bench', function () {
  const { handleRules } = useRules()
  bench('check all reserved rules against a string', () => {
    handleRules([
      'required',
      'email',
      'alpha',
      'blank',
      'titleMinChars',
      'fullNameMinChars',
      'hasLowercase',
      'hasUppercase',
      'hasSpecial'
    ]).forEach((fn: Function) => fn('SomeTestString'))

  })

  bench('parallel rules', () => {
    handleRules([
      'required',
    ]).forEach((fn: Function) => fn(''))

    handleRules([
      'required',
      'email'
    ]).forEach((fn: Function) => fn('SomeTestString'))

    handleRules([
      'required',
      'alpha',
      'blank'
    ]).forEach((fn: Function) => fn('SomeTestString'))

    handleRules([
      'titleMinChars',
      'fullNameMinChars',
      'hasLowercase',
      'hasUppercase',
      'hasSpecial'
    ]).forEach((fn: Function) => fn('SomeTestString'))
  })
})
