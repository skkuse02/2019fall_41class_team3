import Vue from 'vue'
import Router from 'vue-router'

//TODO Lazy Loading

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Main
const Main = () => import('@/main/Main')

// NotFound
const NotFound = () => import('@/other/NotFound')

// User Authentication
const Login = () => import('@/authentication/Login')
const FindId = () => import('@/authentication/FindId')
const FindPassword = () => import('@/authentication/FindPassword')
const QuestionList = () => import('@/authentication/QuestionList')
const Register = () => import('@/authentication/Register')

// Register Question/Answer
const RegisterQuestion = () => import('@/register/RegisterQuestion')
const RegisterAnswer = () => import('@/register/RegisterAnswer')


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
                },
                {
                    path: '/login',
                    name: 'Login',
                    component: Login
                },
                {
                    path: '/findid',
                    name: 'FindId',
                    component:FindId
                },
                {
                    path: '/findpassword',
                    name: 'FindPassword',
                    component:FindPassword
                },
                {
                    path: '/questionlist',
                    name: 'QuestionList',
                    component:QuestionList
                },
                {
                    path: '/register',
                    name: 'Register',
                    component: Register
                },
                {
                    path: '/registerquestion',
                    name: 'RegisterQuestion',
                    component: RegisterQuestion
                },
                {
                    path: '/registeranswer',
                    name: 'RegisterAnswer',
                    component: RegisterAnswer
                }
            ]
        },
        {
            path: '*',
            component: NotFound
        }
    ]
})
