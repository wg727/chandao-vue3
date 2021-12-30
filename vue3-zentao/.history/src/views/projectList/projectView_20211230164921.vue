<template>
	<div>
		<el-row style="margin-top: 20px">
			<el-form :model="form" label-width="100px">
				<el-col>
					<el-form-item label="项目名称:">
						<el-select v-model="form.projectName" style="width: 100%" clearable filterable>
							<el-option label="全部" value=""></el-option>
							<el-option label="灵机云运营管理平台" value="1"></el-option>
							<el-option label="数字化制造平台" value="2"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="提交时间:">
						<el-date-picker
							v-model="timer"
							type="daterange"
							range-separator="至"
							start-placeholder="开始"
							end-placeholder="结束"
							@change="dateChangebirthday"
						>
						</el-date-picker>
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>
		<!-- 添加-下载 -->
		<div class="tableList">
			<el-button class="tableExport" icon="el-icon-plus" @click="addDialog = true">新增</el-button>
			<el-button class="tableExport" icon="el-icon-s-data" @click="exportDialog = true">报表下载</el-button>
		</div>

		<!-- 表格 -->
		<el-row style="padding: 10px">
			<el-table
				:data="tableList"
				border
				:header-cell-style="{
					background: '#611ddf',
					color: '#606266',
					'text-align': 'center',
				}"
				:cell-style="{ 'text-align': 'center' }"
				:span-method="cellMerge"
			>
				<el-table-column prop="tname" label="项目名称" width="200" fixed="left"></el-table-column>
				<el-table-column prop="name" label="版本号" width="250" fixed="left"></el-table-column>
				<el-table-column prop="status" label="状态" fixed="left"></el-table-column>
				<el-table-column prop="num1" label="成果" fixed="left"></el-table-column>
				<el-table-column prop="num2" label="进展" fixed="left"></el-table-column>
				<el-table-column prop="num3" label="问题" fixed="left"></el-table-column>
				<el-table-column prop="num4" label="风险" fixed="left"></el-table-column>
				<el-table-column prop="num5" label="负责人" fixed="left"></el-table-column>
				<el-table-column prop="num6" label="提交时间" fixed="left"></el-table-column>
				<el-table-column label="操作" fixed="left" width="150">
					<template v-slot="scope">
						<el-tooltip class="item" effect="dark" content="编辑" placement="top" :enterable="false">
							<i class="el-icon-edit" @click="editButton(scope.row)"></i>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<!-- 分页 -->
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:page-size="100"
			layout="total, prev, pager, next"
			:total="1000"
		>
		</el-pagination>

		<!-- 报表下载的对话框 -->
		<el-dialog v-model="exportDialog" title="报表下载" width="30%">
			<span>是否下载当前报表数据?</span>
			<template #footer>
				<span>
					<el-button @click="exportDialog = false">取消</el-button>
					<el-button type="primary" @click="exportDialog = false">确定</el-button>
				</span>
			</template>
		</el-dialog>

		<!-- 新增的对话框 -->
		<el-dialog title="新增项目概况" v-model="addDialog">
			<el-form :model="addForm" label-width="100px">
				<el-row>
					<el-col :span="14">
						<el-form-item label="项目名称:">
							<el-select style="width: 100%" v-model="addForm.proName" placeholder="请选择项目名称">
								<el-option label="灵机云运营管理平台" value="1"></el-option>
								<el-option label="数组化制造平台" value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="14">
						<el-form-item label="版本号:">
							<el-input style="width: 100%" v-model="addForm.versionNum"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="14">
						<el-form-item label="状态:">
							<el-select style="width: 100%" v-model="addForm.status" placeholder="请选择状态">
								<el-option label="正常" value="1"></el-option>
								<el-option label="延期" value="2"></el-option>
								<el-option label="已完成" value="3"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="成果:">
							<el-input v-model="addForm.result"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="进展:">
							<el-input v-model="addForm.progress"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="问题:">
							<el-input v-model="addForm.problem"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="风险:">
							<el-input v-model="addForm.risk"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span style="margin-left: 100px" slot="footer" class="dialog-footer">
				<el-button @click="addCancel">取消</el-button>
				<el-button type="primary" @click="addReq">确定</el-button>
			</span>
		</el-dialog>

    <!-- 编辑的对话框 -->
		<el-dialog title="编辑项目概况" v-model="editDialog">
			<el-form :model="editForm" label-width="100px">
				<el-row>
					<el-col :span="14">
						<el-form-item label="项目名称:">
							<el-select style="width: 100%" v-model="editForm.proName" placeholder="请选择项目名称">
								<el-option label="灵机云运营管理平台" value="1"></el-option>
								<el-option label="数组化制造平台" value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="14">
						<el-form-item label="版本号:">
							<el-input style="width: 100%" v-model="editForm.versionNum"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="14">
						<el-form-item label="状态:">
							<el-select style="width: 100%" v-model="editForm.status" placeholder="请选择状态">
								<el-option label="正常" value="1"></el-option>
								<el-option label="延期" value="2"></el-option>
								<el-option label="已完成" value="3"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="成果:">
							<el-input v-model="editForm.result"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="进展:">
							<el-input v-model="editForm.progress"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="问题:">
							<el-input v-model="editForm.problem"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="风险:">
							<el-input v-model="editForm.risk"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span style="margin-left: 100px" slot="footer" class="dialog-footer">
				<el-button @click="editDialog=false">取消</el-button>
				<el-button type="primary" @click="editReq">确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { reactive, ref } from "vue";
import { timeStr } from "../../components/common/mixin.js";
// import { proViewListMsg,addproView ,editproView} from "@/request/api.js";
import fileDownload from "js-file-download";
import axios from "axios";
export default {
	name: "projectView",
	setup() {
		const form = reactive({
			//筛选数据
			projectName: "",
			startTime: "",
			endTime: "",
			p: "1",
			s: "10",
		});
		const timer = ref(""); //提交时间

		const tableList = reactive([
			//表格数据
			{
				tname: "灵机云运营管理平台",
				name: "V1.0.3",
				status: "正常",
				num1: "这版本完成发货报表需求设计及上线",
				num2: "完成70%",
				num3: "需要研发积极开发",
				num4: "存在系统数据加载缓慢风险",
				num5: "张三",
				num6: "2021/12/23 08:56:00",
			},
		]);

		//1.提交时间-日期转换
		function dateChangebirthday(val) {
			if (val == null) {
			} else {
				let timers = JSON.parse(JSON.stringify(val));
				form.startTime = timeStr(timers[0]);
				form.endTime = timeStr(timers[1]);
			}
		}

		//2.分页方法
		const handleCurrentChange = (val) => {
			filterInfo.p = val;
		};
		const handleSizeChange = (val) => {
			filterInfo.s = val;
		};

		//3.获取表报数据
		function getTableList() {
			proViewListMsg(form).then((res) => {
				console.log(res);
			});
		}

		//4.报表下载
		const exportDialog = reactive(false); //报表下载的对话框
		function exportFile() {
			filterInfo.p = "";
			filterInfo.s = "";
			axios({
				method: "post",
				url: `${axios.defaults.baseURL}neworder/deal/manager/contractListExport`,
				data: filterInfo,
				responseType: "blob",
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => {
				//console.log(res);
				fileDownload(res.data, "项目集报表.xlsx");
				$emit("after-download");
				filterInfo.p = 1;
				filterInfo.s = 10;
				getTableList();
			});
			exportDialog = false;
		}

		//5.新增
		let addDialog = ref(false); //新增对话框
		const addForm = reactive({
			proName: "",
			versionNum: "",
			status: "",
			result: "",
			progress: "",
			problem: "",
			risk: "",
		})
    //新增对话框取消
    function addCancel(){
      addDialog.value=false
      addForm.proName= "",
      addForm.versionNum= "",
      addForm.status= "",
      addForm.result= "",
      addForm.progress= "",
      addForm.problem= "",
      addForm.risk= ""
    }
    //新增请求
    function addReq(){
      addproView(addForm).then(res=>{
        console.log(res);
      })
    }

    //6.编辑
    let editDialog = ref(false); //新增对话框
    const editForm = reactive({
			proName: "",
			versionNum: "",
			status: "",
			result: "",
			progress: "",
			problem: "",
			risk: "",
		})
    //编辑按钮
    function editButton(row){
      console.log(row);
      editDialog.value=true,
      editForm.proName= row.tname,
      editForm.versionNum= row.name,
      editForm.status= row.status,
      editForm.result= row.num1,
      editForm.progress= row.num2,
      editForm.problem= row.num3,
      editForm.risk= row.num4
    }
    //编辑请求
    function editReq(){
      editproView(editForm).then(res=>{
        console.log(res);
      })
    }

		return {
			form,
			timer,
			dateChangebirthday,
			tableList,
			handleCurrentChange, //分页
			handleSizeChange,
			exportDialog,
			getTableList, //获取表报数据
			exportFile, //报表下载

			addDialog, //新增
			addForm,
      addCancel,//新增取消

      editDialog, //新增对话框
      editForm,
      editButton
		};
	},
};
</script>

<style lang="less" scoped>
//数据下载
.tableList {
	display: flex;
	justify-content: flex-end;
	margin-top: 10px;
	margin-right: 10px;
	.tableExport {
		border-radius: 5px;
	}
}
//分页
.el-pagination {
	margin-top: 20px;
	margin-left: 650px;
}
</style>
