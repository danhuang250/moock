import { path } from 'path';
// 1、导入Vue Router模块
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Nprogress from "../config/nprogress";
import { useUserStore } from "../store/modules/user";
import { useMenuStore } from "../store/modules/menu";
import { useStudentStore } from "../store/modules/student";
// 定义一些路由，每一个都需要映射到一个组件

export const asyncRoutes = []

// 定义静态路由
export const staticRoutes = [
    {
        path: '/',
        meta: { title: '蛋黄网式在线教育平台' },
        isMenu: false,
        redirect: '/edu',
    },
    {
        path: '/index',
        name: 'Index',
        meta: { title: '蛋黄网在线教育平台' },
        isMenu: false,
        component: () => import('@/views/edu/index/Index.vue')
    },
    {
        path: '/edu',
        name: 'Edu',
        redirect: '/edu/index',
        isMenu: false,
        children: [    {
            path: 'index',
            name: 'Index',
            meta: { title: '学灯网-个人开发者创业专用一站式在线教育平台' },
            isMenu: false,
            component: ()=> import('@/views/edu/index/Index.vue')
        },{
            path: 'login',
            name: 'EduLogin',
            meta: { title: '登录蛋黄网' },
            component: () => import('@/views/edu/login/Login.vue')
        },
        {
            path: 'list',
            name: 'EduList',
            meta: { title: '蛋黄网-视频列表' },
            component: () => import('@/views/edu/list/List.vue')
        },
        {
            path: 'details/:id',
            name: 'Details',
            component: () => import('@/views/edu/details/Details.vue')
        }
        ]
    },
]




// 3、创建路由实例并传递‘routes’配置
const router = createRouter({
    history: createWebHistory(),
    routes: staticRoutes
})

// 设置白名单
const whiteList = ['/', '/index', '/login', '/edu/details', '/edu/list']
// 路由拦截守卫
router.beforeEach(async (to, from, next) => {
    // 1.Nprogress 开始
    Nprogress.start()
    // 2.设置标题
    if (typeof (to.meta.title) === 'string') {
        document.title = to.meta.title || '蛋黄网-在线教育平台'
    }

    // 3.如果是白名单的路径，直接放行
    const some = whiteList.some(function (item) {
        return to.path.indexOf(item) !== -1
    })
    //4. 白名单直接放行
    if (some) {
        next()
    } else {
        // 5.判断访问路径是前台还是后台
        if (to.path.indexOf('edu') !== -1) {
            // 6.判断前台是否有token，没有重定向login
            const studentStore = useStudentStore()
            // 已经登录,直接放行
            if (studentStore.studentToken != '') {
                next()
                // 未登录，跳转到前台登录页
            } else {
                return next({ path: `/edu/login?redirect=${to.path}`, replace: true })
            }
        } else {
            // 7.判断是否有token，没有重定向login
            const userStore = useUserStore()
            if (userStore.token != '') {
                // 获取登录用户的角色
                const roles = []
                roles.push(...(userStore.roles))
                // 根据角色动态生成路由访问映射
                const menuStore = useMenuStore()

                if (!menuStore.routers.length) {
                    const accessRoutes = menuStore.generateRouter({ roles: roles })
                    accessRoutes.forEach(item => router.addRoute(item))
                    next({ ...to, replace: true })
                } else {
                    // 正常访问页面
                    next()
                }

            } else {
                return next({ path: `/login?redirect=${to.path}`, replace: true })
            }

        }

    }

})

// 路由跳转结束
router.afterEach(() => {
    Nprogress.done()
})

// 路由跳转失败
router.onError(error => {
    Nprogress.done()
    console.warn("路由错误", error.message)
})

export default router
