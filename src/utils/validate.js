/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  var reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
  return reg.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/.test(s)
}

/**
 * IP地址
 * @param {*} s
 */
/*export function isIP (s) {
  return /(?=(\b|\D))(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))/.test(s)
}*/
export function isIP (s) {
  return /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/.test(s)
}


/**
 * 端口号
 * @param {*} s
 */
export function isPort (s) {
  return /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(s)
}

/**
 * 检测密码强度
 * @param pwd
 */
export function getPwdScore (pwd) {
  var modes = 0
  //正则表达式验证符合要求的
  if (pwd.length >20) {
    return 0
  }
  if (pwd.length < 8) {
    return modes
  }
  if (/\d/.test(pwd)) {
    //数字
    modes++
  }
  if (/[a-z]/.test(pwd)) {
    //小写
    modes++
  }
  if (/[A-Z]/.test(pwd)) {
    //大写
    modes++
  }
  if (/\W/.test(pwd)) {
    //特殊字符
    modes++
  }
  return modes
}

/**
 *检测oracle地址格式
 * @param s
 * @returns {boolean}
 */
/*
export function isOracle (s) {
  return /^(jdbc:oracle:thin:@).+/.test(s)
}

/!**
 * 检测mysql地址格式
 *
 * @param s
 * @returns {boolean}
 *!/
export function isMysql (s) {
  return /^(jdbc:mysql:).+/.test(s)
}
*/
