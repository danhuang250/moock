import axios, { AxiosResponse } from 'axios'
import { useStudentStore } from "../store/modules/student";
import { useUserStore } from "../store/modules/user";
import { ElMessage } from 'element-plus'
declare module "axios" {
    interface AxiosResponse {
        code: number;
        msg: string;
    }
}
// 获取会员在pinia对象
const { studentToken } = useStudentStore()
// 获取系统用户在pinia对象
const { token } = useUserStore()
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 36000000,
    // 自定义请求头
    headers: { 'studentToken': studentToken, 'userToken': token },
})

service.interceptors.response.use(
    (response: AxiosResponse) => {
        const data = response.data;
        // 如果有问题
        if (data.success===false) {
            ElMessage.warning(data.errorMsg);
            return Promise.reject(data);
        }
        if(data.success===true){
            return data
        }
        return response;
    },
    (error) => {
        const $error = error;
        ElMessage.error($error.message||'请求失败');
        return Promise.reject($error);
    }
);
export default service


export interface BR<T> {
    code: number;
    data: {
        dataArray: T;
        total?: number;
        totalMoney?: number;
        pageSize?: number;
        totalCost?: number;
        /**
         * 终端机泵机数量
         */
        pumNum?: number;
    };
}
export interface BRS<T> {
    code: number;
    data: T;
    success: boolean,
    errorMsg: string,
}
