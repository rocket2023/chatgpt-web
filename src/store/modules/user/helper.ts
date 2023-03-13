import { ss } from '@/utils/storage'

const LOCAL_NAME = 'userStorage'
const TOKEN_KEY = 'userToken'

export interface UserInfo {
  apikey: string
  apiaccesstoken: string
  avatar: string
  email: string
  name: string
  status: number
}

export interface UserState {
  userInfo: UserInfo
}

export function defaultUserState(): UserState {
  return {
    userInfo: {
      apikey: '',
      apiaccesstoken: '',
      avatar: '',
      name: '',
      email: '',
      status: 0,
    },
  }
}

export function getUserState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultUserState(), ...localSetting }
}

export function setUserState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}

export function removeUserState(): void {
  ss.set(LOCAL_NAME, '')
}

export function getUserToken(): string {
  return ss.get(TOKEN_KEY)
}

export function setUserToken(token: string): void {
  ss.set(TOKEN_KEY, token)
}

export function removeUserToken(): void {
  ss.set(TOKEN_KEY, '')
}
