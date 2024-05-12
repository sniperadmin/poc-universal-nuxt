import { describe, expect, test } from 'vitest'

import type { ICreds, ILogin, ISignUp, ILogout, IFirebaseApi, IRestApi } from './index';

describe('Types', () => {
  test('ICreds type', () => {
    const creds: ICreds = { email: 'test@example.com', password: 'password' };
    expect(creds).toEqual({ email: 'test@example.com', password: 'password' });
  });

  test('ILogin type', () => {
    const login: ILogin = async (cred: ICreds) => {
      // Mock implementation
      return Promise.resolve(undefined);
    };
    expect(typeof login).toBe('function');
  });

  test('ISignUp type', () => {
    const signUp: ISignUp = async (cred: ICreds) => {
      // Mock implementation
      return Promise.resolve(undefined);
    };
    expect(typeof signUp).toBe('function');
  });

  test('ILogout type', () => {
    const logout: ILogout = async () => {
      // Mock implementation
    };
    expect(typeof logout).toBe('function');
  });

  test('IFirebaseApi type', () => {
    const firebaseApi: IFirebaseApi = {
      loginWithCreds: async (cred: ICreds) => Promise.resolve(undefined),
      signUpWithCreds: async (cred: ICreds) => Promise.resolve(undefined),
      logout: async () => {},
    };
    expect(firebaseApi).toBeDefined();
  });

  test('IRestApi type', () => {
    const restApi: IRestApi = {
      loginWithCreds: async (cred: ICreds) => Promise.resolve(undefined),
      signUpWithCreds: async (cred: ICreds) => Promise.resolve(undefined),
      logout: async () => {},
    };
    expect(restApi).toBeDefined();
  });
});
