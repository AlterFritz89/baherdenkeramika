import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../views/Home.vue') },
  { path: '/about', component: () => import('../views/About.vue') },
  { path: '/products', component: () => import('../views/Products.vue') },
  { path: '/products/tiles', component: () => import('../views/ProductsTiles.vue') },
  { path: '/products/sanitaryware', component: () => import('../views/ProductsSanitaryware.vue') },
  { path: '/contact', component: () => import('../views/FeedbackForm.vue') },
  { path: '/feedbackform', component: () => import('../views/FeedbackForm.vue') },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router