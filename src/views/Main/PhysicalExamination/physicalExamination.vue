<template>
  <div>
    <div class="header-sty">
      <div>体检记录</div>
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
      <el-table-column prop="height" label="身高" width="120" align="center" />

      <el-table-column prop="weight" label="体重" align="center" width="120" />
      <el-table-column prop="vision" label="视力状况" align="center" />
      <el-table-column
        prop="cardiopulmonaryCondition"
        label="心肺状况"
        align="center"
      />
      <el-table-column prop="ctCondition" label="胸透状况" align="center" />
      <el-table-column prop="healthExamTime" label="体检日期" align="center">
        <template #default="{ row }">
          {{ dateFormat(row.healthExamTime) || "- -" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="nexthealthExamTime"
        label="下次体检日期"
        align="center"
      >
        <template #default="{ row }">
          {{ dateFormat(row.nexthealthExamTime) || "- -" }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="180">
        <template #default="{ row }">
          <el-button type="success" size="small" @click="handleMake(row)"
            >预约体检</el-button
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
          <div>预约体检</div>
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
          <el-form-item label="下次体检日期" prop="nexthealthExamTime">
            <el-date-picker
              v-model="form.nexthealthExamTime"
              type="date"
              placeholder="请选择下次体检日期"
              :default-value="new Date()"
              :disabled-date="disabledNowDate"
              :shortcuts="shortcuts"
              format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
        <div class="dialog-header">
          <div>{{ form.id ? "编辑" : "新增" }}体检记录</div>
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
          <el-form-item label="生长发育情况" prop="vision">
            <el-input v-model="form.vision"></el-input>
          </el-form-item>
          <el-form-item label="疾病史" prop="cardiopulmonaryCondition">
            <el-input v-model="form.cardiopulmonaryCondition"></el-input>
          </el-form-item>
          <el-form-item label="过敏史" prop="ctCondition">
            <el-input v-model="form.ctCondition"></el-input>
          </el-form-item>
          <el-form-item label="体检日期" prop="healthExamTime">
            <el-date-picker
              v-model="form.healthExamTime"
              type="date"
              placeholder="请选择体检日期"
              :disabled-date="disabledDate"
              :shortcuts="shortcuts"
              format="YYYY-MM-DD"
            />
          </el-form-item>
          <!-- <el-form-item label="照片" prop="photo">
          <el-input v-model="form.photo"></el-input>
        </el-form-item> -->
        </el-form>
        <el-form
          v-else
          :model="form"
          label-width="120px"
          :rules="formRules"
          ref="formRef"
          label-position="left"
          style="margin: 0 50px"
        >
          <el-form-item label="姓名" prop="nameCopy">
            <el-select
              v-model="form.nameCopy"
              placeholder="请选择人员"
              style="margin-right: 15px"
              @clear="handleClear()"
              @change="handleChange"
              clearable
              filterable
            >
              <el-option
                v-for="item in options"
                :value-key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button type="primary" v-if="form.id" @click="handleSave()"
          >保存</el-button
        >
        <el-button type="primary" v-else @click="handleSave()">保存</el-button>
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
import {
  shortcuts,
  disabledDate,
  dateFormat,
  disabledNowDate,
} from "@/utils/index";
const tableStore = useTableStore(),
  userStore = useUserStore(),
  router = useRouter(),
  route = useRoute();

const userObj = userStore.userObj;
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
  nameCopy: "",
  sex: "",
  height: "",
  weight: "",
  vision: "",
  cardiopulmonaryCondition: "",
  ctCondition: "",
  healthExamTime: "",
  nexthealthExamTime: "",
  time: "",
});
const type = ref("add");
const formRules = reactive({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
  height: [{ required: true, message: "请输入身高", trigger: "blur" }],
  weight: [{ required: true, message: "请输入体重", trigger: "blur" }],
  vision: [{ required: true, message: "请输入生长发育情况", trigger: "blur" }],
  cardiopulmonaryCondition: [
    { required: true, message: "请输入疾病史", trigger: "blur" },
  ],
  ctCondition: [{ required: true, message: "请输入过敏史", trigger: "blur" }],
  healthExamTime: [
    { required: true, message: "请输入体检日期", trigger: "blur" },
  ],
});

const options = computed(() => tableStore.archivesList);

const selectedItem = ref();
onMounted(() => {
  initData();
});

const initData = () => {
  // 将数组转换为 Map，使用 id 作为键
  const map = new Map();
  tableStore.archivesList.forEach((item) => map.set(item.id, item));
  tableStore.physicalExaminationList.forEach((item) => map.set(item.id, item));
  // 获取 Map 中的值，构成新的数组
  // tableList.value = Array.from(map.values());
  tableList.value = tableStore.archivesList;
  if (userObj.role == "parents") {
    tableList.value = tableList.value.filter((item) => {
      return item.idNumber == userObj.idNumber;
    });
  }
  console.log(tableList.value);
};
const handleSearch = () => {
  tableList.value = tableStore.physicalExaminationList.filter((item) => {
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
const handleChange = (el) => {
  // 根据选中项的值，在 options 数组中找到对应的 item
  selectedItem.value = options.value.find((item) => item.id == el);
  form.value.name = selectedItem.value.name;

  // 现在您可以使用 selectedItem 对象进行需要的操作
  console.log(selectedItem.value.name);
  console.log(el);
  console.log(form.value);
};

const handleAdd = () => {
  // tableStore.addPhysicalExaminationList(val);
  const newForm = {
    id: "",
    name: "",
    sex: "",
    height: "",
    weight: "",
    vision: "",
    cardiopulmonaryCondition: "",
    ctCondition: "",
  };
  form.value = { ...newForm };
  console.log(form.value);
  type.value = "add";
  dialogVisible.value = true; // 显示表单弹窗
};

const handleMake = (row) => {
  Object.assign(form.value, row); // 将当前行数据填充到表单
  type.value = "make";
  console.log(form.value);
  dialogVisible.value = true; // 显示表单弹窗
};
const handleEdit = (row) => {
  Object.assign(form.value, row); // 将当前行数据填充到表单
  type.value = "edit";
  dialogVisible.value = true; // 显示表单弹窗
};

const handleDelete = (row) => {
  // 处理删除操作
  console.log(row);
  tableStore.delPhysicalExaminationList(row);
  ElMessage.success("删除成功");
  initData();
};

const handleSave = async () => {
  console.log(type.value);
  if (!formRef.value) return;
  if (type.value == "add") {
    form.value.id = selectedItem.value.id;
    tableStore.addPhysicalExaminationList(form.value);
  } else {
    await formRef.value.validate((valid, fields) => {
      if (valid) {
        tableStore.setPhysicalExaminationList(form.value);
        ElMessage.success("保存成功");
        initData();
      } else {
        console.log("error submit!", fields);
      }
    });
  }
  dialogVisible.value = false;
  // 关闭表单弹窗
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
