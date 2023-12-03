<script setup>
import { ref } from 'vue'
import { registerAPI } from '@/api/LoginAPI/registerAPI.js'
import { loginAPI } from '@/api/LoginAPI/loginAPI.js'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/stores/useTokenStore'
//注册或者登录的数据，这里注册和登录有重复数据，就直接用注册命名
const registerData = ref({
  username: '',
  password: '',
  rePassword: '',
})
//自定义检测方法检查，检查密码和确认密码是否一致
const checkRePassword = (rules, value, callback) => {
  if (registerData.value.password === '') {
    callback(new Error('请输入密码'))
  } else {
    if (value === '') {
      callback(new Error('请再次输入密码'))
    } else if (value !== registerData.value.password) {
      callback(new Error('确认密码失败'))
    } else {
      callback()
    }
  }
}
//检查
const rules = ref({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 5, max: 16, message: '用户名长度必须在5-16位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 5, max: 16, message: '密码长度必须在5-16位', trigger: 'blur' },
  ],
  rePassword: [{ validator: checkRePassword, trigger: 'blur' }],
})
//注册和登录的切换
const isShow = ref(false);
//登录面上是否记密码
const check = ref(false);
//绑定注册表单
const registerForm = ref(null);
//绑定登陆表单
const loginForm = ref(null);
//提交表单
const router = useRouter();
const tokenStore = useTokenStore();
const loginOrRegister = () => {
  //注册
  if (isShow.value === true) {
    //统一校验
    registerForm.value.validate(async (valid) => {
      if (valid) {
        const res = await registerAPI(registerData.value)
        //保存token
        tokenStore.setToken(res.data)
        ElMessage.success(res.message ? res.message : '注册成功');
      }
    })
  }
  //登录 
  else if (isShow.value === false) {
    // 统一校验
    loginForm.value.validate(async (valid) => {
      if (valid) {
        const res = await loginAPI(registerData.value)
        //保存token
        tokenStore.setToken(res.data)
        ElMessage.success(res.message ? res.message : '登录成功');
        router.push('/')
      }
    })
  }
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="2" class="form">
      <!-- 注册 -->
      <el-form :model="registerData" label-width="0" class="demo-ruleForm" v-if="isShow" :rules="rules"
        ref="registerForm">
        <el-form-item>
          <p>注册</p>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="registerData.username" type="text" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerData.password" type="text" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input v-model="registerData.rePassword" type="text" placeholder="确认密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginOrRegister">注册</el-button>
        </el-form-item>
        <el-form-item>
          <el-link type="info" @click="isShow = false">登录-></el-link>
        </el-form-item>
      </el-form>

      <!-- 登录 -->
      <el-form :model="registerData" label-width="0" class="demo-ruleForm" v-if="!isShow" :rules="rules" ref="loginForm">
        <el-form-item>
          <p>登录</p>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="registerData.username" type="text" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerData.password" type="text" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <div class="forget">
            <el-checkbox v-model="check">记住我</el-checkbox>
            <span>忘记密码？</span>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginOrRegister">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-link type="info" @click="isShow = true">注册-></el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background: url('@/assets/logo2.png') no-repeat 60% center / 15rem auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 1.25rem 1.25rem 0;
  }

  .form {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .demo-ruleForm {
    p {
      font-size: 2rem;
      font-weight: 550;
    }

    .el-form-item {
      margin-top: 1rem;

      .el-button {
        width: 100%;
      }
    }

    .forget {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      width: 100%;

      span {
        color: rgb(35, 144, 245);

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>