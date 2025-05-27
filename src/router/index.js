import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'
import GuestLayout from '@/views/layouts/GuestLayout.vue'
import MainLayout from '@/views/layouts/MainLayout.vue'
import CreateView from '@/views/CreateView.vue'
import DetailView from '@/views/DetailView.vue'
import EditView from '@/views/EditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true, layout: MainLayout },
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView,
      meta: { requiresAuth: true, layout: MainLayout },
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailView,
      meta: { requiresAuth: true, layout: MainLayout },
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditView,
      meta: { requiresAuth: true, layout: MainLayout },
    },
    { path: '/login', component: LoginView, meta: { layout: GuestLayout } },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.token) {
    next('/login')
  } else {
    next()
  }
})

export default router
