import { describe, it, expect } from 'vitest'
import {
  required,
  blank,
  email,
  alpha,
  titleMinChars,
  fullNameMinChars,
  hasLowercase,
  hasUppercase,
  hasNumber, hasSpecial, minchars, url
} from './allRules'

describe('All Input Rules', () => {
  describe('Required rule', () => {
    it('should return required if empty value', function () {
      expect(required('')).toBe('* required')
      expect(required([])).toBe('* required')
      expect(required('123')).toBe(true)
      expect(required(['text1'])).toBe(true)
    })
  })

  describe('Blank rule', () => {
    it('should handle blank input', function () {
      expect(blank('')).toBe('* Value cannot be blank')
      expect(blank('s')).toBe(true)
    })
  })

  describe('Email rule', () => {
    it('should validate email', () => {
      expect(email('a')).toBe('* Invalid e-mail')
      expect(email('test@vi.com')).toBe(true)
    })
  })

  describe('Alpha rule', () => {
    it('should handle alphabetic letters', function () {
      expect(alpha('3')).toBe('* Should have alphabetic characters only')
      expect(alpha('a')).toBe(true)
    })
  })

  describe('TitleMinChars rule', () => {
    it('should handle titleMinChars', function () {
      expect(titleMinChars('meow')).toBe('* title must have at least 5 words')
      expect(titleMinChars('one two three four')).toBe('* title must have at least 5 words')
      expect(titleMinChars('one two three four five')).toBe(true)
      expect(titleMinChars('one two three four five words')).toBe(true)
    })
  })

  describe('FullNameMinChars rule', () => {
    it('should handle fullNameMinChars', function () {
      expect(fullNameMinChars('vitest')).toBe('* First and last name is required')
      expect(fullNameMinChars('vitest result')).toBe(true)
      expect(fullNameMinChars('check vitest result')).toBe(true)
    })
  })

  describe('HasLowercase rule', () => {
    it('should handle hasLowercase', function () {
      expect(hasLowercase('VI')).toBe('* password must have at least 1 lowercase character')
      expect(hasLowercase('vI')).toBe(true)
    })
  })

  describe('HasUppercase', () => {
    it('should handle hasUppercase', function () {
      expect(hasUppercase('vi')).toBe('* password must have at least 1 uppercase character')
      expect(hasUppercase('Vi')).toBe(true)
    })
  })

  describe('HasNumber rule', () => {
    it('should handle hasNumber', function () {
      expect(hasNumber('test')).toBe('* password must have at least one number')
      expect(hasNumber('test1')).toBe(true)
    })
  })

  describe('HasSpecial rule', () => {
    it('should handle hasSpecial', function () {
      expect(hasSpecial('test1')).toBe("* password must have one special character ('\"!@#$*;&:?)+-")
      expect(hasSpecial('test*1')).toBe(true)
    })
  })

  describe('Minchars rule', () => {
    it('should handle minchars', function () {
      expect(minchars('test')).toBe('* password must have at least 6 characters')
      expect(minchars('test12')).toBe(true)
    })
  })

  describe('Url rule', () => {
    it('should handle url', function () {
      expect(url('')).toBe('* Wrong facebook url format')
    })
  })
})
