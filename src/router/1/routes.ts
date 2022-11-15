import type { RouteConfig } from "vue-router";
export interface ownRouteConfig
  extends Omit<RouteConfig, "component" | "children"> {
  component?: string | any;
  title?: string;
  hideInMenu?: boolean;
  hideChildrenInMenu?: boolean;
  children?: ownRouteConfig[];
}
const routes: ownRouteConfig[] = [
  {
    path: "/",
    title: "首页",
    name: "home",
    component: () => import("@/layouts/portal-layout.vue"),
    children: [
      {
        path: "/",
        redirect: "/home",
      },
      {
        path: "/home",
        name: "portal-home",
        title: "首页",
        component: () => import("@/views/portal/home/index.vue"),
      },
      // {
      //   path: "/data-source",
      //   name: "portal-data-source",
      //   title: "数据资源",
      //   component: "@/layouts/empty-layout.vue",
      //   children: [
      //     {
      //       path: "/data-source/data-menu",
      //       component: "/portal/data-source/data-menu/index",
      //       name: "portal-data-source-data-menu",
      //       meta: {
      //         title: "数据资源目录",
      //       },
      //     },
      //     {
      //       path: "/data-source/open-menu",
      //       name: "portal-data-source-open-menu",
      //       component: "@/layouts/empty-layout.vue",
      //       meta: {
      //         title: "数据开放目录",
      //       },
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: "/data-source/open-menu",
      //           redirect: "/data-source/open-menu/abstracts",
      //         },
      //         {
      //           path: "/data-source/open-menu/abstracts",
      //           name: "portal-data-source-open-menu-abstracts",
      //           meta: {
      //             title: "数据开放目录",
      //           },
      //           component: "/portal/data-source/open-menu/abstracts/index",
      //         },
      //         {
      //           path: "/data-source/open-menu/list",
      //           name: "portal-data-source-open-menu-list",
      //           meta: {
      //             title: "数据开放目录",
      //           },
      //           component: "/portal/data-source/open-menu/list/index",
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   path: "/solution",
      //   component: "@/layouts/empty-layout.vue",
      //   name: "portal-solution",
      //   hideChildrenInMenu: true,
      //   meta: {
      //     title: "应用场景解决方案",
      //   },
      //   children: [
      //     {
      //       path: "/solution",
      //       redirect: { name: "portal-solution-abstracts" },
      //     },
      //     {
      //       path: "/solution/abstracts",
      //       name: "portal-solution-abstracts",
      //       component: "/portal/solution/abstracts/index",
      //     },
      //     {
      //       path: "/solution/list",
      //       name: "portal-solution-list",
      //       component: "/portal/solution/list/index",
      //     },
      //   ],
      // },
      // {
      //   path: "/data-services",
      //   component: "@/layouts/empty-layout.vue",
      //   name: "portal-data-services",
      //   meta: {
      //     title: "数据服务应用",
      //   },
      //   hideChildrenInMenu: true,
      //   children: [
      //     {
      //       path: "/data-services",
      //       redirect: "/data-services/abstracts",
      //     },
      //     {
      //       path: "/data-services/abstracts",
      //       name: "portal-data-services-abstracts",
      //       component: "/portal/data-services/apiService",
      //     },
      //     {
      //       path: "/data-services/ApiDetails",
      //       name: "portal-data-services-ApiDetails",
      //       component: "/portal/data-services/apiDetails",
      //     },
      //     // {
      //     //   path: '/data-services/apiServiceDetails',
      //     //   name: 'portal-data-services-ApiServiceDetails',
      //     //   component: ApiServiceDetails
      //     // },
      //   ],
      // },
      // {
      //   path: "/help",
      //   name: "portal-help",
      //   meta: {
      //     title: "帮助中心",
      //   },
      //   component: "@/layouts/empty-layout.vue",
      //   children: [
      //     {
      //       path: "/help/data-explore-apply",
      //       component: "/portal/help/explore-apply/index",
      //       name: "portal-help-data-explore-apply",
      //       hideChildrenInMenu: true,
      //       meta: {
      //         title: "数据探索性分析",
      //       },
      //     },
      //     {
      //       path: "/help/data-apply",
      //       component: "/portal/help/apply/index",
      //       name: "portal-help-data-apply",
      //       hideChildrenInMenu: true,
      //       meta: {
      //         title: "数据使用申请",
      //       },
      //     },
      //     {
      //       path: "/help/doc",
      //       component: "@/layouts/empty-layout.vue",
      //       name: "portal-help-doc",
      //       meta: {
      //         title: "帮助文档",
      //       },
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: "/help/doc",
      //           redirect: "/help/doc/list",
      //         },
      //         {
      //           path: "/help/doc/list",
      //           component: "/portal/help/doc/index",
      //           name: "portal-help-doc-list",
      //           meta: {
      //             title: "帮助文档",
      //           },
      //         },
      //         {
      //           path: "/help/doc/read-knowledge",
      //           component: "/portal/help/doc/read-img/index",
      //           name: "portal-help-doc-knowledge",
      //           meta: {
      //             title: "一图读懂",
      //           },
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   path: "/message-reminder",
      //   component: "/portal/message-reminder/index",
      //   name: "portal-message-reminder",
      //   hideInMenu: true,
      //   meta: {
      //     title: "消息中心",
      //   },
      // },
      // {
      //   path: "/certification",
      //   component: "/portal/certification/index",
      //   name: "portal-certification",
      //   hideInMenu: true,
      //   meta: {
      //     title: "企业认证",
      //   },
      // },
    ],
  },
  // {
  //   path: "/login",
  //   name: "login",
  //   title: "首页",
  //   component: "/user/login/index.vue",
  // },
  // {
  //   path: "/backend",
  //   name: "backend",
  //   title: "首页",
  //   component: "@/layouts/backend/index.vue",
  //   children: [
  //     {
  //       path: "/backend/home",
  //       name: "backend-home",
  //       title: "首页",
  //       component: "/backend/index.vue",
  //     },
  //   ],
  // },
  // {
  //   path: "*",
  //   title: "404，你的页面走丢了",
  //   component: "/404.vue",
  // },
];

export default routes;
