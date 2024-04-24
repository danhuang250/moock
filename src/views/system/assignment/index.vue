<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside width="200px">
      <el-scrollbar >
        <AsideMenu @clickChapter="clickChapter" />
      </el-scrollbar>
    </el-aside>
    <el-main>
      <el-scrollbar>
        <Work :courseId="courseId" :chapterId='chapterId' mod="teacher" v-if="courseId && chapterId" />
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import AsideMenu from './component/aside.vue'
import Work from './component/work.vue'
const courseId = ref(0);
const chapterId = ref(0);
const clickChapter = async (path: string) => {
  const [course, chapter] = path.split('/').map(Number);
  console.log(course, chapter)
  courseId.value = course;
  chapterId.value = chapter;
}
</script>

<style scoped>
.layout-container-demo {
  height: 100%;
  background: white;
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-table-bg-color);
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>