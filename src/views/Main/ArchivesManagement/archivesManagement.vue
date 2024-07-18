<template>
  <div>
    <div class="header-sty">
      <div>档案管理</div>

      <div style="display: flex; align-items: center">
        <el-input
          v-model="search"
          placeholder="请输入姓名"
          clearable
          style="margin-right: 15px"
          @clear="handleClear()"
        />
        <el-button type="primary" @click="handleSearch()">搜索</el-button>
        <el-button type="primary" @click="handleAdd()">新增</el-button>
      </div>
    </div>
    <el-table :data="tableList" style="width: 100%" border>
      <el-table-column type="index" width="60" label="序号" align="center" />
      <el-table-column prop="name" label="名字" width="180" align="center" />
      <el-table-column prop="sex" label="性别" width="180" align="center">
        <template #default="{ row }">
          <el-tag :type="row.sex == '男' ? 'primary' : 'danger'">{{
            row.sex
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="出生日期"
        width="180"
        align="center"
      />

      <el-table-column prop="address" label="家庭住址" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button size="mini" type="primary" @click="handleEdit(row)"
            >修改</el-button
          >
          <el-button size="mini" type="danger" @click="handleDelete(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 表单弹窗 -->
    <el-dialog v-model="dialogVisible" @close="dialogVisible = false">
      <div class="dialog-header">
        <div>{{ form.id ? "编辑" : "新增" }}儿童档案</div>
      </div>
      <el-form
        :model="form"
        label-width="80px"
        :rules="formRules"
        ref="formRef"
        label-position="left"
        style="margin: 0 50px"
      >
        <el-form-item label="名字" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="form.sex"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="date">
          <el-input v-model="form.date"></el-input>
        </el-form-item>

        <el-form-item label="家庭住址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSave">保存</el-button>
        <el-button type="primary" @click="dialogVisible = false" plain
          >取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTableStore } from "@/stores/table";
import { ElMessage } from "element-plus";
const tableStore = useTableStore(),
  router = useRouter(),
  route = useRoute();
const formRef = ref();
const tableList = ref([]);
const dialogVisible = ref(false);
const search = ref("");
const form = ref({
  id: "",
  date: "",
  name: "",
  sex: "",
  address: "",
});

const formRules = reactive({
  date: [{ required: true, message: "请输入出生日期", trigger: "blur" }],
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
  address: [{ required: true, message: "请输入家庭住址", trigger: "blur" }],
});
onMounted(() => {
  initData();
});
const initData = () => {
  tableList.value = tableStore.archivesList;
};

const handleSearch = () => {
  tableList.value = tableStore.archivesList.filter((item) => {
    return item.name.includes(search.value);
  });
};
const handleClear = () => {
  initData();
};

const handleAdd = () => {
  const newForm = {
    name: "",
    date: "",
    sex: "",
    address: "",
    id: "",
  };
  form.value = { ...newForm };
  dialogVisible.value = true; // 显示表单弹窗
};
const handleEdit = (row) => {
  Object.assign(form.value, row); // 将当前行数据填充到表单
  dialogVisible.value = true; // 显示表单弹窗
};

const handleDelete = (row) => {
  // 处理删除操作
  tableStore.delArchivesList(row);
  ElMessage.success("删除成功");
  initData();
};

const handleSave = async () => {
  console.log(form);
  if (!formRef.value) return;
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      tableStore.setArchivesList(form.value);
      ElMessage.success("保存成功");
      initData();
    } else {
      console.log("error submit!", fields);
    }
  });
  dialogVisible.value = false; // 关闭表单弹窗
};
</script>
<style scoped lang="scss">
.header-sty {
  display: flex;
  margin-bottom: 25px;
  justify-content: space-between;
}
.dialog-header {
  text-align: center;
  margin: 25px;
  :first-child {
    font-size: 20px;
    font-weight: 600;
  }
}
.dialog-footer {
  text-align: center;
  margin: 25px;
}
</style>
