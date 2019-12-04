import Vue from 'vue'
import Router from 'vue-router'

//TODO Lazy Loading

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Main
const Main = () => import('@/views/main/Main')

// NotFound
const NotFound = () => import('@/views/other/NotFound')

// User Authentication
const Login = () => import('@/views/authentication/Login')
const FindId = () => import('@/views/authentication/FindId')
const FindPassword = () => import('@/views/authentication/FindPassword')
const Signup = () => import('@/views/user/Signup')
const Profile = () => import('@/views/user/Profile')

// Register Question
const RegisterQuestion = () => import('@/views/question/RegisterQuestion')
const QuestionList = () => import('@/views/question/QuestionList')
const QuestionView = () => import('@/views/question/QuestionView')

// Register Answer
const RegisterAnswer = () => import('@/views/answer/RegisterAnswer')

const ChatRoom = () => import('@/views/chat/ChatRoom')

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
                     path: '/questionview',
                     name: 'QuestionView',
                     component:QuestionView
                },

                {
                    path: '/signup',
                    name: 'Signup',
                    component: Signup
                },
                {
                    path: '/profile',
                    name: 'Profile',
                    component: Profile
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
