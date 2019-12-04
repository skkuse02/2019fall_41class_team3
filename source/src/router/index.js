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

// Register Question
const RegisterQuestion = () => import('@/views/question/RegisterQuestion')
const QuestionList = () => import('@/views/question/QuestionList')
const QuestionView = () => import('@/views/question/QuestionView')

// Register Answer
const RegisterAnswer = () => import('@/views/answer/RegisterAnswer')

// User
const Profile = () => import('@/views/user/Profile')
const Credit = () => import('@/views/user/Credit')

const Chat = () => import('@/components/Chat/Chat')
const ScreenShare = () => import('@/components/ScreenShare/ScreenShare')

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
                     path: '/question/list',
                     name: 'QuestionList',
                     component: QuestionList
                },
                {
                    path: '/question/:id',
                    name: 'QuestionView',
                    component: QuestionView
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
                    path: '/credit',
                    name: 'Credit',
                    component: Credit
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
                },
                {
                    path: '/chat',
                    name: 'Chat',
                    component: Chat 
                },
                {
                    path: '/screenshare',
                    name: 'ScreenShare',
                    component: ScreenShare
                }
            ]
        },
        {
            path: '*',
            component: NotFound
        }
    ]
})
