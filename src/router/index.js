import Vue from 'vue';
import VueRouter from 'vue-router';

//store
import store from '../store';

//components
import Home from '../views/main/Home.vue';
import DefaultLayout from "../layouts/DefaultLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../views/auth/Login";
import Signup from "../views/auth/Signup";
import UserLayout from "../layouts/UserLayout";
import ProductLayout from "../layouts/ProductLayout";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Default',
    redirect: 'home',
    component: DefaultLayout,
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home
      },
      {
        path: 'man',
        name: 'Man',
        component: () => import('../views/main/Man')
      },
      {
        path: 'woman',
        name: 'Woman',
        component: () => import('../views/main/Woman')
      },
      {
        path: 'sale',
        name: 'Sale',
        component: () => import('../views/main/Sale')
      },
      {
        path: 'search',
        name: 'Search',
        component: () => import('../views/main/Search')
      },
      {
        path: 'product',
        name: 'Product',
        component: ProductLayout,
        children: [
          {
            path: ':id',
            name: 'ProductView',
            component: () => import('../views/main/ProductView')
          }
        ]
      },
      {
        path: 'user',
        name: 'User',
        component: UserLayout,
        children: [
          {
            path: 'cart',
            name: 'Cart',
            component: () => import('../views/user/Cart'),
            meta: {
              requiresAuth: true
            }
          },
          {
            path: 'favorite',
            name: 'Favorite',
            component: () => import('../views/user/Favorite'),
            meta: {
              requiresAuth: true
            }
          },
          {
            path: 'profile',
            name: 'Profile',
            component: () => import('../views/user/Profile'),
            meta: {
              requiresAuth: true
            }
          },
          {
            path: 'address',
            name: 'Address',
            component: () => import('../views/user/Address'),
            meta: {
              requiresAuth: true
            }
          },
          {
            path: 'order',
            name: 'Order',
            component: () => import('../views/user/Order'),
            meta: {
              requiresAuth: true
            }
          }
        ]
      }
    ],
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'signup',
        name: 'Signup',
        component: Signup
      }
    ]
  },
  {
    path: '/login',
    redirect: '/auth/login'
  },
  {
    path: '/signup',
    redirect: '/auth/signup'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('ACCESS_TOKEN')) {
      next();
      return
    }
    next('/login');
  } else if (!!localStorage.getItem('ACCESS_TOKEN') && (to.name === 'Login' || to.name === 'Signup')) {
    next('/home');
  } else {
    next();
  }
});

export default router;
