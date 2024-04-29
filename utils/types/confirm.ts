import type { InjectionKey } from 'vue'

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

