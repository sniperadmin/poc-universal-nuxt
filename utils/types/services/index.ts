export interface ICreds {
  name?: string
  email: string
  password: string
}

export type ILogin = (cred: ICreds) => Promise<unknown>
export type ISignUp = (cred: ICreds) => Promise<unknown>
export type ILogout = () => Promise<void>

export interface IFirebaseApi {
  loginWithCreds: ILogin
  signUpWithCreds: ISignUp
  logout: ILogout
}

export interface IRestApi {
  loginWithCreds: ILogin
  signUpWithCreds: ISignUp
  logout: ILogout
}
