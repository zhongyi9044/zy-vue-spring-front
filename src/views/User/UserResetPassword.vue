<script setup>
import { ref } from 'vue'
import { updatePasswordAPI } from '@/api/UserAPI/updatePasswordAPI'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
// import { useUserInfoStore } from '@/stores/useUserInfoStore'
// const userInfoStore = useUserInfoStore()
import { useRouter } from 'vue-router'
const router = useRouter()
const form = ref({
  old_pwd: "",
  new_pwd: "",
  re_pwd: ""
})
//自定义检测方法检查，检查密码和确认密码是否一致
const checkRePassword = (rules, value, callback) => {
  if (form.value.new_pwd === '') {
    callback(new Error('请输入密码'))
  } else {
    if (value === '') {
      callback(new Error('请确认密码'))
    } else if (value !== form.value.new_pwd) {
      callback(new Error('确认密码失败'))
    } else {
      callback()
    }
  }
}
//检查
const rules = ref({
  old_pwd: [
    { required: true, message: '原密码不能为空', trigger: 'blur' },
    { min: 5, max: 16, message: '用户名长度必须在5-16位', trigger: 'blur' },
  ],
  new_pwd: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 5, max: 16, message: '密码长度必须在5-16位', trigger: 'blur' },
  ],
  re_pwd: [{ validator: checkRePassword, trigger: 'blur' }],
})
const updatePassword = async () => {
  const result = await updatePasswordAPI(form.value)
  if (result.code == 0) {
    ElMessage.success(result.message ? result.message : '更新成功')
    router.push('/login')
  }
}
const updateForm = ref(null)
const onSubmit = () => {
  updateForm.value.validate(async (valid) => {
    if (valid) {
      updatePassword()
    }
  })
}
</script>

<template>
  <el-form label-position="top" label-width="100px" style="max-width: 460px" :model="form" :rules="rules"
    ref="updateForm">
    <el-form-item label="请输入旧密码" prop="old_pwd">
      <el-input v-model="form.old_pwd" />
    </el-form-item>
    <el-form-item label="设置新密码" prop="new_pwd">
      <el-input v-model="form.new_pwd" />
    </el-form-item>
    <el-form-item label="确认密码" prop="re_pwd">
      <el-input v-model="form.re_pwd" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="form = {}">重置</el-button>
    </el-form-item>
  </el-form>
</template>