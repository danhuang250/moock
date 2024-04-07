import request, { BR } from "@/api/request";

export function getListApi(params:object) {
    return request<any,BR<course>>({
        url: 'edu/front/list/get',
        method: 'get',
        params
    })
}


export interface course{
    id:number,
    name:string,    
}