import request from "@/api/request";
// 获取推荐课程列表
export function getRecommendCourseListApi() {
    return request({
        url: 'course/recommend',
        method: 'get'
    })
}
