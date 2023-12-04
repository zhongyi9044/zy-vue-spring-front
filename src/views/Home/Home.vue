<script setup>
import { useRouter } from 'vue-router'
import 'element-plus/es/components/message-box/style/css'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { ElMessageBox } from 'element-plus'
import { useTokenStore } from '@/stores/useTokenStore'
import { getUserInfoAPI } from '@/api/UserAPI/getUserInfoAPI'
import { useUserInfoStore } from '@/stores/useUserInfoStore'
import { ref, onMounted } from 'vue'
const tokenStore = useTokenStore()
const userInfoStore = useUserInfoStore()
const router = useRouter()
const getUserInfo = async () => {
  const result = await getUserInfoAPI()
  userInfoStore.setUserInfo(result.data)
}
const handleCommand = (command) => {
  console.log(command)
  if (command == "/login") {
    ElMessageBox.confirm(
      '确定要退出吗',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(() => {
        ElMessage({
          type: 'success',
          message: '退出成功',
        })
        tokenStore.removeToken()
        userInfoStore.removeUserInfo()
        router.push('/login')
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消退出',
        })
      })
  } else {
    console.log(`/user${command}`)
    router.push(`/user${command}`)
  }
}
onMounted(() => getUserInfo())
const circleUrl = ref('https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png')
</script>

<template>
  <el-container class="tac">
    <!-- 左边菜单 -->
    <el-aside width="12rem" class="left">
      <div class="logo"></div>
      <el-menu active-text-color="#ffd04b" background-color="#232323" class="el-menu-vertical-demo" text-color="#fff"
        router>
        <el-menu-item index='/article/category'>
          <span>文章列表</span>
        </el-menu-item>
        <el-menu-item index='/article/manage'>
          <span>文章管理</span>
        </el-menu-item>
        <el-sub-menu>
          <template #title>
            <span>个人中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index='/user/info'>基本资料</el-menu-item>
            <el-menu-item index='/user/avatar'>更换头像</el-menu-item>
            <el-menu-item index='/user/resetPassword'>重置密码</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <!-- 右边展示 -->
    <el-container class="right">
      <el-header class="right-top">
        <div class="name">
          <span>深圳憨八嘎：</span>
          <span>{{ userInfoStore.myUserInfo.nickname }}</span>
        </div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar :size="50" :src="circleUrl" />
            <i class="iconfont icon-xiala"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="/info"><i class="iconfont icon-gerentouxiang"></i>基本资料</el-dropdown-item>
              <el-dropdown-item command="/avatar"><i class="iconfont icon-genghuanleixing"></i>更换头像</el-dropdown-item>
              <el-dropdown-item command="/resetPassword"><i class="iconfont icon-biaozhu-16"></i>重置密码</el-dropdown-item>
              <el-dropdown-item command="/login"><i class="iconfont icon-tuichu"></i>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main class="right-main">
        <router-view></router-view>
      </el-main>
      <el-footer class="right-bottom">菠萝论坛平台 @2023 Create by 钟艺</el-footer>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
  border-color: #fff;
}

.tac {
  height: 100vh;

  .right {
    .right-bottom {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #666;
      font-size: 0.8rem;
    }

    .right-top {
      height: 5rem;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      margin: 1rem 1rem;
      align-items: center;

      .el-dropdown__box {
        .el-avatar {
          margin-right: 0.5rem
        }

        &:active,
        &:focus {
          outline: none;
        }
      }
    }
  }

  .left {
    background-color: #232323;

    .logo {
      height: 8rem;
      background: url('@/assets/logo.png') no-repeat center / 8rem auto;
    }

    .el-menu {
      border-right: none;
    }
  }
}
</style>