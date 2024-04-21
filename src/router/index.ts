// 1、导入Vue Router模块
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Nprogress from "../config/nprogress";
import { useUserStore } from "../store/modules/user";
import { useMenuStore } from "../store/modules/menu";
import { useStudentStore } from "../store/modules/student";
// 定义一些路由，每一个都需要映射到一个组件

export const asyncRoutes = [
    {
        path: '/admin/daily',
        name: 'Daily',
        meta: {
            title: '课程中心',
            icon: 'GoldMedal',
            role: ['ROLE_ADMIN']
        },
        redirect: '/admin/daily/course',
        component: () => import('@/views/system/layout/Index.vue'),
        isMenu: true,
        funcNode: 2,
        children: [
            {
                path: 'course',
                name: 'Course',
                meta: {
                    title: '课程管理',
                    icon: 'Box',
                    role: ['ROLE_ADMIN']
                },
                component: () => import('@/views/edu/course/CourseList.vue')
            },
            {
                path: 'subject',
                name: 'Subject',
                meta: {
                    title: '分类管理',
                    icon: 'Clock',
                    role: ['ROLE_ADMIN']
                },
                component: () => import('@/views/edu/subject/SubjectList.vue')
            }
        ]
    },
    {
        path: '/admin/user',
        name: 'User',
        meta: {
            title: '用户中心',
            icon: 'User',
            role: ['ROLE_ADMIN']
        },
        component: () => import('@/views/system/layout/Index.vue'),
        redirect: '/admin/user/list',
        isMenu: true,
        funcNode: 3,
        children: [
            {
                path: 'list',
                name: 'UserList',
                meta: {
                    title: '用户列表',
                    icon: 'User',
                    role: ['ROLE_ADMIN']
                },
                component: () => import('@/views/system/user/UserList.vue')
            },
            {
                path: 'student',
                name: 'Student',
                meta: {
                    title: '学生管理',
                    icon: 'Avatar',
                    role: ['ROLE_ADMIN']
                },
                component: () => import('@/views/edu/student/StudentList.vue')
            },
            {
                path: 'studentid',
                name: 'Studentid',
                meta: {
                    title: '学号管理',
                    icon: 'List',
                    role: ['ROLE_ADMIN']
                },
                component: () => import('@/views/edu/student/StudentIdList.vue')
            },
            {
                path: 'teacher',
                name: 'Teacher',
                meta: {
                    title: '讲师管理',
                    icon: 'Avatar',
                    role: ['ROLE_ADMIN']
                },
                component: () => import('@/views/edu/teacher/TeacherList.vue')
            }
        ]
    },
    {
        path: '/admin/role',
        name: 'Role',
        meta: {
            title: '角色中心',
            icon: 'User',
            role: ['ROLE_ADMIN']
        },
        component: () => import('@/views/system/layout/Index.vue'),
        redirect: '/admin/role/list',
        isMenu: true,
        funcNode: 4,
        children: [
            {
                path: 'list',
                name: 'RoleList',
                meta: {
                    title: '角色列表',
                    icon: 'User',
                    role: ['ROLE_ADMIN']
                },
                component: () => import('@/views/system/role/RoleList.vue')
            }
        ]
    },
    {
        path: '/admin/siteset',
        name: 'SiteSet',
        meta: {
            title: '网站设置',
            icon: 'Setting',
            role: ['ROLE_ADMIN']
        },
        redirect: '/siteset/pay',
        component: () => import('@/views/system/layout/Index.vue'),
        isMenu: true,
        funcNode: 5,
        children: [
            {
                path: 'file',
                name: 'File',
                meta: {
                    title: '文件存储设置',
                    icon: 'SetUp',
                    role: ['ROLE_ADMIN']
                },
                component: () => import('@/views/edu/file/FileSet.vue')
            },
        ]
    }
]

// 定义静态路由
export const staticRoutes = [
    {
        path: '/',
        meta: { title: '蛋黄网式在线教育平台' },
        isMenu: false,
        redirect: '/edu',
    },
    {
        path: '/edu',
        name: 'Edu',
        redirect: '/edu/index',
        isMenu: false,
        children: [{
            path: 'index',
            name: 'EduIndex',
            meta: { title: '学灯网-个人开发者创业专用一站式在线教育平台' },
            isMenu: false,
            component: () => import('@/views/edu/index/Index.vue')
        }, {
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
        },
        {
            path: 'play',
            name: 'PlayVideo',
            component: () => import('@/views/edu/video/PlayVideo.vue')
        },
        {
            path: 'student/myinfo',
            name: 'MyInfo',
            meta: { title: '个人信息-蛋黄网' },
            component: () => import('@/views/edu/student/MyInfo.vue')
        },
        {
            path: 'student/mycourse',
            name: 'MyCourse',
            meta: { title: '我的课程-蛋黄网' },
            component: () => import('@/views/edu/student/MyCourse.vue')
        },
        {
            path: 'student/mydownload',
            name: 'MyDownload',
            meta: { title: '下载课程资料记录-蛋黄网' },
            component: () => import('@/views/edu/student/MyDownload.vue')
        },
        ]
    },
    {
        path: '/admin',
        name: 'Admin',
        redirect: '/admin/index',
        isMenu: false,
        children: [
            {
                path: 'login',
                name: 'AdminLogin',
                meta: { title: '后台管理系统-后台登录' },
                component: () => import('@/views/system/login/Login.vue'),
                isMenu: false
            },

            {
                path: 'index',
                name: 'AdminIndex',
                component: () => import('@/views/system/layout/Index.vue'),
                redirect: '/admin/index/home',
                isMenu: true,
                funcNode: 1,
                children: [
                    {
                        path: 'home',
                        name: 'AdminHome',
                        meta: { title: '首页', icon: 'House', affix: true },
                        component: () => import('@/views/system/home/Index.vue')
                    }
                ]

            },
        ]
    },
]




// 3、创建路由实例并传递‘routes’配置
const router = createRouter({
    history: createWebHistory(),
    routes: staticRoutes
})

// 设置白名单
const whiteList = ['/edu/details', '/edu/list', '/edu/login', '/admin/login', '/edu/index', "/edu/play"]
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
                return next({ path: `/admin/login?redirect=${to.path}`, replace: true })
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
