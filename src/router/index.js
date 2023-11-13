import { createRouter, createWebHistory } from 'vue-router'
import BlocksView from '../views/BlocksView.vue'
import PeersView from '../views/PeersView.vue'
import TransactionView from '../views/TransactionView.vue'

const routes = [
  {
    path: '/',
    name: 'blocks',
    component: BlocksView,
    props: true
  },
  {
    path: '/peers',
    name: 'peers',
    component: PeersView
  },
  {
    path: '/tx/:id',
    name: 'transaction',
    component: TransactionView
  }
  //{
  //  path: '/about',
  //  name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //  component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  //}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
