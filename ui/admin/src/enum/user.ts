/**
 * 用户性别
 */
export enum UserSex {
  M = '男',
  F = '女',
  N = '保密'
}

/**
 * 用户更新类型
 */
export enum UpdateType {
  PWD = '修改密码',
  USER_INFO = '修改用户附加信息',
  EMAIL = '修改邮箱信息',
  PHONE = '修改手机号',
  VIEW_FACE = '查看用户人脸信息'
}

export enum UserRole {
  ADMIN = '管理员',
  USER = '普通用户'
}

export enum UserEnable {
  Y = '启用',
  N = '禁用'
}
