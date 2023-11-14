
import request, { BRS } from "@/api/request";
// 登录
export function loginApi(data: LoginData) {
    return request<any, BRS<null>>({
        url: '/user/login',
        method: 'post',
        data
    })
}
// 注册
export function registerApi(data: RegisterData) {
    return request<any, BRS<null>>({
        url: '/user/register',
        method: 'post',
        data
    })
}

export interface LoginData {
    account: string;
    password: string;
}

export interface RegisterData {
    account: string;
    password: string;
    name: string;
    schoolName: string;
    roleId: number;
}
