import request from "@/api/request";
// 推流
export function pushStream(id:number) {
    return request({
        url: `/course/push/${id}`,
        method: 'get'
    })
}

// 拉流
export function pullStream(id:number) {
    return request({
        url: `/course/pull/${id}`,
        method: 'get'
    })
}