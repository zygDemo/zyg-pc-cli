<template>
  <div class="login-register-container">
    <div class="form-wrapper">
      <el-tabs v-model="activeTab" type="border-card">
        <el-tab-pane label="登录" name="login">
          <el-form
            :model="loginForm"
            :rules="loginRules"
            ref="loginFormRef"
            label-width="80px"
          >
            <el-form-item label="角色" prop="role">
              <el-select v-model="loginForm.role" placeholder="请选择">
                <el-option label="管理员" value="admin"></el-option>
                <el-option label="用户" value="user"></el-option>
                <el-option label="家长" value="parents"></el-option>
              </el-select>
            </el-form-item>
            <div v-if="loginForm.role == 'parents'">
              <el-form-item label="儿童姓名" prop="name">
                <el-input
                  v-model="loginForm.name"
                  placeholder="请输入儿童姓名"
                ></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="idNumber">
                <el-input
                  v-model="loginForm.idNumber"
                  placeholder="请输入身份证号"
                ></el-input>
              </el-form-item>
            </div>
            <div v-else>
              <el-form-item label="用户名" prop="account">
                <el-input
                  v-model="loginForm.account"
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  type="password"
                  v-model="loginForm.password"
                  placeholder="请输入密码"
                  show-password
                ></el-input>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form
            :model="registerForm"
            :rules="registerRules"
            ref="registerFormRef"
            label-width="80px"
          >
            <el-form-item label="角色" prop="role">
              <el-select v-model="registerForm.role" placeholder="请选择">
                <el-option label="管理员" value="admin"></el-option>
                <el-option label="用户" value="user"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户名" prop="account">
              <el-input
                v-model="registerForm.account"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="registerForm.password"
                placeholder="请输入密码"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="phone">
              <el-input
                type="password"
                v-model="registerForm.phone"
                placeholder="请输入联系方式"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="register">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useTableStore } from "@/stores/table";
import { ElMessage } from "element-plus";
const userStore = useUserStore(),
  tableStore = useTableStore(),
  router = useRouter(),
  route = useRoute();
const activeTab = ref("login");
const userList = computed(() => userStore.userList);
const archivesList = computed(() => tableStore.archivesList);

const loginFormRef = ref(null),
  registerFormRef = ref(null);
const loginForm = reactive({
  account: "",
  password: "",
  role: "user",
  name: "",
  idNumber: "",
});
const registerForm = reactive({
  account: "",
  password: "",
  role: "user",
  phone: "",
});

const loginRules = reactive({
  account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  name: [{ required: true, message: "请输入儿童姓名", trigger: "blur" }],
  idNumber: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
});

const registerRules = reactive({
  account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  phone: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
});
onMounted(() => {
  initData();
});
const initData = () => {
  console.log(userList);
  console.log(userStore);
};

// 检查账号密码是否正确
const checkCredentials = (account, password, role) => {
  return userList.value.some(
    (user) =>
      user.account == account && user.password == password && user.role == role
  );
};
const checkUserName = (account) => {
  return userList.value.some((user) => user.account == account);
};
// 检验家长是否可登录
const checkParents = (name, idNumber) => {
  return archivesList.value.some(
    (item) => item.name == name && item.idNumber == idNumber
  );
};
// 登录逻辑
const login = async () => {
  if (!loginFormRef.value) return;
  if (loginForm.role == "parents") {
    await loginFormRef.value.validate((valid, fields) => {
      if (valid) {
        console.log(archivesList.value);
        console.log(checkParents(loginForm.name, loginForm.idNumber));
        if (checkParents(loginForm.name, loginForm.idNumber)) {
          userStore.setUserObj(loginForm);
          ElMessage.success("登录成功");
          router.push("/home");
        } else {
          ElMessage.error("未匹配到该人员");
        }
      } else {
        console.log("error submit!", fields);
      }
    });
  } else {
    await loginFormRef.value.validate((valid, fields) => {
      if (valid) {
        console.log("登录");

        console.log(checkCredentials(loginForm.account, loginForm.password));
        if (
          checkCredentials(
            loginForm.account,
            loginForm.password,
            loginForm.role
          )
        ) {
          userStore.setUserObj(loginForm);
          ElMessage.success("登录成功");
          router.push("/home");
        } else {
          ElMessage.error("用户名密码或角色错误");
        }
      } else {
        console.log("error submit!", fields);
      }
    });
  }

  console.log(loginFormRef.value);
};

const register = async () => {
  // 注册逻辑
  console.log("注册");
  if (!registerFormRef.value) return;
  await registerFormRef.value.validate((valid, fields) => {
    if (valid) {
      if (checkUserName(registerForm.account)) {
        ElMessage.error("该用户已存在");
      } else {
        userStore.setUserList(registerForm);
        ElMessage.success("注册成功");
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style scoped lang="scss">
.login-register-container {
  height: 100vh; /* 设置容器高度为视口的高度 */
  display: flex;
  justify-content: center; /* 在水平方向上居中 */
  align-items: center; /* 在垂直方向上居中 */
  background-image: url("https://pic2.zhimg.com/v2-dc73649a3d67b21508b3b8d5efecee61_r.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

.form-wrapper {
  max-width: 400px;
  width: 100%; /* 让表单占满父容器的宽度 */
  padding: 20px;
  border: 1px solid #ccc;
  opacity: 0.8;
  border-radius: 5px;
}

.el-tabs__item {
  color: #333;
}

.el-form-item__label {
  font-weight: bold;
}

.el-input {
  width: 100%;
}
</style>
