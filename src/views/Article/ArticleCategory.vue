<script setup>
import { ref, onMounted } from 'vue'
import { getCategoryAPI } from '@/api/CategoryAPI/getCategoryAPI.js'
import { addCategoryAPI } from '@/api/CategoryAPI/addCategoryAPI'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { updateCategoryAPI } from '@/api/CategoryAPI/updateCategoryAPI'
import { deleteCategoryAPI } from '@/api/CategoryAPI/deleteCategoryAPI'
const tableData = ref([

])
const getCategory = async () => {
  const result = await getCategoryAPI()
  tableData.value = result.data
}
onMounted(() => getCategory())
const isShowDialog = ref(false);
const newCategoryDetail = ref({
  newCategoryName: '',
  newCategoryAlias: '',
})
const rules = ref({
  newCategoryName: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
  ],
  newCategoryAlias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
  ]
})
const addCategory = async () => {
  const res = await addCategoryAPI(newCategoryDetail.value)
  ElMessage.success(res.message ? res.message : '添加成功')
  //隐藏弹窗
  isShowDialog.value = false
  //再次访问后台接口，查询所有分类
  getCategory()
}
const title = ref('')
const updateCategoryEcho = (scope) => {
  title.value = '修改分类'
  isShowDialog.value = true
  newCategoryDetail.value.newCategoryName = scope.row.categoryName
  newCategoryDetail.value.newCategoryAlias = scope.row.categoryAlias
  newCategoryDetail.value.id = scope.row.id
}
const updateCategory = async () => {
  const result = await updateCategoryAPI(newCategoryDetail.value)
  ElMessage.success(result.message ? result.message : '修改成功')
  //隐藏弹窗
  isShowDialog.value = false
  //再次访问后台接口，查询所有分类
  getCategory()
}
const deleteCategory = async (scope) => {
  const result = await deleteCategoryAPI(scope.row.id)
  ElMessage.success(result.message ? result.message : '删除成功')
  getCategory()
}
</script>
<template>
  <div class="list">
    <el-card>
      <template #header>
        <div class="header">
          <span>文章分类</span>
          <div class="extra">
            <el-button type="primary" class="add" @click="title = '添加分类'; isShowDialog = true">添加分类</el-button>
          </div>
        </div>
      </template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="categoryName" label="分类名称" width="500" />
        <el-table-column prop="categoryAlias" label="分类别名" width="500" />
        <el-table-column width="85" label="操作">
          <template #default="scope">
            <el-button size="small" class="list-button" @click="updateCategoryEcho(scope)"><i
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
    </el-card>
  </div>
  <el-dialog v-model="isShowDialog" :title="title">
    <el-form :model="newCategoryDetail" :rules="rules" label-width="100px" style="padding-right: 30px">
      <el-form-item label="分类名称" prop="newCategoryName">
        <el-input v-model="newCategoryDetail.newCategoryName" minlength="1" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="newCategoryAlias">
        <el-input v-model="newCategoryDetail.newCategoryAlias" minlength="1" maxlength="15"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isShowDialog = false">取消</el-button>
        <el-button type="primary" @click="title === '添加分类' ? addCategory() : updateCategory()"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
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