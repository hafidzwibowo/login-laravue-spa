import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import PublicHeader from './components/header'
import Home from './public/home'
// import PublicFooter from './public/footer'
import Login from './public/login'
import page404 from './public/404'

import AdminSidebar from './components/sidebar'
import Dashboard from './admin/dashboard'


Vue.use(Router)

const routes = [
    {
        path: '/login',
        component: Login,
        name: 'Login',
        meta: { notAdmin: true }
    },
    {
        path: '/dashboard',
        meta: { isAdmin: true },
        components: {
            AdminSidebar,
            PublicHeader,
            default: Dashboard,
        },
        children: [ 
            {
                path: '',
                component: Dashboard,
                name: 'Dashboard'
            },
        ]
    },
    {
        path: '/',
        components: {
            PublicHeader,
            default: Home
        },
        name: 'Home'
    },

    {
        path: '*',
        component: page404,
        name: '404'
    }
]

export const router = new Router({
    mode: 'history',
    linkActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0}
        }
    }
})

router.beforeEach((to, from, next) => {
    if ( to.matched.some(record => record.meta.isAdmin) ) {
        if (!store.state.isAdmin) {
            next('/login')
        } else {
            next()
        }
    } else {
        next()
    }
})

router.beforeEach((to, from, next) => {
    if ( to.matched.some(record => record.meta.notAdmin) ) {
        if (store.state.isAdmin) {
            next('/dashboard')
        } else {
            next()
        }
    } else {
        next()
    }
})