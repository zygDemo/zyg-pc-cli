import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Home/HomeView.vue";
import Layout from "@/views/Layout/Layout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login", //登录
      name: "Login",
      component: () => import("../views/Login/LoginView.vue"),
    },
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "/home",
          name: "Home",
          component: HomeView,
        },
        {
          path: "/about",
          name: "About",
          component: () => import("../views/About/AboutView.vue"),
        },
        {
          path: "/userManagement", //用户管理
          name: "UserManagement",
          component: () =>
            import("../views/Main/UserManagement/userManagement.vue"),
        },
        {
          path: "/archivesManagement", //档案管理
          name: "ArchivesManagement",
          component: () =>
            import("../views/Main/ArchivesManagement/archivesManagement.vue"),
        },
        {
          path: "/healthCondition", //健康状况
          name: "HealthCondition",
          component: () =>
            import("../views/Main/HealthCondition/healthCondition.vue"),
        },
        {
          path: "/physicalExamination", //体检记录
          name: "PhysicalExamination",
          component: () =>
            import("../views/Main/PhysicalExamination/physicalExamination.vue"),
        },
        {
          path: "/prophylacticVaccination", //预防接种
          name: "ProphylacticVaccination",
          component: () =>
            import(
              "../views/Main/ProphylacticVaccination/prophylacticVaccination.vue"
            ),
        },
        {
          path: "/healthEvaluation", //健康评价
          name: "HealthEvaluation",
          component: () =>
            import("../views/Main/HealthEvaluation/healthEvaluation.vue"),
        },
      ],
    },
  ],
});

export default router;
