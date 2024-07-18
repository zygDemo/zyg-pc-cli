<template>
  <div>
    <div class="header-sty">
      <div>健康状况</div>
      <div style="display: flex; align-items: center">
        <el-input
          v-model="search.name"
          placeholder="请输入姓名"
          clearable
          style="margin-right: 15px"
          @clear="handleClear()"
        />
        <el-select
          v-model="search.sex"
          placeholder="请选择性别"
          style="margin-right: 15px"
          @clear="handleClear()"
          clearable
        >
          <el-option
            v-for="item in sexOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button type="primary" @click="handleSearch()">搜索</el-button>
        <el-button type="primary" @click="handleAdd()">新增</el-button>
      </div>
    </div>
    <el-table
      :data="tableList"
      style="width: 100%"
      :header-cell-style="{ background: '#F3F5FA', color: '#000000' }"
      border
    >
      <el-table-column type="index" width="60" label="序号" align="center" />
      <el-table-column prop="name" label="名字" width="120" align="center" />
      <el-table-column prop="sex" label="性别" width="120" align="center">
        <template #default="{ row }">
          <el-tag :type="row.sex == '男' ? 'primary' : 'danger'">{{
            row.sex
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="height" label="身高" width="120" align="center" />

      <el-table-column prop="weight" label="体重" align="center" width="120" />
      <el-table-column
        prop="developmentSituation"
        label="生长发育情况"
        align="center"
      />
      <el-table-column prop="diseasesHistory" label="疾病史" align="center" />
      <el-table-column prop="allergicHistory" label="过敏史" align="center" />
      <el-table-column label="操作" align="center" width="180">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="handleEdit(row)"
            >修改</el-button
          >
          <el-button size="small" type="danger" @click="handleDelete(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 表单弹窗 -->
    <el-dialog v-model="dialogVisible" @close="dialogVisible = false">
      <div class="dialog-header">
        <div>{{ form.id ? "编辑" : "新增" }}健康状况</div>
      </div>
      <el-form
        :model="form"
        label-width="120px"
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
        <el-form-item label="身高" prop="height">
          <el-input v-model="form.height"></el-input>
        </el-form-item>
        <el-form-item label="体重" prop="weight">
          <el-input v-model="form.weight"></el-input>
        </el-form-item>
        <el-form-item label="生长发育情况" prop="developmentSituation">
          <el-input v-model="form.developmentSituation"></el-input>
        </el-form-item>
        <el-form-item label="疾病史" prop="diseasesHistory">
          <el-input v-model="form.diseasesHistory"></el-input>
        </el-form-item>
        <el-form-item label="过敏史" prop="allergicHistory">
          <el-input v-model="form.allergicHistory"></el-input>
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
import { useTableStore } from "@/stores/table";
import { ElMessage } from "element-plus";
import { sexOptions } from "@/enums/index.js";
const tableStore = useTableStore(),
  router = useRouter(),
  route = useRoute();
const formRef = ref();
const tableList = ref([]);
const dialogVisible = ref(false);
const search = reactive({
  name: "",
  sex: "",
  idNumber: "",
});
const form = ref({
  id: "",
  name: "",
  sex: "",
  height: "",
  weight: "",
  developmentSituation: "",
  diseasesHistory: "",
  allergicHistory: "",
});

const formRules = reactive({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
  height: [{ required: true, message: "请输入身高", trigger: "blur" }],
  weight: [{ required: true, message: "请输入体重", trigger: "blur" }],
  developmentSituation: [
    { required: true, message: "请输入生长发育情况", trigger: "blur" },
  ],
  diseasesHistory: [
    { required: true, message: "请输入疾病史", trigger: "blur" },
  ],
  allergicHistory: [
    { required: true, message: "请输入过敏史", trigger: "blur" },
  ],
});
onMounted(() => {
  initData();
});
const initData = () => {
  tableList.value = tableStore.healthList;
};
const handleSearch = () => {
  tableList.value = tableStore.healthList.filter((item) => {
    return item.name.includes(search.name);
  });
  if (search.sex) {
    tableList.value = tableList.value.filter((item) => {
      return item.sex == search.sex;
    });
  }
};

const handleClear = () => {
  search.idNumber = "";
  search.name = "";
  search.sex = "";
  initData();
};
const handleAdd = () => {
  const newForm = {
    id: "",
    name: "",
    sex: "",
    height: "",
    weight: "",
    developmentSituation: "",
    diseasesHistory: "",
    allergicHistory: "",
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
  tableStore.delHealthList(row);
  ElMessage.success("删除成功");
  initData();
};

const handleSave = async () => {
  console.log(form);
  if (!formRef.value) return;
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      tableStore.setHealthList(form.value);
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
