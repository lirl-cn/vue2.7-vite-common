const config:DEFAULT_CONFIG_PROPS = {
  title: '欢迎使用vite vue2.x',  // 
  navWidth: '200px',  // 左侧菜单宽度
  navBackgroundColor: '#000', // 左侧菜单背景颜色
  navTextColor: '#fff', // 左侧菜单文字颜色
  navActiveTextColor: '#ffd04b',  // 左侧菜单选中颜色
  proxyBaseUrl: '/open/the/portal/api',  // 项目接口前缀（转发前缀标识）
  proxyTargetUrl: 'http://10.16.22.38:36005/',  // 接口转发地址
  tokenName: 'JTK', // token key
  needFetchOtherMenuData: true,
}
export default config