<template>
  <!--头部组件 start-->
   <TopHeader/>
  <!--头部组件 end-->
  <!--中间内容 start-->
   <div class="edu-container">
     <!--内容 start-->
     <!--课程 start-->
     <ul class="j-list-box">
       <li v-for="item in courseList">
         <router-link :to="'/edu/details/'+item.id" target="_blank">
           <div class="j-list-img"><img src="./defaultCourse.jpg"> </div>
           <div class="j-list-son">
             <div class="j-list-title">
               {{item.shortTitle}}
             </div>
           </div>
         </router-link>
       </li>
     </ul>
     <!--课程 end-->
     <!--分页 start-->
     <el-pagination background layout="total,prev,pager,next,jumper" :total="total"
                    v-model:page-size="pageSize" @current-change="changePage"/>
     <!--分页 end-->
     <!--内容 end-->
   </div>
  <!--中间内容 end-->
  <!--底部组件 start-->
  <Footer/>
  <!--底部组件 end-->
</template>

<script setup lang="ts">
import TopHeader from "@/views/edu/common/header/TopHeader.vue";
import Search from "@/views/edu/common/search/Search.vue";
import Footer from "@/views/edu/common/footer/Footer.vue";
import { ref,onMounted,watch } from 'vue'
import {course, getListApi} from "@/api/edu/list/list";
// 类别
const courseList = ref<course[]>([])
// 总共记录
const total = ref(0)
// 当前页
const pageIndex = ref(1)
// 每页显示记录
const pageSize = ref(16)
// 获取列表数据
const getList = async ()=> {
  const params = {
    pageIndex: pageIndex.value,
    pageSize: pageSize.value
  }
  const { data } = await getListApi(params)
  
  courseList.value  = data.content
  total.value = data.totalElements
}

// 切换页码执行事件
const changePage = (val: number)=> {
  pageIndex.value = val
  getList()
}

onMounted(()=> {
  getList()
})
</script>

<style scoped>
.edu-container {
  width: 1200px;
  margin: 0 auto;
}
.list-top{
  margin-top: 20px;
  background: #ffffff;
  padding-bottom: 20px;
  border-radius: 10px;
  padding-left: 10px;

}
.list-tab {
  display: flex;
  justify-content: flex-start;
  border-bottom: 2px dashed #e6e6e6;
}
.list-title{
  color: #343434;
  font-size: 16px;
  line-height: 65px;
  border-bottom: 2px dashed #e6e6e6;
}
.list-tab .tab-left{
  width: 60px;
  color: #343434;
  font-size: 14px;
  display: inline-block;
  margin-top: 15px;
}
.list-tab dl{
  width: 96%;
}
.list-tab dl dd{
  display: inline-block;
  margin: 15px 0px 15px 0px;
  width: 105px;
  text-align: center;
}

.list-tab dl dd a{
  color: #343434;
  font-size: 14px;
  padding: 2px 10px;
}
.list-tab dl dd a:hover{
  color: #388fff;
  background: rgba(44,128,255,.1);
  border-radius: 20px;
}
.list-tab dl dd.on a{
  background: rgba(44,128,255,.1);
  border-radius: 20px;
  color: #388fff;
}
.list-tab:last-child{
  border-bottom: none;
}

.list-two-tab{
  margin: 20px 0;
}
.list-two-tab a{
  display: inline-block;
  color: #717a80;
  font-size: 12px;
  padding: 5px 15px;
}
.list-two-tab a.on{
  color: #ffffff;
  border-radius: 20px;
  background: #717a80;
}

/*内容列表样式 start*/
.j-list-box{
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.j-list-box li{
  width: 245px;
  padding: 10px;
  margin-top: 20px;
  box-shadow: 1px 1px 10px rgb(27 39 94 / 40%);
  border-radius: 8px;
}
.j-list-img{
  width: 100%;
  height: 132px;
  border-radius: 10px;
}
.j-list-img img{
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.j-list-title{
  color: #343434;
  font-size: 16px;
  -webkit-line-clamp:2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: box;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin: 10px 0;
}
.j-list-tag{
  color: #8b8b8b;
  font-size: 12px;
  margin-top: 5px;
}
.down-num{
  float: right;
}
.j-list-info{
  color: #555555;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.j-list-info span{
  color: #ef2a2a;
}
.j-list-info a{
  float: right;
  color: #05af10;
}
.j-list-box li:hover{
  background: #ffffff;
  box-shadow: 1px 1px 5px rgba(0,0,0,.2);
}

.member-free {
  margin-top: 20px;
  padding: 2px 10px;
  height: 20px;
  color: #fff;
  font-size: 12px;
  background: linear-gradient(90deg,#d5cb5a,#977e06 99%);
  border-radius: 24px 0 24px 0;
}


/*内容列表样式 end*/
ul, li {
  list-style: none;
}
/*分页样式*/
.el-pagination {
  margin-top: 20px;
  justify-content: center;
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active){
  background-color: #083a6d;
  border-radius: 15px;
}
</style>
