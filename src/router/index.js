import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        meta: {
            title: '首页'
        },
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: {
            title: '注册'
        },
        component: () =>
            import ('../views/Register.vue')
    },
    {
        path: '/city',
        name: 'city',
        meta: {
            title: '城市切换'
        },
        component: () =>
            import ('../views/City.vue')
    },
    {
        path: '/searchresult',
        name: 'searchresult',
        meta: {
            title: '搜索结果'
        },
        component: () =>
            import ('../views/Searchresult.vue')
    },
    {
        path: '/details',
        name: 'details',
        meta: {
            title: '店铺详情'
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Details.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})
export default router