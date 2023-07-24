import store from '@/store'
import { defineStore } from 'pinia'
import { usePermissionStore } from './permission'
import router, { resetRouter } from '@/router'
import {
  loginApi,
  loginByEmailApi,
  getUserInfoApi,
  logoutApi,
  loginByUserFaceApi,
  type LoginResponseData,
  type LoginRequestByUnameData,
  type LoginRequestByMailData
} from '@/api/login'
import { type RouteRecordRaw } from 'vue-router'
import { useTagsViewStore } from './tags-view'
const storage = useStorage()

type UserInfo = Pick<LoginResponseData['user'], keyof LoginResponseData['user']>

export const useUserStore = defineStore('user', {
  state: () => {
    const token = ref<string>(storage.get('token') || '')
    const roles = ref<string[]>([])

    const userInfo = ref<UserInfo | null>(null)
    const isLogin = ref<boolean>(storage.get('isLogin') || false)
    const tagsViewStore = useTagsViewStore()

    const setIsLogin = (value: boolean) => {
      storage.set('isLogin', value)
    }

    /** 设置角色数组 */
    const setRoles = (value: string[]) => {
      roles.value = value
    }

    /** 登录 */
    const login = (loginData: LoginRequestByUnameData) => {
      return new Promise<IApiResponseData>((resolve, reject) => {
        loginApi(loginData)
          .then((res) => {
            setIsLogin(true)
            resolve(res)
          })
          .catch((error) => {
            setIsLogin(false)
            reject(error)
          })
      })
    }

    /** 邮箱登录 */
    const loginByEmail = (loginData: LoginRequestByMailData) => {
      return new Promise<IApiResponseData>((resolve, reject) => {
        loginByEmailApi(loginData)
          .then((res) => {
            setIsLogin(true)
            resolve(res)
          })
          .catch((error) => {
            setIsLogin(false)
            reject(error)
          })
      })
    }
    const loginByUserFace = (uid: number) => {
      return new Promise<IApiResponseData>((resolve, reject) => {
        loginByUserFaceApi({ userFace: { uid } })
          .then((res) => {
            setIsLogin(true)
            resolve(res)
          })
          .catch((error) => {
            setIsLogin(false)
            reject(error)
          })
      })
    }

    /** 获取用户*/
    const getInfo = () => {
      return new Promise((resolve, reject) => {
        getUserInfoApi()
          .then(({ resultData }) => {
            setRoles([resultData?.user.role as string])
            userInfo.value = resultData?.user as UserInfo
            setIsLogin(true)
            resolve(true)
          })
          .catch((error) => {
            resetState()
            reject(error)
          })
      })
    }

    /** 登出 */
    const logout = () => {
      return new Promise((resolve, reject) => {
        logoutApi()
          .then(() => {
            token.value = ''
            resetState()
            resetRouter()
            _resetTagsView()
            resolve(true)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
    /** 重置 Token */
    const resetToken = () => {
      storage.remove('token')
      resetState()
    }

    const resetState = () => {
      roles.value = []
      setIsLogin(false)
      userInfo.value = null
    }

    /** 重置 tagsView */
    const _resetTagsView = () => {
      tagsViewStore.delAllVisitedViews()
      tagsViewStore.delAllCachedViews()
    }

    return { token, roles, setRoles, login, getInfo, loginByUserFace, logout, resetToken, resetState, userInfo, isLogin, loginByEmail }
  },
  actions: {
    // 获取用户信息
    async getUserInfo() {
      try {
        const res = await this.getInfo()
        // this.userInfo = res.data.user_info
        return res
      } catch (error) {
        console.error(error)
      }
    }
  }
})
/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
