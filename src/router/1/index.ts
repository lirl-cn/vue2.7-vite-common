import Vue from "vue";
import VueRouter from "vue-router";
import routes, { ownRouteConfig } from "./routes";
// import { fetchSysMenuNavApi } from '@/services';
import { flatArray } from "@/utils";

// 注册路由插件
Vue.use(VueRouter);

const formatRoutes = (routes: ownRouteConfig[]) => {
  return routes.map((route: ownRouteConfig) => {
    // const newRoute = JSON.parse(JSON.stringify(route));
    const newRoute = route;
    if (route.children) {
      newRoute.children = formatRoutes(route.children);
    }
    if (newRoute.component) {
      const component = route?.component || "";
      newRoute.component =
        typeof newRoute.component === "string"
          ? () => {
              if (component.indexOf("@/") === 0) {
                const path = component.replace("@/", "../");
                return import(/* @vite-ignore */ path);
              } else if (component.indexOf("/") === 0) {
                const path = component.replace("/", "../views/");
                return import(/* @vite-ignore */ path);
              } else {
                return import(/* @vite-ignore */ route.component as string);
              }
            }
          : route.component;
    }
    return newRoute;
  });
};

const router = new VueRouter({
  mode: "history",
  routes: formatRoutes(routes),
  // routes,
});
const constRouter: ownRouteConfig[] = [
  {
    path: "/test",
    component: "portal/home/index",
    name: "portal-data-source-data-menu",
  },
];
// @/views/portal/home/index.vue
createRouterList(constRouter);
function createRouterList(arr: any): void {
  // const addRoutes = arr.forEach((item: any) => {
  //   if (item.component != "Layout") {
  //     //router4.x后需要用addRoute添加路由
  //     // router.addRoutes({
  //     //   path: item.path,
  //     //   name: item.name,
  //     //   component: modules[`../views/${item.component}.vue`],
  //     // });
  //   }
  //   if (item.children && item.children.length) {
  //     createRouterList(item.children);
  //   }
  // });
  let modules = import.meta.glob("../views/**/*.vue");

  const addRoutes = constRouter.map((item) => {
    if (item.component != "Layout") {
      item.component = modules[`../views/${item.component}.vue`];
    }
    return item;
  });

  router.addRoutes(addRoutes);
}

// 是否已经请求过异步路由
const isAddDynamicMenuRoutes = false;
// 保存所有本地静态路由name
const allStaticRouteNames = flatArray(routes).map(({ name }) => name);
// router.beforeEach(async (to, from, next) => {
//   // console.log(to)
//   // 如果不需要加载异步路由或者已经加载异步路由或者是本地静态路由直接next
//   if (
//     !DEFAULT_CONFIG.needFetchOtherMenuData ||
//     isAddDynamicMenuRoutes ||
//     allStaticRouteNames.indexOf(to.name) !== -1
//   ) {
//     next();
//   } else {
//     // const response = await fetchSysMenuNavApi();
//     // if(response.success){
//     //   const { menuList, homeMenu, permissions } = response.data;
//     //   sessionStorage.setItem('menuList', JSON.stringify(menuList));
//     //   sessionStorage.setItem('homeMenu', JSON.stringify(homeMenu));
//     //   sessionStorage.setItem('permissions', JSON.stringify(permissions));
//     //   // todo 加载异步路由 menuList
//     // }
//     next();
//   }
// });
export default router;
