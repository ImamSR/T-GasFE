import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Admin from '../pages/Admin/Admin.vue';
import Product from '../pages/Admin/Product.vue';
import Main from "@/pages/Main.vue";
import ProductCreate from "@/pages/Admin/ProductCreate.vue";
import ProductEdit from "@/pages/Admin/ProductEdit.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/Admin',
    component: Admin,
    children: [
      { path: 'Product', component: Product },
      { path: 'Product/ProductCreate', component: ProductCreate},
      { path: 'Product/:id/ProductEdit', component: ProductEdit},
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
