<script setup>

</script>

<template>
  <el-container class="tac">
    <!-- 左边菜单 -->
    <el-aside width="12rem" class="left">
      <div class="logo"></div>
      <el-menu active-text-color="#ffd04b" background-color="#232323" class="el-menu-vertical-demo"
        text-color="#fff" router>
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
          <span>钟艺</span>
        </div>
        <el-dropdown>
          <span class="el-dropdown__box">
            <el-avatar />
            <i class="iconfont icon-xiala"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile"><i class="iconfont icon-gerentouxiang"></i>基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar"><i class="iconfont icon-genghuanleixing"></i>更换头像</el-dropdown-item>
              <el-dropdown-item command="password"><i class="iconfont icon-biaozhu-16"></i>重置密码</el-dropdown-item>
              <el-dropdown-item command="logout"><i class="iconfont icon-tuichu"></i>退出登录</el-dropdown-item>
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