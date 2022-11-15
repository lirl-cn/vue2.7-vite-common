import moment from 'moment';
// import { fetchUserLogoutApi } from '@/services'
import store from '@/store';
export const setToken = (token, tokenExpired, refreshToken) => {
  localStorage.setItem('open-portal-token', token)
  localStorage.setItem('open-portal-refreshToken', refreshToken)
  localStorage.setItem('open-portal-tokenExpired', tokenExpired)
}
export const clearToken = async (isFetch = true) => {
  if (isFetch) {
    // await fetchUserLogoutApi()
  }
  store.commit('message/updateNeedPolling', false);
  localStorage.removeItem('open-portal-token')
  localStorage.removeItem('open-portal-refreshToken')
  localStorage.removeItem('open-portal-tokenExpired')
  localStorage.removeItem('open-portal-user-company-name')
  localStorage.removeItem('open-portal-user-info')
}
export const getToken = () => typeof localStorage.getItem("open-portal-token") === 'string' ? localStorage.getItem("open-portal-token") : ''
export const getTokenExpired = () => Number(localStorage.getItem("open-portal-tokenExpired"))
/**
 * 判断当前用户是否登录或登录是否失效
 * @returns boolean
 */
export const isHasAuth = () => {
  const token = getToken()
  // console.log('token', token)
  if (!token) return false
  const tokenExpired = getTokenExpired()
  const now = moment().valueOf()
  // console.log(tokenExpired, now)
  return tokenExpired > now;
}

// info
export const setInfo = (info) => {
  if (Object.prototype.toString.call(info) === '[object Object]') {
    localStorage.setItem("open-portal-user-company-name", info.enterpriseName);
    localStorage.setItem("open-portal-user-info", JSON.stringify(info));
  }
}

export const getInfo = () => {
  if (!isHasAuth()) {
    return {}
  }
  const infoStr = localStorage.getItem("open-portal-user-info");
  return infoStr ? JSON.parse(infoStr) : {};
}
