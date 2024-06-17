import { z } from 'zod'

export const UserCredentialSchema = z.object({
  username: z.string().min(3).max(50).optional(),
  email: z.string().email().min(5).max(100),
  password: z.string().min(6).max(20)
})

export const TokenCredentialSchema = z.object({
  token: z.string()
})
