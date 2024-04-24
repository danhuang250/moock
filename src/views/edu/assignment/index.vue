<script setup lang="ts">
import Work from '@/views/system/assignment/component/work.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const chapterId = +route.query.chapterId
const courseId = +route.query.courseId
</script>

<template>
    <div>
        <Work :chapterId="chapterId" :courseId="courseId" />
    </div>
</template>

<style lang='scss' scoped></style>
