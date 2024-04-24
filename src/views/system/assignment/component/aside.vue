<template>
  <el-menu color="white" text-color="#67879b" :unique-opened="false" class="el-menu-vertical-demo"
    :collapse-transition="true" style="min-height: 100px; " v-loading="loading">
    <!--遍历菜单 start-->
    <template v-for="(v, index) in courseChapterData" :key="index">
      <!--如果菜单有子菜单，则循环子菜单-->
      <el-sub-menu :index="v.id">
        <template #title>
          <span>{{ v.shortTitle }}</span>
        </template>
        <el-menu-item v-for="child in v.children" :key="v.id + '/' + child.id" :index="v.id + '/' + child.id"
          @click="emit('clickChapter', v.id + '/' + child.id)">
          {{ child.title }}
        </el-menu-item>
      </el-sub-menu>
      <!--分页插件 start-->
      <el-pagination layout="prev, pager, next" :total="total" v-model:page-size="pageSize" small
        @current-change="changePage" :pager-count="3" />
      <!--分页插件 end-->
    </template>

    <!--遍历菜单 end-->
  </el-menu>
</template>

<script setup lang="ts">
import { getCourseChapterApi } from '@/api/system/assignment/chapter'
import { ref, reactive, toRefs, onMounted, defineEmits } from 'vue'

const emit = defineEmits(['clickChapter'])

// 菜单数据
const menuData = ref()
menuData.value = [{
  title: 123,
  id: 0,
  children: [{ title: 456, id: 1 }, { title: 789, id: 2 }]
}]

const state = reactive({
  // 搜索关键字
  searchValue: '',
  // 表格数据
  courseChapterData: [],
  // 总条数
  total: 0,
  // 每页显示条数
  pageSize: 10,
  // 当前页面
  pageIndex: 1,
  // 数据加载状态
  loading: true
})
const { courseChapterData, pageSize, loading, total, searchValue } = toRefs(state)

// 获取章节数据
const loadData = async (state: any) => {
  state.loading = true
  const params = {
    'pageIndex': state.pageIndex,
    'pageSize': state.pageSize,
  }
  const { data } = await getCourseChapterApi(params)
  state.courseChapterData = data.result
  state.total = data.totalElements
  state.loading = false
}
// 切换页码执行事件
const changePage = (val: number) => {
  state.pageIndex = val
  loadData(state)
}

onMounted(() => {
  loadData(state)
})


</script>

<style scoped>
.imgBox {
  width: 100%;
  height: 70px;
  line-height: 70px;
}

.imgBox img {
  margin: 1%;
}

.el-menu {
  height: 100%;
  border: 0px;
}

/*选中的颜色*/
:deep(.el-menu-item.is-active) {
  color: white;
  background: linear-gradient(to right, #083a6d, #5e6eba);
}
</style>
