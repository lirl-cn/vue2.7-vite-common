import { extend } from "umi-request";
import type {RequestOptionsInit} from 'umi-request'
import { message } from "ant-design-vue";
// import 'yet-another-abortcontroller-polyfill'
import { getToken,setToken,removeToken } from '@/utils/auth'
import defaultConfig from '@@/config/defaultConfig';
import { INVALID_STATUS, SUCCESS_STATUS, ERROR_CODE } from '@/constants/request';
import router from '@/router';
// console.log('env=>',import.meta.env);

const loading = {
  show(str: string) {
    this.hide = message.loading(str, 999)
  },
  hide() {},
}

const codeMaps = {
  // 200: '成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}
// !中止请求拦截器 实验...
const controller = new AbortController(); // 创建一个控制器
const { signal } = controller; // 返回一个 AbortSignal 对象实例，它可以用来 with/abort 一个 DOM 请求。
signal.addEventListener('abort', () => {
  console.log('aborted!');
});

const errorHandler = async (error: any) => {
  const { response, request } = error;
  if (!response || response.status === 500) {
    message.error('网络异常，请稍后再试！')
    return {};
  }
  if (response && response.status === 400) { // 兼容处理，后台接口在参数有误的情况下status返回400，但仍为有效接口
    return response.clone().json();
  }
  if (response && response.status === 403) {
    const json = await response.clone().json();
    // console.log('json', json)
    message.error(json.msg);
    return response.clone().json();
  }
  if (response && response.status === 401) {
    await removeToken();
    const result = await response.clone().json();
    message.error(result.msg || '登录过期，请重新登录');
    router.push('/login'); // 跳转到登录页
    // controller.abort();
    return response.clone().json();
  }
  return
}
const request = extend({
  prefix: defaultConfig.proxyBaseUrl,
  timeout: 1000 * 30,
  // withCredentials: true,
  errorHandler,
  // signal,
})

request.use(async (ctx, next) => {
  await next()
  // console.log(ctx)
  // responseType 为 blob时，不做处理
  if(ctx.req.options.responseType === 'blob'){

  }else{
    // 增加success字段，判断接口是否成功，code & 0b11111111 == 1则为成功
    ctx.res = ctx.res || {}
    ctx.res.success = (ctx.res.code & 1) === 1;
    // 增加errorCode字段，用于判断错误信息展示形式，0:message.error；1:form表单错误；
    ctx.res.errorCode = 0;
    if((ctx.res.code & 0b111111111111) === 0b000100000010){
      ctx.res.errorCode = 1;
    }
    if(!ctx.res.success && ctx.res.msg && ctx.res.errorCode === 0){ // (258 & 0b1111_1111_1111) === 0b0001_0000_0010
      message.error(ctx.res.msg)
    }
  }
})

// request拦截器
request.interceptors.request.use((url: string, options: RequestOptionsInit) => {
  if(options.responseType === 'blob' && options.download){
    loading.show('正在下载中...')
  }
  return {
    url,
    options: { ...options, headers: { ...options.headers, jtk: getToken() }, interceptors: true } as RequestOptionsInit,
  };
});
// response拦截器
request.interceptors.response.use(async (response, options) => {
  // if (options.responseType === 'blob') {
  //   return response
  // }
  // const result = await response.clone().json();
  if ((response.status >= 200 && response.status < 300) || response.status === 400) {
    const token = response.headers.get(defaultConfig.tokenName) || response.headers.get(defaultConfig.tokenName.toLocaleLowerCase()), tokenExpired = response.headers.get('jtke');
    // console.log('token->', token, tokenExpired)
    if (token && tokenExpired) {
      setToken(token, tokenExpired);
    }
  }
  if(options.responseType === 'blob' && options.download){
    if(response.status === SUCCESS_STATUS){
      const disposition = response.headers.get('Content-Disposition');
      const contentType = response.headers.get("content-type")
      let fileName:string | string[] = disposition ? disposition.split(';').filter(item => item.split('=')[0].trim() === 'fileName' || item.split('=')[0].trim() === 'filename') || [] : []
      fileName = fileName[0] ? fileName[0].split('=')[1] : '';
      // fileName = decodeURI(fileName, 'utf-8');
      fileName = decodeURIComponent(escape(fileName))
      const blob = await response.clone().blob()
      // console.log(blob)
      // console.log('response-->', options, response, disposition, fileName)
      // const file = new Blob([response.body]) // this is not working
      // return
      let URL = window.URL || window.webkitURL
      let objectUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      if (typeof a.download === 'undefined') {
        window.open(objectUrl)
        loading.hide()
      } else {
        a.href = objectUrl
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        a.remove();
        loading.hide()
        message.success(`${fileName} 已下载完成`);
      }
      window.URL.revokeObjectURL(objectUrl)
    }else{
      loading.hide()
      message.error('下载失败');
    }
  }

  return response
});

export default request;
