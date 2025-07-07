import { createWebHistory, createRouter } from 'vue-router'

import Waterfall from '@/pages/Waterfall.vue';
import Table from '@/pages/Table.vue';

const routes = [
  { path: '/', component: Waterfall, name: 'home' },
  { path: '/table', component: Table,  name: 'table' }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
