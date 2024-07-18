<template>
  <div>
    <div class="header-sty">
      <div>用户管理</div>
      <div style="display: flex; align-items: center">
        <el-input
          v-model="search"
          placeholder="请输入用户名"
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
      <el-table-column
        prop="account"
        label="用户名"
     
        align="center"
      />
      <el-table-column prop="role" label="角色" align="center">
        <template #default="{ row }">
          <el-tag :type="row.role != 'admin' ? 'primary' : 'danger'">{{
            row.role == "admin" ? "管理员" : "用户"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        align="center"
      />

      <el-table-column
        prop="phone"
        label="联系方式"
        align="center"
      />

      <el-table-column label="操作" align="center" width="180">
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
        <div>{{ form.id ? "编辑" : "新增" }}用户</div>
      </div>
      <el-form
        :model="form"
        label-width="110px"
        :rules="formRules"
        ref="formRef"
        label-position="left"
        style="margin: 0 50px"
      >
        <el-form-item label="用户名" prop="account">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="sex">
          <el-select v-model="form.role" placeholder="请选择">
                <el-option label="管理员" value="admin"></el-option>
                <el-option label="用户" value="user"></el-option>
              </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="height">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="weight">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      
        <!-- <el-form-item label="照片" prop="photo">
          <el-input v-model="form.photo"></el-input>
        </el-form-item> -->
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
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
const tableStore = useUserStore(),
  router = useRouter(),
  route = useRoute();
const formRef = ref();
const tableList = ref([]);
const dialogVisible = ref(false);

const form = ref({
  id: "",
  account: "",
  password: "",
  role: "",
  phone: "",
});

const formRules = reactive({
  account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  role: [{ required: true, message: "请输入选择角色", trigger: "blur" }],
  phone: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
});
onMounted(() => {
  initData();
});
const initData = () => {
  tableList.value = tableStore.userList;
};
const search = ref("");
const handleSearch = () => {
  tableList.value = tableStore.userList.filter((item) => {
    return item.account.includes(search.value);
  });
};
const handleClear = () => {
  initData();
};
const handleAdd = () => {
  const newForm = {
    id: "",
    account: "",
    password: "",
    role: "",
    phone: "",
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
  tableStore.delUserList(row);
  ElMessage.success("删除成功");
  initData();
};

const handleSave = async () => {
  console.log(form);
  if (!formRef.value) return;
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      tableStore.setUserList(form.value);
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
