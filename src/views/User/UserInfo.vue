<script setup>
import { ref } from 'vue'
import { updateUserInfoAPI } from '@/api/UserAPI/updateUserInfoAPI'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { useUserInfoStore } from '@/stores/useUserInfoStore'
const userInfoStore = useUserInfoStore()
import { useRouter } from 'vue-router'
const router = useRouter()
const form = ref({
  nickname: userInfoStore.myUserInfo.nickname,
  email: userInfoStore.myUserInfo.email
})
// //自定义检测方法检查，检查密码和确认密码是否一致
// const checkRePassword = (rules, value, callback) => {
//   if (form.value.new_pwd === '') {
//     callback(new Error('请输入密码'))
//   } else {
//     if (value === '') {
//       callback(new Error('请确认密码'))
//     } else if (value !== form.value.new_pwd) {
//       callback(new Error('确认密码失败'))
//     } else {
//       callback()
//     }
//   }
// }
//检查
const rules = ref({
  nickname: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur'
    },
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
  ]
  // re_pwd: [{ validator: checkRePassword, trigger: 'blur' }],
})
const updateUserInfo = async () => {
  const tempForm = ref({
    id: userInfoStore.myUserInfo.id,
    username: userInfoStore.myUserInfo.username,
    nickname: form.value.nickname,
    email: form.value.email
  })
  const result = await updateUserInfoAPI(tempForm.value)
  if (result.code == 0) {
    ElMessage.success(result.message ? result.message : '更新成功')
    userInfoStore.setUserInfo(tempForm.value)
    router.replace('/')
  }
}
const updateForm = ref(null)
const onSubmit = () => {
  updateForm.value.validate(async (valid) => {
    if (valid) {
      updateUserInfo()
    }
  })
}
</script>

<template>
  <el-form label-position="top" label-width="100px" style="max-width: 460px" :model="form" :rules="rules"
    ref="updateForm">
    <el-form-item label="登陆账号">
      <el-input disabled :placeholder=userInfoStore.myUserInfo.username />
    </el-form-item>
    <el-form-item label="用户名" prop="nickname">
      <el-input v-model="form.nickname" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="form = {
        nickname: userInfoStore.myUserInfo.nickname,
        email: userInfoStore.myUserInfo.email
      }">重置</el-button>
    </el-form-item>
  </el-form>
</template>