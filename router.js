import Vue from 'vue'
import Router from 'vue-router'
import App from '@/components/App';

//web
import home from '@/pages/home';
import productAdd from '@/pages/product/add'
import productEdit from '@/pages/product/edit'

import notFound from '@/pages/notFound.vue';

// auth
import login from '@/pages/auth/login';
import register from '@/pages/auth/register';


Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    linkActiveClass: 'nav-active',
    scrollBehavior(to) {
      if (to.hash) {
        return {
          selector: to.hash,
          behavior: "smooth"
        };
      }
    },
    routes: [
      {
        path: '/login',
        component: login,
        name: 'login'
      },
      {
        path: '/register',
        component: register,
        name: 'register'
      },
      {
        path: '',
        component: App,
        children: [
          {
            path: '',
            component: home,
            name: 'home'
          },
          {
            path: '/product/dodaj',
            component: productAdd,
            name: 'product.add'
          },
          {
            path: '/product/edytuj/:id',
            component: productEdit,
            name: 'product.edit'
          },
          {
            path: '*',
            component: notFound
          },
        ]
      }
    ]
  })
}
