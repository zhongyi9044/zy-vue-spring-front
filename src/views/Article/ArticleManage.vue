<script setup>
import { ref, onMounted } from 'vue'
import { getCategoryAPI } from '@/api/CategoryAPI/getCategoryAPI.js'
import { getArticleListAPI } from '@/api/ArticleAPI/getArticleListAPI.js'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { addArticleAPI } from '@/api/ArticleAPI/addArticleAPI.js'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
const category = ref([])
const articles = ref([])
const pageSize = ref(3)
const handleSizeChange = (size) => {
  pageSize.value = size
  getArticleList()
}
const pageNum = ref(1)
const handleCurrentChange = (num) => {
  pageNum.value = num
  getArticleList()
}
const total = ref(20)
const selectCategory = ref('')
const selectStatus = ref('')
// const isShowDialog = ref(false)
const getCategory = async () => {
  const result = await getCategoryAPI()
  category.value = result.data
}
const getArticleList = async () => {
  const params = ref({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    categoryId: selectCategory.value ? selectCategory.value : null,
    state: selectStatus.value ? selectStatus.value : null
  })
  console.log(params.value)
  const result = await getArticleListAPI(params.value)
  articles.value = result.data.items
  for (let i = 0; i < articles.value.length; i++) {
    let article = articles.value[i];
    for (let j = 0; j < category.value.length; j++) {
      if (article.categoryId === category.value[j].id) {
        article.categoryName = category.value[j].categoryName
      }
    }
  }
  total.value = result.data.total
}
onMounted(() => {
  getCategory()
  getArticleList()
})
const isSHowDrawer = ref(false)
const form = ref({
  title: '',
  categoryId: '',
  coverImg: '',
  content: '',
  state: ''
})
const addArticle = async (status) => {
  form.value.state = status
  console.log(form.value)
  const result = await addArticleAPI(form.value)
  ElMessage.success(result.message ? result.message : '创建成功')
  //隐藏弹窗
  isSHowDrawer.value = false
  //再次访问后台接口，查询所有分类
  getArticleList()
}
const updateArticleEcho = (scope) => {
  isSHowDrawer.value = true;
  
}
</script>
<template>
  <div class="list">
    <el-card>
      <template #header>
        <div class="header">
          <span>文章管理</span>
          <div class="extra">
            <el-button type="primary" class="add" @click="title = '发布文章'; isSHowDrawer = true">发布文章</el-button>
          </div>
        </div>
      </template>
      <el-form class="select-box">
        <el-form-item label="文章分类" class="select-category">
          <el-select v-model="selectCategory" class="m-2" placeholder=" " size="small" no-data-text=" ">
            <el-option v-for="item in category" :key="item.id" :label="item.categoryName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="文章状态" class="select-status">
          <el-select v-model="selectStatus" class="m-2" placeholder=" " size="small" no-data-text=" ">
            <el-option value="草稿" />
            <el-option value="已发布" />
          </el-select>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="getArticleList">搜索</el-button>
          <el-button @click="selectCategory = ''; selectStatus = ''">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="articles" style="width: 100%">
        <el-table-column prop="title" label="文章标题" width="400" />
        <el-table-column prop="categoryName" label="分类" width="200" />
        <el-table-column prop="createTime" label="发表时间" width="200" />
        <el-table-column prop="state" label="状态" width="250" />
        <el-table-column width="100" label="操作">
          <template #default="scope">
            <el-button size="small" class="list-button" @click="updateArticleEcho(scope)"><i
                class="iconfont icon-xiugai"></i></el-button>
            <el-popconfirm title="确定要删除吗？" cancel-button-text="取消" confirm-button-text="确定"
              @confirm="deleteCategory(scope)">
              <template #reference>
                <el-button size="small" type="danger" class="list-button"><i
                    class="iconfont icon-lajitong"></i></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="没有数据" />
        </template>
      </el-table>

      <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5, 10, 15]"
        :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
        :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        style="margin-top: 20px; justify-content: flex-end" />
    </el-card>
  </div>

  <el-drawer v-model="isSHowDrawer" size="50%">
    <template #header>
      <h4>添加文章</h4>
    </template>
    <template #default>
      <el-form :model="form">
        <el-form-item label="文章标题">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="文章分类">
          <el-select v-model="form.categoryId" placeholder="请选择">
            <el-option v-for="item in category" :key="item.id" :label="item.categoryName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="文章封面">
          <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false" :auto-upload="false">
            <img v-if="form.coverImg" :src="form.coverImg" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章内容">
          <div class="editor">
            <QuillEditor theme="snow" contentType="html" v-model:content="form.content" />
          </div>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="addArticle('已发布')">发布</el-button>
        <el-button type="primary" @click="addArticle('草稿')">草稿</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
.avatar-uploader {
  :deep() {
    .avatar {
      width: 11px;
      height: 11px;
      display: block;
    }

    .el-upload {
      border: 0.07rem dashed var(--el-border-color);
      border-radius: 0.5rem;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);

      &:hover {
        border-color: var(--el-color-primary);
      }
    }
  }

}

.el-icon {
  font-size: 1.75rem;
  color: #8c939d;
  width: 11rem;
  height: 11rem;
  text-align: center;
}

.editor {
  width: 100%;

  :deep(.ql-editor) {
    min-height: 12rem;
  }
}

.select-box {
  display: flex;

  .select-category {
    margin-right: 3rem;
  }

  .btn {
    margin-left: 3rem;
  }
}

.list-button {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  .el-button {
    border-radius: 0;
    width: 5rem;
    height: 2rem;

  }
}
</style>