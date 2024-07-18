<template>
  <div>
    <div class="header-sty">
      <div>公告管理</div>
      <!-- <div style="display: flex; align-items: center">
        <el-input
          v-model="search.name"
          placeholder="请输入标题"
          clearable
          style="margin-right: 15px"
          @clear="handleClear()"
        />

        <el-button type="primary" @click="handleSearch()">搜索</el-button>
        <el-button type="primary" @click="handleAdd()">新增</el-button>
      </div> -->
    </div>
    <el-table
      :data="tableList"
      style="width: 100%"
      :header-cell-style="{ background: '#F3F5FA', color: '#000000' }"
      border
    >
      <el-table-column type="index" width="60" label="序号" align="center" />
      <el-table-column
        prop="title"
        label="公告标题"
        width="180"
        align="center"
      />
      <el-table-column prop="content" label="公告内容" align="center">
      </el-table-column>
      <el-table-column
        prop="switch"
        label="是否开启"
        width="180"
        align="center"
      >
        <template #default="{ row }">
          <el-switch
            v-model="row.switch"
            active-value="1"
            inactive-value="2"
            @change="changeSwitch()"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column prop="time" label="日期" align="center" width="180" />
      <el-table-column label="操作" align="center" width="240">
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
      <div>
        <div class="dialog-header">
          <div>{{ form.id ? "编辑" : "新增" }}公告</div>
        </div>
        <el-form
          :model="form"
          label-width="120px"
          :rules="formRules"
          ref="formRef"
          label-position="left"
          style="margin: 0 50px"
        >
          <el-form-item label="公告标题" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="公告内容" prop="content">
            <el-input
              v-model="form.content"
              type="textarea"
              :rows="4"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否开启" prop="switch">
            <el-switch
              v-model="form.switch"
              active-value="1"
              inactive-value="2"
            />
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button type="primary" @click="dialogVisible = false" plain
            >取消</el-button
          >
        </div>
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
import QrcodeVue from "qrcode.vue";
import html2canvas from "html2canvas";
const tableStore = useTableStore(),
  router = useRouter(),
  route = useRoute();
const formRef = ref();
const tableList = ref([]);
const dialogVisible = ref(false);
const search = reactive({
  title: "",
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

const qrcodeRef = ref(null);

const type = ref(),
  fileBase64 = ref(),
  qrCode = ref("");
const rowObj = reactive({});
const formRules = reactive({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
  height: [{ required: true, message: "请输入健康评价", trigger: "blur" }],
  weight: [{ required: true, message: "请输入评价人", trigger: "blur" }],
  time: [{ required: true, message: "请输入评价日期", trigger: "blur" }],
  // developmentSituation: [
  //   { required: true, message: "请输入生长发育情况", trigger: "blur" },
  // ],
  // diseasesHistory: [
  //   { required: true, message: "请输入疾病史", trigger: "blur" },
  // ],
  // allergicHistory: [
  //   { required: true, message: "请输入过敏史", trigger: "blur" },
  // ],
});
onMounted(() => {
  initData();
});
const initData = () => {
  tableList.value = tableStore.noticeList;
  console.log(tableStore.noticeList);
};
const handleSearch = () => {
  console.log(
    tableStore.noticeList.filter((item) => {
      return item.title.includes(search.title);
    })
  );
  tableList.value = tableStore.noticeList.filter((item) => {
    return item.title.includes(search.title);
  });
};
const handleClear = () => {
  search.idNumber = "";
  search.name = "";
  search.sex = "";
  initData();
};
const handleAdd = () => {
  type.value = "add";
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
const changeSwitch = (el) => {
  console.log(el);
  ElMessage({
    type: "success",
    message: "修改成功!",
  });
};

const handleEdit = (row) => {
  type.value = "edit";
  Object.assign(form.value, row); // 将当前行数据填充到表单
  dialogVisible.value = true; // 显示表单弹窗
};

const handleDelete = (row) => {
  // 处理删除操作
  tableStore.delNoticeList(row);
  ElMessage.success("删除成功");
  initData();
};

const handleSave = async () => {
  console.log(form);
  if (!formRef.value) return;
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      tableStore.setNoticeList(form.value);
      ElMessage.success("保存成功");
      initData();
    } else {
      console.log("error submit!", fields);
    }
  });
  dialogVisible.value = false; // 关闭表单弹窗
};

const handleGenerateImg = async () => {
  const popupElement = document.getElementById("generateDom");
  // popupElement.style.padding = "0";
  console.log(popupElement);
  const canvas = await html2canvas(popupElement, {
    allowTaint: true, // 是否允许不同源的图片污染画布 （允许绘制）
    useCORS: true, // 是否尝试使用 CORS 从服务器加载图片 (允许跨域)
    // logging: true, // 启用日志记录以进行调试
    // width: popupElement.clientWidth * 1.01, // 设置图片宽度
    // height: popupElement.clientHeight * 1.005, // 设置图片高度
    y: 1,
  });
  // 转base64格式图片
  const base64 = canvas.toDataURL("image/png");
  fileBase64.value = base64;
  console.log(fileBase64.value);
  // popupElement.style.display = "none";
};
const downloadCard = () => {
  const link = document.createElement("a");
  link.href = fileBase64.value;
  link.download = "card.png"; // 下载的文件名
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const downloadQRCode = async () => {
  const element = document.getElementById("qrcodeDom");

  if (element) {
    const canvas = await html2canvas(element, {
      allowTaint: true, // 是否允许不同源的图片污染画布 （允许绘制）
      useCORS: true, // 是否尝试使用 CORS 从服务器加载图片 (允许跨域)
      // logging: true, // 启用日志记录以进行调试
      // width: popupElement.clientWidth * 1.01, // 设置图片宽度
      // height: popupElement.clientHeight * 1.005, // 设置图片高度
      y: 1,
    });
    // 转base64格式图片
    const qrCodeDataURL = canvas.toDataURL("image/png"); // 将二维码转换为数据 URL
    const link = document.createElement("a");
    link.href = qrCodeDataURL;
    link.download = "qrcode.png"; // 下载的文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
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

.qr-sty {
  text-align: center;
}

.one {
  background-image: url("../../../assets/Images/imgBg2.jpeg");
  height: 500px;
  width: 260px;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 40px;
  text-align: center;
  img {
    height: 90px;
    width: 80px;
    object-fit: cover;
  }
  .two {
    font-size: 15px;
    color: #fff;
    margin-top: 20px;
  }
}
</style>
