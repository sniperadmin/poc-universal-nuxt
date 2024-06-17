import {
  type ILogin,
  type ILogout,
  type ISignUp,
  type ICreds,
} from '@/utils/types'

export const useRestAuthComposables = () => {
  const loginWithCreds: ILogin = (credentials: ICreds) => {
    return Promise.reject('Not Implemented yet')
  }
  const signUpWithCreds: ISignUp = (credentials: ICreds) => {
    return Promise.reject('Not Implemented yet')
  }
  const logout: ILogout = () => {
    return Promise.reject('Not Implemented yet')
  }

  return {
    loginWithCreds,
    signUpWithCreds,
    logout
  }
}
