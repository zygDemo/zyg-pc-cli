<template>
    <div>
      <div class="header-sty">
        <div>放款审批</div>
  
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
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input
            v-model="search.idNumber"
            placeholder="请输入身份证号"
            clearable
            style="margin-right: 15px"
            @clear="handleClear()"
          />
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
        <el-table-column prop="sex" label="性别" width="80" align="center">
          <template #default="{ row }">
            <el-tag :type="row.sex == '男' ? 'primary' : 'danger'">{{
              row.sex
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="出生日期" width="160" align="center">
          <template #default="{ row }">
            {{ dateFormat(row.date) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="idNumber"
          label="身份证号"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="120" align="center">
          <template #default="{ row }">
            {{ calculateAge(row.idNumber) }}
          </template>
        </el-table-column>
        
        <el-table-column prop="address" label="家庭住址" align="center">
        </el-table-column>
        <el-table-column prop="photo" label="照片" width="180" align="center">
          <template #default="{ row }">
            <el-image
              v-if="row.photo"
              style="width: 100px; height: 100px"
              :src="row.photo"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :initial-index="4"
              fit="cover"
            />
          </template>
        </el-table-column>
  
        <el-table-column label="操作" align="center">
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
          <div>{{ form.id ? "编辑" : "新增" }}儿童档案</div>
        </div>
        <el-form
          :model="form"
          label-width="110px"
          :rules="formRules"
          ref="formRef"
          label-position="left"
          style="margin: 0 50px"
        >
          <el-form-item label="名字" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex" class="ml-4">
              <el-radio value="男" size="large">男</el-radio>
              <el-radio value="女" size="large">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期" prop="date">
            <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="请选择出生日期"
              :disabled-date="disabledDate"
              :shortcuts="shortcuts"
              format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item label="身份证号" prop="idNumber">
            <el-input v-model="form.idNumber"></el-input>
          </el-form-item>
  
          <el-form-item label="家庭住址" prop="address">
            <avue-input-map
              :params="params"
              placeholder="请选择地图"
              v-model="formMap"
              @change="confirmMap"
            ></avue-input-map>
          </el-form-item>
          <el-form-item label="照片" prop="photo">
            <el-upload
              class="avatar-uploader"
              :action="postUrl"
              :limit="1"
              :show-file-list="false"
              :on-change="handleAvatarChange"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.photo" :src="form.photo" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
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
  import { ElMessage } from "element-plus";
  import { Plus } from "@element-plus/icons-vue";
  import { calculateAge } from "@/utils/index"
  import { useTableStore } from "@/stores/table";
  
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
    date: "",
    name: "",
    sex: "",
    address: "",
    photo: "",
    idNumber: "",
  });
  const params = {
    zoom: 10,
    // zoomEnable: false,
    // dragEnable: false,
  };
  const formMap = ref([113.509188, 34.707415, ""]);
  const options = ref([
    {
      label: "男",
      value: "男",
    },
    {
      label: "女",
      value: "女",
    },
  ]);
  const formRules = reactive({
    date: [{ required: true, message: "请输入出生日期", trigger: "blur" }],
    name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
    idNumber: [
      { required: true, message: "请输入身份证号码", trigger: "blur" },
      {
        pattern:
          /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
        message: "请输入正确的身份证号码",
      },
    ],
    address: [{ required: true, message: "请输入家庭住址", trigger: "blur" }],
  });
  const shortcuts = [
    {
      text: "今天",
      value: new Date(),
    },
    {
      text: "昨天",
      value: () => {
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24);
        return date;
      },
    },
    {
      text: "一周前",
      value: () => {
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
        return date;
      },
    },
  ];
  
  const disabledDate = (time) => {
    return time.getTime() > Date.now();
  };
  const dateFormat = (date) => {
    date = new Date(date);
    return (
      date.getFullYear() +
      "年" +
      (date.getMonth() + 1) +
      "月" +
      date.getDate() +
      "日"
    );
  };
  const imageUrl = ref("");
  const handleAvatarChange = (file, fileList) => {
    // 这里可以添加上传到服务器的逻辑
    // 本地预览图片
    const reader = new FileReader();
    reader.onload = (e) => {
      form.value.photo = e.target.result;
    };
    reader.readAsDataURL(file.raw);
  };
  const handleAvatarSuccess = (response, uploadFile) => {
    console.log(response, uploadFile);
  };
  
  const beforeAvatarUpload = (rawFile) => {
    console.log(rawFile);
    if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
      ElMessage.error("这不是图片文件!");
      return false;
    } else if (rawFile.size / 1024 / 1024 > 25) {
      ElMessage.error("图片最大不超过 25MB!");
      return false;
    }
    return true;
  };
  
  onMounted(() => {
    initData();
  });
  const initData = () => {
    tableList.value = tableStore.archivesList;
  };
  
  const handleSearch = () => {
    tableList.value = tableStore.archivesList.filter((item) => {
      return item.name.includes(search.name);
    });
    if (search.idNumber) {
      tableList.value = tableList.value.filter((item) => {
        return item.idNumber == search.idNumber;
      });
    }
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
  const confirmMap = (map) => {
    console.log(map);
    // formMap.value = map.value;
    form.value.address = map.value[2];
  
    console.log(form.address);
  };
  const handleAdd = () => {
    const newForm = {
      name: "",
      date: "",
      sex: "",
      address: "",
      id: "",
      photo: "",
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
    console.log(formRef.value);
    if (!formRef.value) return;
    await formRef.value.validate((valid, fields) => {
      if (valid) {
        tableStore.setArchivesList(form.value);
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
  
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  </style>
  