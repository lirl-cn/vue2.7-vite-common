import Cookies from 'js-cookie';
import moment from 'moment';
import defaultConfig from '@@/config/defaultConfig';
// import { fetchUserLogoutApi } from '@/services'
import store from '@/store';

export const clearToken = async(isFetch = true) => {
  if(isFetch){
    // await fetchUserLogoutApi()
  }
  store.commit('message/updateNeedPolling', false);
  store.commit("resetStore");

  Cookies.remove(defaultConfig.tokenName);
  Cookies.remove(`${defaultConfig.tokenName}-tokenExpired`);
  Cookies.remove(`${defaultConfig.tokenName}-refreshToken`);

  localStorage.removeItem('open-portal-token')
  localStorage.removeItem('open-portal-refreshToken')
  localStorage.removeItem('open-portal-tokenExpired')
  localStorage.removeItem('open-portal-user-company-name')
  localStorage.removeItem('open-portal-user-info')
}

export const removeToken = ():void => {
  Cookies.remove(defaultConfig.tokenName);
}

export const getCookies = (name:string):string | undefined => {
  return Cookies.get(name);
}

export const setCookies = (name:string, token:string):void => {
  Cookies.set(name, token);
}

export const getToken = ():string | undefined => {
  return getCookies(defaultConfig.tokenName);
}

export const getTokenExpired = ():string | undefined => {
  return getCookies(`${defaultConfig.tokenName}-tokenExpired`);
}

export const setToken = (token:string, tokenExpired: number | string, refreshToken?: string):void => {
  setCookies(defaultConfig.tokenName, token);
  setCookies(`${defaultConfig.tokenName}-tokenExpired`, String(tokenExpired));
  refreshToken && setCookies(`${defaultConfig.tokenName}-refreshToken`, refreshToken);
}

// info
export const setInfo = (info:any) => {
  if(Object.prototype.toString.call(info) === '[object Object]'){
    localStorage.setItem("open-portal-user-company-name", info.enterpriseName);
    localStorage.setItem("open-portal-user-info", JSON.stringify(info));
  }
}

/**
 * 判断当前用户是否登录或登录是否失效
 * @returns boolean
 */
 export const isHasAuth = () => {
  const token = getToken()
  if(!token) return false
  const tokenExpired = Number(getTokenExpired())
  const now = moment().valueOf()
  // console.log(tokenExpired, now)
  return tokenExpired > now;
}


export const getInfo = () => {
  if(!isHasAuth()){
    return {}
  }
  const infoStr = localStorage.getItem("open-portal-user-info");
  return infoStr ? JSON.parse(infoStr) : {};
}