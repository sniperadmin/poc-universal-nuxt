import { z } from 'zod'
import type { InjectionKey } from 'vue'

export const UserCredentialSchema = z.object({
  username: z.string().min(3).max(50).optional(),
  email: z.string().email().min(5).max(100),
  password: z.string().min(6).max(20)
})

export const TokenCredentialSchema = z.object({
  token: z.string()
})

interface IConfirmProps {
  type?: string
  color: string
  message: string
  location?: string
  timeout?: number
}

export interface ConfirmEvent {
  show: (props: IConfirmProps) => void
  hide: () => void
}

export const ConfirmEventKey: InjectionKey<ConfirmEvent> = Symbol('Snackbar')

export function injectStrict<T>(key: InjectionKey<T>, fallback?: T) {
  const resolved = inject(key, fallback)
  if (!resolved) {
    throw new Error(`Custom type injection error: Could not resolve ${key.description}`)
  }
  return resolved
}
