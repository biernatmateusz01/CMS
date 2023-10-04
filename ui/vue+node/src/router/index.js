import { createRouter, createWebHistory } from 'vue-router'
import SingleProduct from '../components/pages/SingleProduct.vue'
import SingleWorld from '../components/SingleWorld.vue'
import AddSong from '../components/AddSong.vue'
import Languages from '../components/pages/Languages.vue'
import Carriers from '../components/pages/Carriers.vue'
import Statuses from '../components/pages/Statuses.vue'
import Preferences from '../components/pages/Preferences.vue'
import Details from '../components/pages/Details.vue'
import User from '../components/pages/User.vue'
import HelloWorld from '../components/HelloWorld.vue'
import Login from '../components/pages/Login.vue'
import CreateCarrier from '../components/pages/CreateCarrier.vue'
import CreateLang from '../components/pages/CreateLang.vue'
import Clients from '../components/pages/Clients.vue'
import Payments from '../components/pages/Payments.vue'






const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/products', // Redirect from '/' to '/products'
    },
    {
      path: '/add',
      name: 'add',
      component: AddSong,
    },
    {
      path: '/products',
      name: 'product',
      component: HelloWorld,
    },
    {
      path: '/product',
      children: [
        {
          path: ':id',
          name: 'song',
          component: HelloWorld,
        },
      ],
    },
    {
      path: '/langs',
      name: 'langs',
      component: Languages,
    },
    {
      path: '/lang/:id',
      name: 'createlang',
      component: CreateLang,
    },
    {
      path: '/carriers',
      name: 'carriers',
      component: Carriers,
    },
    {
      path: '/carriers/:id',
      name: 'createcarrier',
      component: CreateCarrier,
    },
    {
      path: '/statuses',
      name: 'statuses',
      component: Statuses,
    },
    {
      path: '/preferences',
      name: 'preferences',
      component: Preferences,
    },
    {
      path: '/details',
      name: 'details',
      component: Details,
    },
    {
      path: '/user',
      name: 'user',
      component: User,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/clients',
      name: 'clients',
      component: Clients,
    },
    {
      path: '/payments',
      name: 'payments',
      component: Payments,
    },
  ],
});


export default router