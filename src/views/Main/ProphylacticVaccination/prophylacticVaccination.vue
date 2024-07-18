<template>
  <div>
    <div class="header-sty">
      <div>预防接种</div>
      <div
        style="display: flex; align-items: center"
        v-if="userObj.role != 'parents'"
      >
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
      border
      :header-cell-style="{ background: '#F3F5FA', color: '#000000' }"
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
      <el-table-column
        prop="inoculateType"
        label="接种类型"
        width="120"
        align="center"
      />

      <!-- <el-table-column
        prop="weight"
        label="总剂次"
        align="center"
        width="120"
      /> -->
      <el-table-column prop="inoculantTime1" label="第1剂次" align="center">
        <template #default="{ row }">
          {{ dateFormat(row.inoculantTime1) }}
        </template>
      </el-table-column>
      <el-table-column prop="inoculantTime2" label="第2剂次" align="center">
        <template #default="{ row }">
          {{ dateFormat(row.inoculantTime2) }}
        </template>
      </el-table-column>
      <el-table-column prop="inoculantTime3" label="第3剂次" align="center">
        <template #default="{ row }">
          {{ dateFormat(row.inoculantTime3) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template #default="{ row }">
          <el-button type="success" size="small" @click="handleMake(row)"
            >预约接种</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="handleEdit(row)"
            v-if="userObj.role != 'parents'"
            >修改</el-button
          >
          <!-- <el-button
            size="small"
            type="danger"
            @click="handleDelete(row)"
            v-if="userObj.role != 'parents'"
            >删除</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 表单弹窗 -->
    <el-dialog v-model="dialogVisible" @close="dialogVisible = false">
      <div v-if="type == 'make'">
        <div class="dialog-header">
          <div>预约接种</div>
        </div>
        <el-form
          v-if="form.id"
          :model="form"
          label-width="120px"
          :rules="formRules"
          ref="formRef"
          label-position="left"
          style="margin: 0 50px"
        >
          <el-form-item label="下次接种日期" prop="inoculate">
            <el-date-picker
              v-model="form.inoculate"
              type="date"
              placeholder="请选择下次接种日期"
              :disabled-date="disabledNowDate"
              :shortcuts="shortcuts"
              format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-form>
      </div>

      <div v-else>
        <div class="dialog-header">
          <div>{{ form.id ? "编辑" : "新增" }}预防接种</div>
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
          <el-form-item label="接种类型" prop="inoculateType">
            <el-input v-model="form.inoculateType"></el-input>
          </el-form-item>
          <el-form-item label="第1剂次" prop="inoculateTime1">
            <el-input v-model="form.inoculateTime1"></el-input>
          </el-form-item>
          <el-form-item label="第2剂次" prop="inoculateTime2">
            <el-input v-model="form.inoculateTime2"></el-input>
          </el-form-item>
          <el-form-item label="第3剂次" prop="inoculateTime3">
            <el-input v-model="form.inoculateTime3"></el-input>
          </el-form-item>
          <!-- <el-form-item label="照片" prop="photo">
          <el-input v-model="form.photo"></el-input>
        </el-form-item> -->
        </el-form>
      </div>
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
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
import { sexOptions } from "@/enums/index.js";
import { dateFormat, disabledNowDate } from "@/utils/index.js";
const tableStore = useTableStore(),
  userStore = useUserStore(),
  router = useRouter(),
  route = useRoute();

const userObj = userStore.userObj;
const formRef = ref();
const tableList = ref([]);
const dialogVisible = ref(false);
const type = ref("add");
const search = reactive({
  name: "",
  sex: "",
  idNumber: "",
});
const form = ref({
  id: "",
  name: "",
  sex: "",
  inoculateType: "",
  // weight: "",
  inoculantTime1: "",
  inoculantTime2: "",
  inoculantTime3: "",
  inoculate: "", // 下次接种时间
});

const inoculateKey = ref("");
const formRules = reactive({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
  inoculateType: [
    { required: true, message: "请输入接种类型", trigger: "blur" },
  ],
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
  inoculate: [
    { required: true, message: "请选择下一针接种时间", trigger: "blur" },
  ],
});
onMounted(() => {
  initData();
});
const initData = () => {
  // tableList.value = tableStore.prophylacticVaccinationList;

  // 将数组转换为 Map，使用 id 作为键
  const map = new Map();
  tableStore.archivesList.forEach((item) => map.set(item.id, item));
  tableStore.prophylacticVaccinationList.forEach((item) =>
    map.set(item.id, item)
  );
  // 获取 Map 中的值，构成新的数组
  // tableList.value = Array.from(map.values());
  tableList.value = tableStore.archivesList;
  if (userObj.role == "parents") {
    tableList.value = tableList.value.filter((item) => {
      return item.idNumber == userObj.idNumber;
    });
  }
  console.log(form.value);
};
const handleSearch = () => {
  tableList.value = tableStore.prophylacticVaccinationList.filter((item) => {
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
    inoculateType: "",
    // weight: "",
    inoculantTime1: "",
    inoculantTime2: "",
    inoculantTime3: "",
    inoculate: "", // 下次接种时间
  };
  type.value = "add";
  form.value = { ...newForm };
  dialogVisible.value = true; // 显示表单弹窗
};

const handleMake = (row) => {
  inoculateKey.value = "inoculantTime3";
  Object.assign(form.value, row); // 将当前行数据填充到表单
  form.value.inoculate = "";
  for (const key of Object.keys(form.value)) {
    // 如果键以'inoculantTime'开头并且对应值为空
    if (key.startsWith("inoculantTime") && form.value[key] === "") {
      console.log(`第一个为空的inoculantTime字段是：${key}`);
      inoculateKey.value = key;
      break; // 找到第一个为空的字段后结束循环
    }
  }
  type.value = "make";
  dialogVisible.value = true; // 显示表单弹窗
};

const handleEdit = (row) => {
  type.value = "edit";
  Object.assign(form.value, row); // 将当前行数据填充到表单
  dialogVisible.value = true; // 显示表单弹窗
};

const handleDelete = (row) => {
  // 处理删除操作
  tableStore.delProphylacticVaccinationList(row);
  ElMessage.success("删除成功");
  initData();
};

const handleSave = async () => {
  console.log(form.value[inoculateKey.value]);
  console.log(form);
  if (!formRef.value) return;
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      if (type.value == "make") {
        form.value[inoculateKey.value] = form.value.inoculate;
      }
      tableStore.setProphylacticVaccinationList(form.value);
      ElMessage.success("保存成功");
      dialogVisible.value = false; // 关闭表单弹窗
      initData();
    } else {
      console.log("error submit!", fields);
    }
  });
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
