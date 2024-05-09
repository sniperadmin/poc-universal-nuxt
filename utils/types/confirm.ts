import type { ComponentPublicInstance, StyleValue, TransitionProps, VNodeChild, VNodeRef } from 'vue'

export interface SnackbarMessage {
  text: string
  multiLine: boolean
  timer: string | boolean
  timeout: string | number
  vertical: boolean
  location?: any
  position: 'static' | 'relative' | 'fixed' | 'absolute' | 'sticky'
  absolute: boolean
  rounded: string | number | boolean
  tile: boolean
  color?: string
  variant: 'text' | 'flat' | 'elevated' | 'tonal' | 'outlined' | 'plain'
  theme: string
  closeOnBack: boolean
  contained: boolean
  contentClass: any
  contentProps: any
  disabled: boolean
  opacity: string | number
  zIndex: string | number
  target:
    | Element
    | 'parent'
    | 'cursor'
    | (string & {})
    | ComponentPublicInstance
    | [number, number]
  closeOnContentClick: boolean
  style: StyleValue
  class: any
  height: string | number
  maxHeight: string | number
  maxWidth: string | number
  minHeight: string | number
  minWidth: string | number
  width: string | number
  eager: boolean
  locationStrategy: 'static' | 'connected' | any
  origin: any | 'auto' | 'overlap'
  offset: string | number | number[]
  transition:
    | string
    | boolean
    | (TransitionProps & { component: Component })
  attach: string | boolean | Element
  'v-slots': {
    activator:
      | false
      | ((arg: {
      isActive: boolean
      props: Record<string, any>
    }) => VNodeChild)
    default: false | (() => VNodeChild)
    actions: false | ((arg: { isActive: Ref<boolean> }) => VNodeChild)
    text: false | (() => VNodeChild)
  }
  'v-slot:default': false | (() => VNodeChild)
  'v-slot:activator':
    | false
    | ((arg: {
    isActive: boolean
    props: Record<string, any>
  }) => VNodeChild)
  key: string | number | symbol
  ref: VNodeRef
  ref_for: boolean
  ref_key: string
  onVnodeBeforeMount: any
  onVnodeMounted: any
  onVnodeBeforeUpdate: any
  onVnodeUpdated: any
  onVnodeBeforeUnmount: any
  onVnodeUnmounted: any
  'v-slot:actions':
    | false
    | ((arg: { isActive: Ref<boolean> }) => VNodeChild)
  'v-slot:text': false | (() => VNodeChild)
}
