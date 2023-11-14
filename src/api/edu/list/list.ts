import request, { BR } from "@/api/request";

export function getListApi(params:object) {
    return request<any,BR<course>>({
        url: '/course',
        method: 'get',
        params
    })
}


export interface course{
    id:number,
    name:string,    
}