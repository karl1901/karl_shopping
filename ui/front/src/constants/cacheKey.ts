const SYSTEM_NAME = 'admin'

/** 缓存数据时用到的 Key */
class CacheKey {
  static TOKEN = `${SYSTEM_NAME}-token`
  static SIDEBAR_STATUS = `${SYSTEM_NAME}-sidebar-status`
  static ACTIVE_THEME_NAME = `${SYSTEM_NAME}-active-theme-name`
}

export default CacheKey
