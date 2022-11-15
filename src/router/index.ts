import Vue from "vue";
import VueRouter from "vue-router";
import routes, { ownRouteConfig } from "./routes";
// import { fetchSysMenuNavApi } from '@/services';
import { flatArray } from '@/utils';

// 注册路由插件
Vue.use(VueRouter); 

const viewModules = import.meta.glob("../views/**/*");
const layoutModules = import.meta.glob("../layouts/**/*");
// console.log(viewModules, layoutModules);

const formatRoutes = (routes: ownRouteConfig[]) => {
  return routes.map((route: ownRouteConfig) => {
    const newRoute = JSON.parse(JSON.stringify(route));
    newRoute.meta = {
      icon: newRoute.icon,
      title: newRoute.title,
      ...newRoute.meta,
    }
    if (newRoute.children) {
      newRoute.children = formatRoutes(newRoute.children);
    }
    if (newRoute.component) {
      if(typeof newRoute.component === 'string'){
        if(newRoute.component.indexOf("@/views") === 0){
          newRoute.component = viewModules[`${newRoute.component.replace("@/", "../")}.vue`] || viewModules[`${newRoute.component.replace("@/", "../")}.tsx`];
        }else if(newRoute.component.indexOf("@/layouts") === 0){
          newRoute.component = layoutModules[`${newRoute.component.replace("@/", "../")}.vue`] || layoutModules[`${newRoute.component.replace("@/", "../")}.tsx`];
        }else{
          newRoute.component = viewModules[`../views${newRoute.component}.vue`] || viewModules[`../views${newRoute.component}.tsx`];
        }
      }
    }
    return newRoute;
  });
};
// console.log(formatRoutes(routes))
const router = new VueRouter({
  mode: "history",
  routes: formatRoutes(routes),
});
// const _r = formatRoutes(routes)
// console.log(_r)
// router.addRoutes(_r)
// 是否已经请求过异步路由
const isAddDynamicMenuRoutes = false;
// 保存所有本地静态路由name
const allStaticRouteNames = () => flatArray(routes).map(({name}) => name);
router.beforeEach(async (to, from, next) => {
  // console.log(to)
  // 如果不需要加载异步路由或者已经加载异步路由或者是本地静态路由直接next
  if(!DEFAULT_CONFIG.needFetchOtherMenuData || isAddDynamicMenuRoutes || allStaticRouteNames().indexOf(to.name) !== -1){
    next()
  }else{
    // const response = await fetchSysMenuNavApi();
    // if(response.success){
    //   const { menuList, homeMenu, permissions } = response.data;
    //   sessionStorage.setItem('menuList', JSON.stringify(menuList));
    //   sessionStorage.setItem('homeMenu', JSON.stringify(homeMenu));
    //   sessionStorage.setItem('permissions', JSON.stringify(permissions));
    //   // todo 加载异步路由 menuList
    // }
    next()
  }
})
export default router;