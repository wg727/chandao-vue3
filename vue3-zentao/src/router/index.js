import {createRouter, createWebHashHistory} from "vue-router";
import projectTable from "../views/projectList/projectTable.vue";
import projectView from "../views/projectList/projectView.vue";
import hoursStatistics from "../views/implement/hoursStatistics.vue";
import marketDemand from "../views/marketDemand/index.vue";
import marketDemandEdit from "../views/marketDemand/marketDemandEdit.vue";
import organization from "../views/workHoursHint/organization.vue";
import InputHint from "../views/workHoursHint/InputHint.vue";
import aaa from "../views/workHoursHint/aaa.vue";
import addTesk from "../views/add_test_product/addTesk.vue";
import product from "../views/add_test_product/product.vue";
import test from "../views/add_test_product/test.vue";

const routes = [
    {
        path: "/",
        redirect: "/projectTable",
      },
      {
        //项目集报表
        path: "/projectTable",
        name: "projectTable",
        component: projectTable,
      },
      {
        //项目集概况
        path: "/projectView",
        name: "projectView",
        component: projectView,
      },
      {
        //工时统计
        path: "/hoursStatistics",
        name: "hoursStatistics",
        component: hoursStatistics,
      },
      {
        //市场需求管理
        path: "/marketDemand",
        name: "marketDemand",
        component: marketDemand,
      },
      {
        //市场需求管理编辑
        path: "/marketDemandEdit",
        name: "marketDemandEdit",
        component: marketDemandEdit,
      },
      {
        //工时提示--组织
        path: "/organization",
        name: "organization",
        component: organization,
      },
      {
        //工时提示--工时录入提醒设置
        path: "/InputHint",
        name: "InputHint",
        component: InputHint,
      },
      {
        //工时提示--工时录入提醒设置
        path: "/aaa",
        name: "aaa",
        component: aaa,
      },
      {
        //新增任务
        path: "/addTesk",
        name: "addTesk",
        component: addTesk,
      },
      {
        //产品
        path: "/product",
        name: "product",
        component: product,
      },
      {
        //测试
        path: "/test",
        name: "test",
        component: test,
      },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});



export default router;