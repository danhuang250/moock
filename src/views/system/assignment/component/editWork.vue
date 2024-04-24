<script setup lang="ts">

import { ref, defineProps, watch, computed, PropType, defineEmits } from 'vue'
import { chapterAssignmentApi, IHomework, saveHomeworksApi } from '@/api/system/assignment/chapter'
import { splitter, workType } from '../constant.ts'
import { FormInstance } from 'element-plus'
// 表单实例对象
const ruleFormRef = ref<FormInstance>()
const props = defineProps({
    show: Boolean,
    work: Object as PropType<IHomework>
})

const emit = defineEmits<{
    (e: 'cancel'): void
    (e: 'update', value: IHomework): void
}>()

const close = () => {
    emit('cancel')
}

const confirm = () => {
    ruleFormRef.value?.validate(async (valid, fields) => {
        if (valid) {
            emit('update', props.work)
            close();
        } else {
            ElMessage.error('提交失败，你还有未填写的项！')
        }
    })

}

const isEdit = computed(() => {
    return !!props.work?.id
})
const title = computed(() => {
    return isEdit.value ? '编辑作业' : '新增作业'
})

//  根据index生成ABCD
const generateCharLabel = (index: number) => {
    return String.fromCharCode(65 + index)
}

// 表单约束规则对象
const rules = {
    type: [{ required: true, message: '请选择题目类型', trigger: 'change' }],
    content: [{ required: true, message: '请输入题目', trigger: 'blur' }],
    answer: [{ required: true, message: '请输入答案', trigger: 'change' }],
    score: [{ required: true, message: '请输入分数', trigger: 'change' }],
}

</script>

<template>
    <el-dialog v-model="props.show" :title="title" width="800" :before-close="close">
        <el-form ref="ruleFormRef" :rules="rules" :model="props.work" label-width="80px">
            <el-form-item label="类型" prop="type">
                <el-select v-model="props.work.type" placeholder="请选择题目类型" :disabled="isEdit">
                    <el-option v-for="item in workType" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="分数" prop="score">
                <el-input-number v-model="props.work.score" :min="1" :max="100" :step="1"></el-input-number>
            </el-form-item>
            <el-form-item label="题目" prop="content">
                <el-input type="textarea" v-model="props.work.content" placeholder="请输入题目" :rows="3"></el-input>
            </el-form-item>
            <el-form-item v-for="(item, i) in props.work.options" :label="`选项${generateCharLabel(i)}`"
                :prop="'options.' + i" :rules="[{ required: true, message: '请输入选项', trigger: 'blur' }]">
                <el-input v-model="props.work.options[i]" placeholder="请输入选项"></el-input>
            </el-form-item>
            <el-form-item label="答案" prop="answer">
                <el-radio v-for="(item, i) in props.work.options" :key="i" v-model="props.work.answer"
                    :label="i + ''">{{ generateCharLabel(i) }}</el-radio>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="confirm">
                    提交
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style lang='scss' scoped></style>