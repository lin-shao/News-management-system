import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login/Login.vue'
import home from '../components/home.vue'
import Management from '../components/management/Management'
import User from '../components/management/user/user'
import Announcement from '../components/management/announcement/announcement'
import addNew from '../components/management/news/addNew'
import Detail from '../components/detail/detail'
import newsList from '../components/management/news/newsList'
import addAnnouncement from '../components/management/announcement/addAnnouncement'
import Category from '../components/management/category/category'
import AddCategory from '../components/management/category/addCategory'
import Comment from '../components/management/comments/comments'

Vue.use(VueRouter);
 
const routes = [
    {
        path:'/',
        component: home,
    },
    {
        path:"/login",
        component: Login,
    },
    {
        path:'/management',
        component:Management,
        redirect: '/management/user',
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            let isLogin = window.sessionStorage.getItem("token")
            if(isLogin){
                next();
            }else if(to.path === '/login'){
                next();
            }else {
                next('/login')
            }
        },
        children:[
            {
                path:'user',
                name:'User',
                component:User
            },
            {
                path:'announcement',
                name:'announcement',
                component:Announcement
            },
            {
                path:'addAnnouncement',
                name:'addAnnouncement',
                component:addAnnouncement
            },
            {
                path:'addNew',
                name:'addNew',
                component:addNew
            },
            {
                path:'newsList',
                name:'newsList',
                component:newsList
            },
            {
                path:'category',
                name:'category',
                component:Category
            },
            {
                path:'addCategory',
                name:'addCategory',
                component:AddCategory
            },
            {
                path:'comments',
                name:'comments',
                component:Comment
            }
        ]
    },
    {
        path:'/detail/:id',
        component:Detail
    }
]
var router =  new VueRouter({
    mode:'history',
    routes
})
export default router;