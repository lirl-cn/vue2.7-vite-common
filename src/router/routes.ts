import type { RouteConfig } from 'vue-router'
export interface ownRouteConfig extends Omit<RouteConfig, 'component' | 'children'> {
  component?: string | { template: string }
  title?: string
  icon?: string
  hideInMenu?: boolean
  hideChildrenInMenu?: boolean
  children?: ownRouteConfig[]
}
const routes: ownRouteConfig[] = [
  {
    path: '/home',
    name: 'home',
    title: 'home',
    component: '/home/index',
  },
  {
    path: '/about',
    name: 'about',
    title: 'about',
    component: '/about/index',
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '*',
    title: '404，你的页面走丢了',
    component: '/404',
  },
]

export default routes