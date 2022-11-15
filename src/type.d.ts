interface objAny {
  [x: string]: any
}
interface objString {
  [x: string|number]: string
}

declare type OwnResponseType<T = any> = {
  code: number;
  success: boolean;
  data: T;
  page?: any;
  msg: string;
}

declare type DEFAULT_CONFIG_PROPS = {
  title: string,  // 
  navWidth: string | number,  // 左侧菜单宽度
  navBackgroundColor: string, // 左侧菜单背景颜色
  navTextColor: string, // 左侧菜单文字颜色
  navActiveTextColor: string,  // 左侧菜单选中颜色
  proxyBaseUrl: string,  // 项目接口前缀（转发前缀标识）
  proxyTargetUrl: string,  // 接口转发地址
  tokenName: string, // token key
  needFetchOtherMenuData: boolean, // 是否需要请求获取额外的路由数据
}

declare const DEFAULT_CONFIG:DEFAULT_CONFIG_PROPS