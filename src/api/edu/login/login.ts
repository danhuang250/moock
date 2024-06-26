
import request, { BRS } from "@/api/request";
// 登录
export function loginApi(data: LoginData) {
    return request({
        url: 'edu/front/login',
        method: 'post',
        data
    })
}
// 注册
export function registerApi(data: RegisterData) {
    return request({
        url: '/user/register',
        method: 'post',
        data
    })
}

export interface LoginData {
    loginName: string;
    password: string;
}

export interface RegisterData {
    loginName: string;
    password: string;
    schoolName: string;
    roleId: number;
}
