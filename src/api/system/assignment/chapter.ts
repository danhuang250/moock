
// homework 题目  assignment作业 
import request from "../../request"


// 章节信息
export function getCourseChapterApi(params: object) {
    return request({
        url: '/course/courseChapterTree',
        method: 'get',
        params
    })
}

// 作业信息
export function chapterAssignmentApi(courseID: number, chapterID: number) {
    return request<any, { data: { result: IHomework[] } }>({
        url: `homework/${courseID}/${chapterID}`,
        method: 'get',
    })
}

// 学生提交作业
export function submitAssignmentApi(data: ISubmitAssignment) {
    return request({
        url: '/homework/submit',
        method: 'post',
        data
    })
}
export interface ISubmitAssignment {
    courseId: number;
    chapterId: number;
    homeworkId: number;
    studentId: number;
    answer: string;
    studentName: string;
}

// 保存题目
export function saveHomeworkApi(data: IHomework) {
    return request({
        url: '/homework',
        method: 'post',
        data
    })
}

// 批量保存题目
export function saveHomeworksApi(data: IHomework[]) {
    return request({
        url: '/homeworks',
        method: 'post',
        data
    })
}

// 删除题目
export function deleteHomeworkApi(id: number) {
    return request({
        url: `/homework/${id}`,
        method: 'delete',
    })
}
export interface IHomework {
    id: number;
    courseId: number;
    chapterId: number;
    type: number;
    sort: number; //排序
    content: string;
    options: string;
    answer: string;
    score: number;
}

//根据课程ID有作业的章节
export function getChapterByCourseIdApi(courseId: number) {
    return request({
        url: `/course/chapterHomeWork/${courseId}`,
        method: 'get',
    })
}

// 根据课程ID和章节ID查询学生作业成绩
export function getStudentScoreApi(courseId: number, chapterId: number) {
    return request({
        url: `/homework/studentHomeWork/${courseId}/${chapterId}`,
        method: 'get',
    })
}




