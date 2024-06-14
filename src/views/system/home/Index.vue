<script setup lang="ts">
import { ref, defineProps, watch, computed } from 'vue';
import { chapterAssignmentApi, IHomework, saveHomeworkApi } from '@/api/system/assignment/chapter';
import EditWork from '../assignment/component/editWork.vue';
import { ElMessage } from 'element-plus';
import { splitter } from '../assignment/constant.ts';
const props = {
  mod: 'student',
};

const chapterAssignment = ref<IHomework[]>([]);
const loading = ref(false);
// 学生答题情况
const studentAnswer = ref<string[]>(['2', '']);
// 学神是提交作答作答
const isFinish = ref(true);
watch(
  () => [props.chapterId, props.courseId],
  async ([courseId, chapterId]) => {
    console.log('course', courseId, chapterId);

    if (courseId === 0 || chapterId === 0) return;
    loading.value = true;
    try {
      // const { data } = await chapterAssignmentApi(courseId, chapterId);
      const data = {
        result: [
          {
            id: 1,
            type: 0,
            score: 5,
            content:
              '下列哪个不是计算机的外部设备下列哪个不是计算机的外部设备下列哪个不是计算机的外部设备下列哪个不是计算机的外部设备下列哪个不是计算机的外部设备下列哪个不是计算机的外部设备下列哪个不是计算机的外部设备',
            options: '显示器;;;键盘;;;内存;;;鼠标',
            answer: '1',
          },
          {
            id: 1,
            type: 0,
            score: 5,
            content:
              '下列哪个不是计算机的外部设备下列哪个不是计算机的外部设备下列哪个不是计算机的外部设备下列哪个不是计算机的外部设备下列哪个不是计算机的外部设备下列哪个不是计算机的外部设备下列哪个不是计算机的外部设备',
            options: '显示器;;;键盘;;;内存;;;鼠标',
            answer: '1',
          },
        ],
      };
      chapterAssignment.value = data.result.map?.((item: IHomework) => {
        return {
          ...item,
          options: item.options.split(splitter),
        };
      });
    } finally {
      loading.value = false;
    }
  },
  {
    immediate: true,
  }
);

//  根据index生成ABCD
const generateCharLabel = (index: number) => {
  return String.fromCharCode(65 + +index);
};

// 教师模式
const teacherFlag = computed(() => {
  return props.mod === 'teacher';
});

const dialogFlag = ref(false);

// 提交答案
const submitAnswer = () => {
  isFinish.value = true;
  const answer = studentAnswer.value.join(splitter);
};
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
    sort: lastSort ? lastSort + 1 : 1,
  };
};
const work = ref<IHomework>();

//  点击编辑按钮
const editWork = (ques: IHomework | undefined) => {
  console.log(ques);
  dialogFlag.value = true;
  if (ques) {
    work.value = { ...ques };
  } else {
    work.value = getIniSignalOptionWork();
  }
};

// 处理dialog的回调
const editHandle = async (work: IHomework) => {
  dialogFlag.value = false;
  const workData = {
    ...work,
    options: work.options.join(splitter),
  };
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
    const index = chapterAssignment.value.findIndex((item) => item.id === work.id);
    try {
      await saveHomeworkApi(workData);
      chapterAssignment.value[index] = work;
      ElMessage.success('修改成功');
    } finally {
    }
  }
};
</script>

<template>
  管理端首页
</template>

<style scoped>
.analysisInfo {
  border-radius: 8px;
  background: #f4fcf9;
  border: 1px solid #96e3c5;
  padding: 8px 13px;
  font-size: 12px;
  margin: 20px 0 12px;
}

.answrong {
  background: #fff3f3;
  border: 1px solid #f6bbbb;
  word-break: break-word;
  border-radius: 8px;
}

.analysisInfo .t1 {
  font-size: 14px;
}

.analysisInfo .t2 {
  font-size: 20px;
  margin-right: 12px;
}

.analysisInfo .t3 {
  font-size: 12px;
}
</style>

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
  margin: 10px 0 0 5px;
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
