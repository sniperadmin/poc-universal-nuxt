import { describe, expect, beforeEach, afterEach, it, vi } from 'vitest'
import firebase from 'firebase/app'

const useFirebase = vi.fn().mockImplementation(() => ({
  firebaseApp: vi.spyOn(firebase, 'initializeApp'),
  firebaseAuth: vi.fn(),
  firestore: vi.fn
}))

const initFirebaseApi = vi.fn().mockImplementation(() => ({
  useFirebaseAuthComposables: vi.fn()
}))

vi.mock('./index', () => ({
  useFirebase,
  initFirebaseApi
}))

describe('firebase', () => {
  afterEach(() => {
    // vi.clearAllMocks()
    vi.resetAllMocks()
  })

  it('should random test', () => {
    expect(useFirebase).toBeDefined()
    expect(initFirebaseApi).toBeDefined()
  });
})
