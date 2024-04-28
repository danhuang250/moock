<template>
  <!--头部 start-->
  <TopHeader />
  <!--头部 start-->
  <!--登录 Start-->
  <div class="login" style="position: relative;">
    <el-form ref="loginFormRef" :rules="loginFormRules" :model="loginForm">
      <div class="loginbox">
        <!-- <a class="ewm_login" @click="wxlogin"><span>扫码登录更便捷</span></a> -->
        <div class="login02">
          <div class="tit">账号{{ registerFlag ? "注册" : "登录"
            }}
          </div>
          <ul class="logn_ul2">
            <div v-if="!registerFlag">
              <li v-for="item in loginItem">
                <el-form-item :prop="item.model">
                  <el-input :prefix-icon="item.icon" v-model="loginForm[item.model]" class="input1"
                    :placeholder="item.placeholder" />
                </el-form-item>
              </li>
            </div>
            <div v-if="registerFlag">
              <li v-for="item in registerItem">
                <el-form-item :prop="item.model">
                  <el-input :prefix-icon="item.icon" v-model="loginForm[item.model]" class="input1"
                    :placeholder="item.placeholder" />
                </el-form-item>
              </li>
            </div>
            <li style="border:0">
              <el-button class="sub1" :loading="subLoading" @click="login(loginFormRef)">{{ registerFlag ? "注册" : "登录"
                }}</el-button>
            </li>
            <li style="border:0">
              <el-button class="sub1" @click="registerFlag = !registerFlag">切换登录|注册</el-button>
            </li>
          </ul>
        </div>
      </div>
    </el-form>

  </div>
  <!--登录 end-->
  <!--底部 start-->
  <Footer />
  <!--底部 end-->
</template>

<script setup lang="ts">
import TopHeader from "@/views/edu/common/header/TopHeader.vue";
import Search from "@/views/edu/common/search/Search.vue";
import Footer from "@/views/edu/common/footer/Footer.vue";
import { ElMessage, FormInstance, FormRules, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { RegisterData, loginApi, registerApi, } from "@/api/edu/login/login";
import { useRouter } from 'vue-router'
import { useStudentStore } from "@/store/modules/student"
import { loginItem, registerItem } from './formItem'
import { addStudentApi } from "@/api/edu/student/student";

// 登录或注册标志 0:登录 1:注册
const registerFlag = ref(false)
// 获取服务器路径
const url = import.meta.env.VITE_APP_BASE_API
// 获取路由对象
const router = useRouter()
// 获取学员在pinia对象
const studentStore = useStudentStore()
// 登录表单实例对象
const loginFormRef = ref<FormInstance>()
// 登录按钮状态
const subLoading = ref(false)

// 定义登录表单规则
const loginFormRules = reactive<FormRules>({
  loginName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
// 定义表单数据对象
const loginForm = reactive({
  loginName : 'U_10384829',
  password: '123456',
})
// 点击登录执行函数
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    subLoading.value = true
    try {
      if (valid) {
        if (registerFlag.value) {
          const data = (await addStudentApi({
            loginName: loginForm.loginName,
            password: loginForm.password,
          })).data
          if(data.status !== 200){
            ElMessage.error(data.message)
            return
          }
        }
        const data = (await loginApi({
          loginName: loginForm.loginName,
          password: loginForm.password
        })).data
        if (data.status === 200) {
          // 设置学员token
          studentStore.setStudentToken(data.result.studentToken)
          // 设置登录学员信息
          studentStore.setStudentPartInfo(data.result)
          // 跳转首页
          router.push({
            path: '/edu/index'
          })
        } else {
          ElMessage.error(data.message);
        }

      } else {
        ElMessage.error('提交表单失败，你还有未填写的项目')
      }
    } catch (_e) { } finally {
      subLoading.value = false
    }

  })
}


</script>

<style scoped>
ul,
li,
dl,
dt {
  list-style: none;
}

.login {
  width: 100%;
  height: 500px;
  background: url(@/static/img/login_bg.jpg) center 0 no-repeat;
}

.login form {
  position: absolute;
  left: 50%;
  margin-left: -575px;
  top: 0;
  height: 500px;
  z-index: 1;
  width: 1150px;
}

.loginbox {
  position: absolute;
  padding: 30px 50px;
  right: 0;
  top: 70px;
  background: #fff;
  border-radius: 4px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
}

.loginbox .ewm_login {
  position: absolute;
  width: 50px;
  height: 50px;
  background: url(@/static/img/ewm_login.png) 0 0 no-repeat;
  right: 5px;
  top: 5px;
  cursor: pointer;
  z-index: 1;
}

.loginbox .ewm_login span {
  position: absolute;
  width: 110px;
  height: 26px;
  border: 1px solid #f3d995;
  background: #fefcee;
  color: #df9c1f;
  left: -120px;
  top: 2px;
  font-size: 13px;
  line-height: 26px;
  text-align: center;
}

.loginbox .tit {
  font-size: 20px;
  margin-top: 15px;
  height: 40px;
  position: relative;
}

.loginbox .tit .changelogin {
  position: absolute;
  font-size: 14px;
  color: #666;
  right: 0;
  bottom: 15px;
  cursor: pointer;
}

.hide {
  display: none;
}

.loginbox .logn_ul2 {
  width: 300px;
  height: auto;
  padding: 0;
  margin: 0 auto;
  position: relative;
  top: 0;
}

.login form ul li {
  border-radius: 4px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  margin-bottom: 20px;
  position: relative;
  background: #fff;
}

.login form ul li .input1 {
  -webkit-appearance: none;
  height: 50px;
  border: 0;
  background: none;
  font-size: 14px;
  color: #000;
  line-height: 50px;
}

.login form ul .sub1 {
  -webkit-appearance: none;
  width: 100%;
  background: #5390ff;
  color: #fff;
  font-size: 16px;
  border: 0;
  height: 50px;
  line-height: 50px;
  border-radius: 4px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  margin-top: 20px;
}

.login form ul h1 {
  padding: 15px 0;
  color: #999;
  text-align: left;
  font-size: 12px;
}

.login form ul h1 a {
  color: #ff536a;
  cursor: pointer;
}

.j-cover {
  /* display: none;*/
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
}

.j-cover-box {
  /* display: none;*/
  width: 488px;
  /*height: 444px;*/
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, .1);
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 30px;
}

.j-cover-box h3 {
  color: #555555;
  font-size: 16px;
}

.cover-form {
  margin-top: 30px;
}

.cover-item {
  margin: 20px 0;
}

.cover-item span {
  width: 16px;
  color: #555555;
  display: inline-block;
  width: 85px;
}

.cover-input {
  width: 75%;
  height: 36px;
  border: none;
  background: #f4f4f4;
  border-radius: 6px;
  font-size: 14px;
  padding-left: 10px;
}

.cover-item i {
  color: #05af10;
  font-size: 16px;
  padding: 0 10px;
  margin-left: -100px;
  line-height: 36px;
  font-style: normal;
  cursor: pointer;
}

.cover-btn {
  text-align: center;
  margin-top: 20px;
}

.form-findPwd-btn {
  color: #8f8f8f;
  border: 1px solid #8f8f8f;
  padding: 2px 10px;
  font-size: 14px;
  border-radius: 20px;
  margin: 0 10px;
  cursor: pointer;
}

.subBtn {
  color: #ffffff;
  background: #4c4fb9;
  border: none;
}
</style>
