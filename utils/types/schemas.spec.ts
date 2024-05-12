import { test, expect, describe } from 'vitest'
import { TokenCredentialSchema, UserCredentialSchema } from './schemas'

describe('UserCredentialSchema', () => {
  test('should validate valid user credentials', () => {
    const data = {
      username: 'john_doe',
      email: 'john.doe@example.com',
      password: 'password123'
    }
    expect(UserCredentialSchema.parse(data)).toEqual(data)
  })

  test('should throw error for invalid user credentials', () => {
    const data = {
      email: 'invalidemail',
      password: 'pass'
    }
    expect(() => UserCredentialSchema.parse(data)).toThrow()
  })
})

describe('TokenCredentialSchema', () => {
  test('should validate valid token credential', () => {
    const data = {
      token: 'abcdef12345'
    }
    expect(TokenCredentialSchema.parse(data)).toEqual(data)
  })

  test('should throw error for invalid token credential', () => {
    const data = {
      token: 12345
    }
    expect(() => TokenCredentialSchema.parse(data)).toThrow()
  })
})
