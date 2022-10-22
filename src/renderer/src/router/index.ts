import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// 2. 配置路由
const routes: Array<RouteRecordRaw> = [
  {
    path: "/bookshelf",
    component: () => import("../pages/BookShelf.vue"),
  },
  {
    path: "/search",
    component: () => import("../pages/Search.vue"),
  },
  {
    path: "/book",
    component: () => import("../pages/Book.vue"),
  },
  {
    path: "/demo",
    component: () => import("../components/Demo.vue"),
  }
];
// 1.返回一个 router 实列，为函数，里面有配置项（对象） history
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };

// 3导出路由   然后去 main.ts 注册 router.ts
