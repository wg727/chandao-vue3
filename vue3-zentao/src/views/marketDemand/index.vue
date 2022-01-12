<template>
	<div>
		<div class="title">市场需求管理</div>
		<div class="headers">
			<el-form :model="filterInfo" label-width="100px">
				<el-row>
					<el-col :span="6">
						<el-form-item label="需求标题:">
							<el-input placeholder="输入需求标题" v-model="filterInfo.needTitle" style="width: 100%"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="需求类型:">
							<el-select v-model="filterInfo.needType" style="width: 100%" clearable filterable>
								<el-option label="全部" value="0"></el-option>
								<el-option label="研发需求" value="1"></el-option>
								<el-option label="设计需求" value="1"></el-option>
								<el-option label="供应链需求" value="2"></el-option>
								<el-option label="市场需求" value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="状态:">
							<el-select v-model="filterInfo.needStatus" style="width: 100%" clearable filterable>
								<el-option label="全部" value=""></el-option>
								<el-option label="未激活" value="0"></el-option>
								<el-option label="已驳回" value="1"></el-option>
								<el-option label="修复中" value="2"></el-option>
								<el-option label="挂起" value="2"></el-option>
								<el-option label="待验证" value="2"></el-option>
								<el-option label="已解决" value="2"></el-option>
								<el-option label="重新打开" value="2"></el-option>
								<el-option label="关闭" value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
					<el-form-item label="创建时间:">
						<el-date-picker
							v-model="timer"
							type="daterange"
							range-separator="至"
							start-placeholder="开始"
							end-placeholder="结束"
							@change="dateChange"
							style="width: 100%"
						>
						</el-date-picker>
					</el-form-item>
				</el-col>
				</el-row>
			</el-form>
		</div>

		<div class="showOrNot">
				<!-- 动态显示列的显示与隐藏 -->
				<el-button size="small" icon="el-icon-search" @click="addHandler">查询</el-button>
				<el-button size="small" icon="el-icon-refresh" @click="importDialog = true"> 重置</el-button>
				<el-button size="small" icon="el-icon-circle-plus-outline" @click="addDialog = true"> 新增</el-button>
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
				
			>
				<el-table-column type="index" label="序号" width="200" fixed="left"></el-table-column>
				<el-table-column label="需求标题" width="250" fixed="left">
					<template v-slot="scope">
							<div>
								<a @click="tomarketDemandEdit(scope.row)" style="color: blue; cursor: pointer">{{ scope.row.title }}</a>
							</div>
						</template>
				</el-table-column>
				<el-table-column prop="type" label="需求类型" width="250" fixed="left"></el-table-column>
				<el-table-column prop="status" label="状态" fixed="left"></el-table-column>
				<el-table-column prop="createMan" label="创建人" fixed="left"></el-table-column>
				<el-table-column prop="createTime" label="创建时间" fixed="left"></el-table-column>
			</el-table>
		</el-row>

		<!-- 新增的对话框 -->
		<el-dialog title="需求新增" v-model="addDialog">
			<el-form :model="addForm" label-width="100px">
				<el-row>
					<el-col :span="14">
						<el-form-item label="需求标题:">
							<el-input v-model="addForm.addTitle"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="14">
						<el-form-item label="需求类型:">
							<el-select v-model="addForm.addType" style="width: 100%" clearable filterable>
								<el-option label="全部" value="0"></el-option>
								<el-option label="研发需求" value="1"></el-option>
								<el-option label="设计需求" value="1"></el-option>
								<el-option label="供应链需求" value="2"></el-option>
								<el-option label="市场需求" value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="14">
						<el-button  class="file">附件上传</el-button>
					</el-col>
					<el-col :pan="14">
						<el-form-item>
							<el-input v-model="addForm.addRemark" type="textarea"  placeholder="请输入描述..."></el-input>
						</el-form-item>
					</el-col>
					
				</el-row>
			</el-form>
			<span style="margin-left: 100px" slot="footer" class="dialog-footer">
				<el-button @click="addCancel">取消</el-button>
				<el-button type="primary" @click="addReq">确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { timeStr } from "../../components/common/mixin.js";
export default {
	name: "marketDemand",
	setup() {
		let filterInfo=reactive({
			needTitle:'',
			needType:'',
			needStatus:'',
			startTime:'',
			endTime:''

		})

		const timer = ref(""); //创建时间
		function dateChange(val){
			if (val == null) {
			} else {
				let timers = JSON.parse(JSON.stringify(val));
				filterInfo.startTime = timeStr(timers[0]);
				filterInfo.endTime = timeStr(timers[1]);
			}
		}

		//表格数据
		const tableList = reactive([
			{
				title: "灵机云运营管理平台",
				type: "V1.0.3",
				status: "正常",
				createMan: "这版本完成发货报表需求设计及上线",
				createTime: "完成70%",
			},
		]);

		//点击需求标题跳转
		const router = useRouter()
		function tomarketDemandEdit(row){
			console.log(row);
			router.push({
					name: "marketDemandEdit",
					params: row,
				});
		}

		//需求新增
		let addDialog=ref(false)
		let addForm=reactive({
			addTitle:'',
			addType:'',
			addRemark:''
		})
		//新增对话框取消
		function addCancel(){
			addDialog.value=false
			addForm.addTitle=''
			addForm.addType=''
			addForm.addRemark=''
		}

		return{
			filterInfo,
			timer,//创建日期
			dateChange,
			tableList,//表格数据
			tomarketDemandEdit,//点击需求标题跳转

			addDialog,//新增需求
			addForm,
			addCancel
		}
	}
}
</script>

<style lang="less" scoped>
.title{
	width: 100%;
	height: 40px;
	font-size: 17px;
	font-weight: 700;
	padding: 10px;
	box-sizing: border-box;
	background-color: rgb(141, 198, 245);
}
.headers{
	margin-top:15px;
	// padding:20px
}
.showOrNot {
	display: flex;
	justify-content: flex-end;
}
.file{
	margin-left: 100px;
	margin-bottom: 20px;
}
</style>