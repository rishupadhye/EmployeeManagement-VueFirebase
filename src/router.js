import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard'
import EditEmployee from '@/components/EditEmployee'
import NewEmployee from '@/components/NewEmployee'
import ViewEmployee from '@/components/ViewEmployee'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase from 'firebase'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path:'/login',
      name: 'login',
      component: Login,
      meta:{
        requiresGuest: true
      }
    },
    {
        path:'/register',
        name: 'register',
        component: Register,
        meta:{
          requiresGuest: true
        }
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/new',
      name: 'newemployee',
      component: NewEmployee,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/edit/:employee_id',
      name: 'editemployee',
      component: EditEmployee,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/:employee_id',
      name: 'viewemployee',
      component: ViewEmployee,
      meta:{
        requiresAuth: true
      }
    }
    
  ]
});

// Nav Guard
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;