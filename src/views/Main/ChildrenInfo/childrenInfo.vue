<template>
  <div>
    <div class="header-sty">
      <div>儿童信息</div>
    </div>

    <div class="body-sty">
      <el-row :gutter="20" v-if="childrenInfo.photo">
        <el-col :span="24">
          <img class="photo-sty" :src="childrenInfo.photo" alt="" srcset="" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"> 姓名：{{ childrenInfo.name }} </el-col>
        <el-col :span="12"> 性别:{{ childrenInfo.sex }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"> 身高：{{ childrenInfo.height }} </el-col>
        <el-col :span="12"> 体重:{{ childrenInfo.weight }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"> 出生日期：{{ childrenInfo.date }} </el-col>
        <el-col :span="12"> 家庭住址:{{ childrenInfo.address }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          生长发育情况：{{ childrenInfo.developmentSituation }}
        </el-col>
        <el-col :span="12">
          心肺状况:{{ childrenInfo.cardiopulmonaryCondition }}</el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">疾病史：{{ childrenInfo.diseasesHistory }} </el-col>
        <el-col :span="12"> 过敏史:{{ childrenInfo.allergicHistory }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"> 视力：{{ childrenInfo.vision }} </el-col>
        <el-col :span="12"> ct状况:{{ childrenInfo.ctCondition }}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTableStore } from "@/stores/table";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

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
  date: "",
  name: "",
  sex: "",
  address: "",
  photo: "",
  idNumber: "",
});
const childrenInfo = reactive({});

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
  console.log(userStore.userObj);
  initData();
});
const initData = () => {
  tableList.value = tableStore.archivesList;
  tableList.value = tableList.value.filter((item) => {
    return item.idNumber == userObj.idNumber;
  });
  let [info] = tableList.value;
  Object.assign(childrenInfo, info);
  console.log(childrenInfo);
  if (tableList.value.length == 0) {
    ElMessage.error("未查询到该用户的信息");
    router.push("/");
  }
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
.body-sty {
  margin-top: 20px;
  // border: 1px solid #dcdfe6;
  height: 400px;
  font-size: 17px;
  color: #333;
  padding: 10px 50px;
  .el-row {
    margin-bottom: 10px;
  }
  .photo-sty {
    width: 120px;
    height: 120px;
    object-fit: cover;
  }
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
