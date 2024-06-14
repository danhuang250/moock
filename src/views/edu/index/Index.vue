<template>
  <!--顶部 start-->
  <TopHeader />
  <!--顶部 end-->
  <!--搜索 组件 start-->
  <Search />
  <!--搜索 组件 end-->

  <!--中间内容 start-->

  <div class="bg000">
    <div class="edu-container edu-new-good-course">
      <!--视频播放器 start-->
      <div class="edu-course-title">
        <div class="edu-course-title-left">
          <div class="hot">
            <div class="rise-left">live</div>
            <div class="rise-right"></div>
          </div>

          <div class="text">
            <div class="text-top">课程直播</div>
            <div class="text-bottom"></div>
          </div>
        </div>
      </div>
      <div
        id="J_prismPlayer"
        class="prism-player"
        style="height: 400px; width: 700px; margin: 10px auto"
      ></div>
      <!--视频播放器 end-->
      <!--技能提升标题 start-->
      <div class="edu-course-title">
        <div class="edu-course-title-left">
          <div class="hot">
            <div class="rise-left">recommend</div>
            <div class="rise-right"></div>
          </div>

          <div class="text">
            <div class="text-top">课程推荐</div>
            <div class="text-bottom"></div>
          </div>
        </div>
      </div>
      <!--技能提升标题 end-->
      <!--技能提升内容 start-->
      <div class="edu-course-list">
        <ul class="edu-course-list-item">
          <!--骨架屏 start-->
          <el-skeleton class="horizontal-skeleton" :loading="courseListLoading" animated :count="4">
            <template #template>
              <!--骨架屏预览内容 start-->
              <div style="display: flex; flex-direction: column; margin-right: 40px">
                <el-skeleton-item variant="image" style="width: 275px; height: 165px" />
                <div style="padding: 14px">
                  <el-skeleton-item variant="h3" style="width: 50%" />
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      justify-items: space-between;
                      margin-top: 16px;
                      height: 16px;
                    "
                  >
                    <el-skeleton-item variant="text" style="margin-right: 16px" />
                    <el-skeleton-item variant="text" style="width: 30%" />
                  </div>
                </div>
              </div>
              <!--骨架屏预览内容 end-->
            </template>
            <template #default>
              <!--课程内容 start-->
              <li class="edu-course-list-item-li" v-for="item in recommendCourse">
                <div class="list-img">
                  <router-link :to="'/edu/details/' + item.id" target="_blank">
                    <img :src="item.cover || '/src/assets/goodCourse.jpg'" />
                  </router-link>
                </div>
                <div class="list-text">
                  <router-link :to="'/edu/details/' + item.id" target="_blank">
                    {{ item.shortTitle }}
                  </router-link>
                </div>
                <div class="list-tag">
                  {{ item.lessonNum }}课时
                  <span v-if="item.courseType == 0">类型：新手入门</span>
                  <span v-else-if="item.courseType == 1">类型：新上好课</span>
                  <span v-else-if="item.courseType == 2">类型：技能提升</span>
                  <span v-else>类型：理论知识</span>

                  <span v-if="item.difficulty == 0">入门</span>
                  <span v-else-if="item.difficulty == 1">初级</span>
                  <span v-else-if="item.difficulty == 2">中级</span>
                  <span v-else>高级</span>
                  <i>{{ item.viewCount }}人在学</i>
                </div>
              </li>
              <!--课程内容 end-->
            </template>
          </el-skeleton>
          <!--骨架屏 end-->
        </ul>
      </div>
      <!--技能提升内容 end-->
    </div>
  </div>

  <!--中间内容 end-->

  <!--底部 start-->
  <!-- <Footer /> -->
  <!--底部 end-->
</template>

<script setup lang="ts">
import TopHeader from '@/views/edu/common/header/TopHeader.vue';
import Footer from '@/views/edu/common/footer/Footer.vue';
import Search from '@/views/edu/common/search/Search.vue';
import { ref, onMounted } from 'vue';
import { getRecommendCourseListApi } from '@/api/edu/index';
import { pullStream, pushStream } from '@/api/edu/live/courseLive';

// 获取课程列表
const courseListLoading = ref(true);

const recommendCourse = ref([]);

const getRecommendList = async () => {
  const { data } = await getRecommendCourseListApi();
  recommendCourse.value = data.result;
  courseListLoading.value = false;
};
// 阿里云视频点播播放器
const player = ref<any>();
// 创建阿里云视频点播播放器
const creatAliPlayer = async () => {
  // let push = await pushStream(1);
  // let {data} = await pullStream(1);
  let data = {
    message:
      'http://danhuanglive.lambda1107.icu/danhuang/test.m3u8.m3u8?auth_key=1715185953-0-0-9f213f4c88bb501d38be513106554e0f',
  };
  if (player.value != null && player.value != '') {
    player.value.dispose(); //销毁
  }
  const danmu = [
    {
      mode: 1, // mode 表示弹幕的类型，参考 弹幕类型 https://github.com/jabbany/CommentCoreLibrary/blob/master/docs/CommentTypes.md
      text: '666', // text 表示弹幕的文字内容。注意：在创造弹幕对象后，对 text 的更改将无意义。
      stime: 500, // stime 表示弹幕相对于视频位置的开始时间（ms），0即在视频开始立即出现
      size: 25, // 弹幕的文字大小
      color: 0xffffff, // 文字颜色,
    },
    {
      mode: 1,
      text: '弹幕测试',
      stime: 2000,
      size: 25,
      color: 0xffffff,
    },
  ];
  player.value = new window.Aliplayer(
    {
      id: 'J_prismPlayer',
      width: '100%',
      height: '100%',
      source: data.message,
      isLive: true, // 是否为直播播放。
      controlBarVisibility: 'click' /* The mode of the status bar, which is set to Click. */,
      showBarTime: '10000',
      components: [
        {
          name: 'AliplayerDanmuComponent',
          type: AliPlayerComponent.AliplayerDanmuComponent,
          args: [danmu],
        },
      ],
    },
    function (player: any) {
      const danmuComponent = player.getComponent('AliplayerDanmuComponent');
      console.log(danmuComponent);
      const message = ['666', '老师好', '上课了么？'];
      for (let i = 0; i < 100; i++) {
       let timer = setTimeout(() => {
          danmuComponent.send(
            {
              mode: Math.floor(Math.random() * 2) + 1,
              text: message[Math.floor(Math.random() * message.length)],
              size: 25,
              color: 0xffffff,
            },
            
          );
          clearTimeout(timer);
        },Math.floor(Math.random() * 10000));
      }
    }
  );
};
onMounted(() => {
  getRecommendList();
  creatAliPlayer();
});
</script>

<style scoped>
*,
:after,
:before {
  box-sizing: inherit;
}
.edu-container {
  width: 1200px;
}
/*课程类型样式 start*/
.row-bottom-type {
  margin: -35px auto 10px auto;
  display: flex;
  height: 100px;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 55px 25px -25px #d7dae1;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-left: 1px solid #eee;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
  background: #ffffff;
}
.bottom-type {
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom-type .type-left {
  width: 50px;
  height: 50px;
}
.bottom-type .type-left img {
  width: 100%;
  height: 100%;
}

.type-right {
  margin-left: 10px;
}

.right-title {
  font-size: 18px;
  font-weight: bold;
}
.right-desc {
  font-size: 14px;
  color: #999;
}
/*课程类型样式 end*/

/*新上好课 start*/
.edu-new-good-course {
  margin: 30px auto -30px auto;
}
.edu-course-title {
  display: flex;
  padding-top: 10px;
}
.edu-course-title-left {
  display: flex;
}

.edu-course-title .hot {
  display: flex;
  height: 38px;
}
.edu-course-title .hot .hot-left {
  height: 38px;
  font-size: 20px;
  padding: 0 10px;
  text-align: center;
  line-height: 37px;
  color: #ffffff;
  border-radius: 8px 0 8px 8px;
  background: linear-gradient(90deg, #ff727f 0%, #fc685c 100%);
}

.edu-course-title .hot .good-left {
  height: 38px;
  font-size: 20px;
  padding: 0 10px;
  text-align: center;
  line-height: 37px;
  color: #ffffff;
  border-radius: 8px 0 8px 8px;
  background: linear-gradient(90deg, #f8a56e 0%, #fb8d43 100%);
}

.edu-course-title .hot .easy-left {
  height: 38px;
  font-size: 20px;
  padding: 0 10px;
  text-align: center;
  line-height: 37px;
  color: #ffffff;
  border-radius: 8px 0 8px 8px;
  background: linear-gradient(90deg, #7fddfc 0%, #43cdfb 100%);
}

.edu-course-title .hot .rise-left {
  height: 38px;
  font-size: 20px;
  padding: 0 10px;
  text-align: center;
  line-height: 37px;
  color: #ffffff;
  border-radius: 8px 0 8px 8px;
  background: linear-gradient(90deg, #c9949a 0%, #c76f78 100%);
}

.edu-course-title .hot .hot-right {
  width: 0;
  height: 0;
  border: 6px solid #fc685c;
  border-right-color: transparent;
  border-bottom-color: transparent;
}
.edu-course-title .hot .good-right {
  width: 0;
  height: 0;
  border: 6px solid #fb8d43;
  border-right-color: transparent;
  border-bottom-color: transparent;
}

.edu-course-title .hot .easy-right {
  width: 0;
  height: 0;
  border: 6px solid #43cdfb;
  border-right-color: transparent;
  border-bottom-color: transparent;
}

.edu-course-title .hot .rise-right {
  width: 0;
  height: 0;
  border: 6px solid #c76f78;
  border-right-color: transparent;
  border-bottom-color: transparent;
}

.edu-course-title .text {
  position: relative;
  height: 38px;
  z-index: 50;
}

.edu-course-title .text .text-top {
  font-size: 24px;
  padding: 0 5px;
  color: #333333;
  line-height: 31px;
  font-weight: 700;
}
.edu-course-title .text .text-bottom {
  position: absolute;
  top: 25px;
  left: 0px;
  width: 100%;
  height: 13px;
  background: linear-gradient(90deg, #fbf84f 0%, #fea935 100%);
  border-radius: 7px;
  z-index: -1;
}
.edu-course-list {
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 28px;
  margin-bottom: 30px;
}

.edu-course-list .edu-course-list-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}

.edu-course-list .edu-course-list-item .edu-course-list-item-li {
  position: relative;
  width: 270px;
  height: 290px;
  margin-bottom: 20px;
  box-shadow: 1px 1px 10px rgb(27 39 94 / 40%);
  border-radius: 8px;
  -webkit-transition: margin-top 0.2s;
  overflow: hidden;
}
.edu-course-list-item-li .list-img {
  width: 100%;
  height: 165px;
  cursor: pointer;
}

.edu-course-list-item-li .list-img img {
  width: 100%;
  height: 100%;
}
.edu-course-list-item-li:hover {
  margin-top: -5px;
}
.list-vip-img {
  position: absolute;
  top: 5px;
  left: 10px;
}

.list-text {
  color: #343434;
  font-size: 15px;
  margin: 10px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: box;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  padding: 0 8px;
  cursor: pointer;
}

.list-tag {
  color: #999;
  font-size: 14px;
  margin-top: 9px;
  padding: 0 8px;
}

.list-tag span {
  color: #999;
  margin-left: 10px;
}
.list-tag i {
  float: right;
  font-style: normal;
}

.list-sale-price {
  position: relative;
  font-size: 14px;
  margin: 10px 0 0 10px;
  display: flex;
}
.member-free {
  padding: 2px 10px;
  height: 20px;
  color: #fff;
  font-size: 12px;
  background: linear-gradient(90deg, #d5cb5a, #977e06 99%);
  border-radius: 24px 0 24px 0;
}

.member-price {
  color: #fe7062;
  font-weight: bold;
  font-size: 16px;
}
.origin-price {
  color: #6d7278;
  line-height: 20px;
  margin-left: 4px;
}
.delete-line {
  text-decoration: line-through;
}

.bg000 {
  box-shadow: 0 2px 4px 0 rgb(7 17 27 / 6%);
}
.bgfff {
  box-shadow: 0 2px 8px 0 rgb(7 17 27 / 6%);
  background-color: #fff !important;
}
/*新上好课 end*/

/*自定义骨架屏排列方式*/
.horizontal-skeleton {
  width: 100%;
  display: flex;
  flex-direction: row;
}

/* 添加一些样式来控制水平排列的 el-skeleton */
</style>
