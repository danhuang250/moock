<script setup lang="ts">
import { ref, defineProps, watch, computed } from 'vue'
import { chapterAssignmentApi, IHomework, saveHomeworkApi } from '@/api/system/assignment/chapter'
import EditWork from './editWork.vue'
import { ElMessage } from 'element-plus'
import { splitter } from '../constant.ts'
const props = defineProps({
    courseId: Number,
    chapterId: Number,
    mod: String,
})


const chapterAssignment = ref<IHomework[]>([])
const loading = ref(false)
watch(() => [props.chapterId, props.courseId], async ([courseId, chapterId]) => {
    console.log('course', courseId, chapterId)

    if (courseId === 0 || chapterId === 0) return;
    loading.value = true
    try {
        const { data } = await chapterAssignmentApi(courseId, chapterId);
        chapterAssignment.value = data.result.map?.((item: IHomework) => {
            return {
                ...item,
                options: item.options.split(splitter)
            }
        })
    } finally {
        loading.value = false
    }

}, {
    immediate: true
})

//  根据index生成ABCD
const generateCharLabel = (index: number) => {
    return String.fromCharCode(65 + index)
}

// 教师模式
const teacherFlag = computed(() => {
    return props.mod === 'teacher'
})

const dialogFlag = ref(false)

// 学生答题情况
const studentAnswer = ref<string[]>([])
// 学神是提交作答作答
const isFinish = ref(false)

// 提交答案
const submitAnswer = () => {
    isFinish.value = true
    const answer = studentAnswer.value.join(splitter)

}
//  生成一个空单选题题目对象
const getIniSignalOptionWork = () => {
    const lastSort = chapterAssignment.value[chapterAssignment.value.length - 1]?.sort;
    return {
        id: undefined,
        type: 0,
        score: 5,
        content: '',
        options: ['', '', '', ''],
        answer: '',
        courseId: props.courseId,
        chapterId: props.chapterId,
        sort: lastSort ? lastSort + 1 : 1
    }

}
const work = ref<IHomework>();

//  点击编辑按钮
const editWork = (ques: IHomework | undefined) => {
    console.log(ques)
    dialogFlag.value = true
    if (ques) {
        work.value = { ...ques }
    } else {
        work.value = getIniSignalOptionWork();
    }
}

// 处理dialog的回调
const editHandle = async (work: IHomework) => {
    dialogFlag.value = false
    const workData = {
        ...work,
        options: work.options.join(splitter)
    }
    if (!work.id) {
        // 新增
        try {
            let { data } = await saveHomeworkApi(workData);
            work.id = data.result.id;
            chapterAssignment.value.push(work);
            ElMessage.success('新增成功');
        } finally {

        }
    } else {
        // 修改
        const index = chapterAssignment.value.findIndex(item => item.id === work.id);
        try {
            await saveHomeworkApi(workData);
            chapterAssignment.value[index] = work;
            ElMessage.success('修改成功');
        } finally {

        }
    }
}

</script>

<template>
    <EditWork :show='dialogFlag' :work="work" @cancel="() => { dialogFlag = false }" @update="editHandle" />

    <el-container class="container">
        <!-- 老师特有的编辑情况 -->
        <el-header v-if="teacherFlag">
            <div>
                <el-button type="primary" @click="editWork(undefined)">新增题目</el-button>
            </div>
        </el-header>
        <div v-loading="loading" class="work">
            <div v-for="(ques, index) in chapterAssignment" class="ti" :key="ques.id">
                <!-- 单选题类型 -->
                <template v-if="ques.type === 0">
                    <!-- 题目 -->
                    <div class="tigan">
                        <span class="index">{{ index + 1 }}</span>
                        <span class="score">单选</span>
                        <span>({{ ques.score }}分) </span>
                        <span>{{ ques.content }}</span>
                        <el-button v-if="teacherFlag" type="primary" @click="editWork(ques)" class="ml-5">修改题目</el-button>
                    </div>
                    <!-- 老师答题区域 -->
                    <template v-if="teacherFlag">
                        <div v-for="(item, i) in ques.options" :key="i">
                            <el-radio disabled v-model="ques.answer" :label="i + ''">{{ generateCharLabel(i) + '. ' +
        item
                                }}</el-radio>
                        </div>
                    </template>
                    <!-- 学生答题区域 -->
                    <template v-else>
                        <div v-for="(item, i) in ques.options" :key="i">
                            <el-radio v-model="studentAnswer[index]" :label="i + ''">{{ generateCharLabel(i) + '. '
        + item
                                }}</el-radio>
                        </div>
                    </template>
                </template>
            </div>
            <div v-if="chapterAssignment.length === 0">该章节没有作业</div>
            <template v-if="!teacherFlag && chapterAssignment.length">
                <el-button class="subBtn" @click="submitAnswer" type="success" size="large">提交试卷</el-button>
            </template>
        </div>

    </el-container>
</template>

<style scoped>
.container {
    padding: 15px;
    color: var(--el-text-color-primary);
    background-color: white;
}

.layout-container-demo .el-header {
    position: relative;

}

.work {
    color: var(--el-text-color-primary);
    background: white;
}

.ti {
    margin: 10px 0 0 5px
}

.index {
    width: 38px;
    font-size: 22px;
    line-height: 26px;
    color: #333;
    display: inline-block;

}

.score {
    font-size: 12px;
    background: #e3f8ff;
    border: 1px solid #bfdfff;
    border-radius: 2px;
    padding: 2px 4px;
    margin-right: 5px;
}

.subBtn {
    margin-top: 20px;
}
</style>
