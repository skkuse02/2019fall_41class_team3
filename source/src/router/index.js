import Vue from 'vue'
import Router from 'vue-router'

//TODO Lazy Loading

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Main
const Main = () => import('@/main/Main')

// NotFound
const NotFound = () => import('@/other/NotFound')


Vue.use(Router)

export default new Router({
    base: '/',
    // 참고: https://router.vuejs.org/kr/guide/essentials/history-mode.html#%EC%84%9C%EB%B2%84-%EC%84%A4%EC%A0%95-%EC%98%88%EC%A0%9C
    mode: 'history',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            component: DefaultContainer,
            children: [
                {
                    path: '/',
                    name: '메인',
                    component: Main
                }
            ]
        },
        {
            path: '*',
            component: NotFound
        }
    ]
})