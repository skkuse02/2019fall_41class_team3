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

// Register Question
const RegisterQuestion = () => import('@/views/question/RegisterQuestion')
const QuestionList = () => import('@/views/question/QuestionList')
const QuestionView = () => import('@/views/question/QuestionView')

// Register Answer
const RegisterAnswer = () => import('@/views/answer/RegisterAnswer')
const ArrangeTime = () => import('@/views/answer/ArrangeTime')
const EvaluateAnswer = () => import ('@/views/answer/EvaluateAnswer')

// User
const Profile = () => import('@/views/user/Profile')
const ChangePw = () => import('@/views/user/ChangePw')
const Credit = () => import('@/views/user/Credit')
const MyQuestion  = () => import('@/views/user/MyQuestion')
const Signup = () => import('@/views/user/Signup')

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
                    path: '/find/id',
                    name: 'FindId',
                    component:FindId
                },
                {
                    path: '/find/password',
                    name: 'FindPassword',
                    component:FindPassword
                },
                {
                     path: '/question/list',
                     name: 'QuestionList',
                     component: QuestionList
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
                    path: '/changepw',
                    name: 'ChangePw',
                    component: ChangePw
                },
                {
                    path: '/myquestion',
                    name: 'MyQuestion',
                    component: MyQuestion
                },
                {
                    path: '/credit',
                    name: 'Credit',
                    component: Credit
                },
                {
                    path: '/question/register',
                    name: 'RegisterQuestion',
                    component: RegisterQuestion
                },
                {
                    path: '/answer/text/:qid',
                    name: 'RegisterAnswer',
                    component: RegisterAnswer
                },
                {
                    path: '/question/arrangetime/:qid',
                    name: 'ArrangeTime',
                    component: ArrangeTime
                },
                {
                    path: '/question/:id',
                    name: 'QuestionView',
                    component: QuestionView
                },
                {
                    path: '/answer/evaluate/:qid',
                    name: 'EvaluateAnswer',
                    component: EvaluateAnswer
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
