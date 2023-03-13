import { defineStore } from 'pinia'
import type { UserInfo, UserState } from './helper'
import { getUserState, setUserState } from './helper'
import { fetchUsetInfo } from '@/api'

export const useUserStore = defineStore('user-store', {
  state: (): UserState => getUserState(),
  actions: {
    getUserInfo() {
      fetchUsetInfo().then((res) => {
        if (res.status === 'Success') {
          const userInfo = {
            avatar: res.data.avatar,
            name: res.data.name,
            email: res.data.email,
            status: res.data.status,
          }
          this.userInfo = userInfo
          setUserState({ userInfo })
          this.recordState()
        }
      })
    },

    updateUserInfo(userInfo: Partial<UserInfo>) {
      this.userInfo = { ...this.userInfo, ...userInfo }
      this.recordState()
    },

    resetUserInfo() {
      this.userInfo = {
        avatar: '',
        name: '',
        email: '',
        status: 0,
      }
    },

    recordState() {
      setUserState(this.$state)
    },
  },
})
